import React, { useEffect, useState } from "react";
import { capitalize, isString, sOrNoS, omit, deepGet } from "./lib/commonUtils";
import { ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { cloneElement } from "react";

const duration = 250; // default auto-animate duration

/**
 * Generic table component
 * @param objArray {Array} - Array of objects to display in table
 * @param columns {Array} - Array of column names or objects with key as column name and options as value
 * @param actions {Array} - Array of action objects with key as action name and value as element function
 * @param entityName {String} - Name of entity to display in table
 * @param onAction {Function} - Callback function to handle actions
 * @param [options] {Object} - Options object
 *     @param [options.showCount] {Boolean} - Whether to show count of objects in table
 *     @param [options.newLink] {String} - Link to create new entity
 *     @param [options.actionsColumnName] {String} - Custom name for the actions column
 * @returns {JSX.Element} - Generic table component
 * @constructor - GenericTable
 */
function GenericTable({ objArray = null, columns, actions, entityName = "item", onAction = () => {}, ...options }) {
  const [columnSortDirection, setColumnSortDirection] = useState({});
  const [loading, setLoading] = useState(objArray === null);
  const [objArrayState, setObjArrayState] = useState(objArray || []);
  const [tableBody, enableAnimations] = useAutoAnimate();

  if (actions?.length) columns = [...columns, "actions"];

  useEffect(() => {
    sort(columns[0], "asc"); // Default ascending sort on first column
  }, []);

  useEffect(() => {
    animate(() => {
      setObjArrayState(objArray || []);
      setLoading(objArray === null);
      if (objArray) sort(columns[0], "asc"); // Default initial ascending sort on first column
    });
  }, [objArray]);

  const sort = (column, direction) => {
    setObjArrayState((prevObjArrayState) =>
      prevObjArrayState.sort((a, b) => {
        if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
        if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
        return 0;
      }),
    );
    setColumnSortDirection({ [column]: direction });
  };

  const animate = (fn) => {
    enableAnimations(false);
    fn();
    setTimeout(() => enableAnimations(true), duration);
  };

  const { showCount, newLink, actionsColumnName } = options;

  return (
    <div className="flex flex-col items-center overflow-y-hidden">
      <table className="relative mx-auto table-auto text-neutral-900 dark:text-neutral-100">
        <thead className="bg-neutral-200 dark:bg-neutral-700">
          <tr>
            {columns.map((col) => {
              let colName = isString(col) ? col : Object.values(col)[0].alias || Object.keys(col)[0];
              const colProp = isString(col) ? col : Object.keys(col)[0];
              if (colName === "actions") {
                colName = actionsColumnName || colName;
              }

              return (
                <th key={colName} className="p-3 sm:p-4">
                  <div className={`flex justify-center gap-2`}>
                    <p className="font-bold">{capitalize(colName)}</p>
                    {columnSortDirection[colProp] === "asc" && (
                      <ChevronDownIcon onClick={() => sort(colProp, "desc")} className="h-6 w-6 cursor-pointer" />
                    )}
                    {columnSortDirection[colProp] === "desc" && (
                      <ChevronUpIcon onClick={() => sort(colProp, "asc")} className="h-6 w-6 cursor-pointer" />
                    )}
                    {colName !== "actions" && !columnSortDirection[colProp] && (
                      <ChevronUpDownIcon onClick={() => sort(colProp, "asc")} className="h-6 w-6 cursor-pointer" />
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody
          className="bg-neutral-50 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-neutral-400 dark:bg-neutral-800"
          ref={tableBody}
        >
          {!objArrayState.length && (
            <tr>
              <td className="p-2 sm:p-4" colSpan={columns.length}>
                <div className="flex justify-center gap-2">
                  {loading ? <Loader className="mx-auto my-24" /> : `No ${entityName}s found.`}
                  {newLink && !loading && <IconLink title={`New ${entityName}`} href={newLink} Icon={PlusIcon} />}
                </div>
              </td>
            </tr>
          )}
          {objArrayState.map((obj) => (
            <GenericTableDataRow
              key={obj.id}
              obj={obj}
              columns={columns}
              actions={actions}
              onRowAction={(...params) => onAction(...params, entityName)}
            />
          ))}
        </tbody>
        {(showCount || newLink) && (
          <tfoot>
            <tr>
              {newLink && (
                <td colSpan={!showCount ? columns.length : 1}>
                  <IconLink title={`New ${entityName}`} label="Add new" href={newLink} Icon={PlusIcon} />
                </td>
              )}
              {showCount && (
                <>
                  {columns.length > 2 && <td colSpan={columns.length - (newLink ? 2 : 1)} />}
                  <td className="text-end">
                    {objArrayState.length} {capitalize(entityName) + sOrNoS(objArrayState.length)}
                  </td>
                </>
              )}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

const colPropsToOmit = ["className", "key", "alias", "capitalize"];

function GenericTableDataRow({ obj, columns, actions, onRowAction }) {
  const objColumnMap = {};

  columns.forEach((col) => {
    const [[colName, colProps]] = isString(col) ? [[col]] : Object.entries(col);
    if (colName === "actions") {
      objColumnMap[colName] = { colProps, value: actions }; // Value of actions column are the actions itself
    } else {
      objColumnMap[colName] = { colProps, value: deepGet(obj, colName) };
    }
  });

  const formatActions = (name, value) =>
    value.map((actionObj) => {
      const [[action, elementFunc]] = Object.entries(actionObj);
      if (typeof elementFunc !== "function") {
        console.warn(`No element function provided for action ${actionObj}`);
        return null;
      }
      return cloneElement(elementFunc(obj), { onClick: () => onRowAction(action, obj), key: action });
    });

  return (
    <tr className="relative after:absolute after:left-0 after:h-[2px] after:w-full after:bg-neutral-400">
      {Object.entries(objColumnMap).map(([colName, colData]) => {
        const { value, colProps } = colData;
        return colName === "actions" ? (
          <td key={colName} className="p-3 sm:p-4">
            <div className="flex justify-center gap-2">{formatActions(colName, value)}</div>
          </td>
        ) : (
          <td key={colName} className={`p-3 sm:p-4 ${colProps?.className}`} {...omit(colProps, colPropsToOmit)}>
            {colProps?.capitalize === false ? value.toString() : capitalize(value)}
          </td>
        );
      })}
    </tr>
  );
}

function IconLink({ href = "", onClick, Icon, title, label, ...props }) {
  const utilStyles = {};

  return (
    <a
      className={`${utilStyles.link}group flex`}
      href={href}
      onClick={onClick}
      title={title ? title : "New"}
      {...props}
    >
      {label && <span>{label}</span>}
      <Icon className="h-6 w-6 transition-transform duration-300 active:scale-95 group-hover:scale-[120%] group-hover:duration-75" />
    </a>
  );
}

function Loader({ className }) {
  return (
    <svg
      className={`${className} h-16 w-16 animate-spin dark:text-white`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );
}

export default GenericTable;
