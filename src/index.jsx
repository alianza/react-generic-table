import React, { useEffect, useState, Fragment } from "react";
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
 *     @param [options.sorting] {Boolean} - Whether to enable sorting on columns
 * @returns {JSX.Element} - Generic table component
 * @constructor - GenericTable
 */
function GenericTable({
  objArray = null,
  columns = [],
  actions,
  entityName = "item",
  onAction = () => {},
  ...options
}) {
  const [columnSortDirection, setColumnSortDirection] = useState({});
  const [loading, setLoading] = useState(objArray === null);
  const [objArrayState, setObjArrayState] = useState(objArray || []);
  const [tableBody, enableAnimations] = useAutoAnimate();

  if (actions?.length) columns = [...columns, "actions"];

  const defaultSort = () => sort(columns[0], "asc"); // Default ascending sort on first column

  useEffect(() => defaultSort(), []);

  useEffect(() => {
    animate(() => {
      setObjArrayState(objArray || []);
      setLoading(objArray === null);
      if (objArray) defaultSort();
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

  const { showCount, newLink, actionsColumnName, sorting = true, className = "" } = options;
  const hasItems = !!objArrayState.length;

  return (
    <div className={`${className} react-generic-table rgt-flex rgt-flex-col rgt-items-center rgt-overflow-y-hidden`}>
      <table className="rgt-relative rgt-mx-auto rgt-table-auto rgt-text-neutral-900 dark:rgt-text-neutral-100">
        <thead className="rgt-bg-neutral-200 dark:rgt-bg-neutral-700">
          <tr>
            {columns.map((col) => {
              let isActionsColumn = false;
              let colName = isString(col) ? col : Object.values(col)[0].alias || Object.keys(col)[0];
              const colProp = isString(col) ? col : Object.keys(col)[0];
              if (colName === "actions") {
                colName = actionsColumnName || colName;
                isActionsColumn = true;
              }

              return (
                <th key={colName} className="rgt-p-3 sm:rgt-p-4">
                  <div className="rgt-flex rgt-justify-center rgt-gap-2">
                    <p className="rgt-font-bold">{capitalize(colName)}</p>
                    {sorting && !loading && hasItems && (
                      <div className="rgt-h-6 rgt-w-6 rgt-cursor-pointer">
                        {columnSortDirection[colProp] === "asc" && (
                          <ChevronDownIcon onClick={() => sort(colProp, "desc")} />
                        )}
                        {columnSortDirection[colProp] === "desc" && (
                          <ChevronUpIcon onClick={() => sort(colProp, "asc")} />
                        )}
                        {!isActionsColumn && !columnSortDirection[colProp] && (
                          <ChevronUpDownIcon onClick={() => sort(colProp, "asc")} />
                        )}
                      </div>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody
          className="rgt-bg-neutral-50 after:rgt-absolute after:rgt-bottom-0 after:rgt-left-0 after:rgt-h-[2px] after:rgt-w-full after:rgt-bg-neutral-400 dark:rgt-bg-neutral-800"
          ref={tableBody}
        >
          {!hasItems && (
            <tr>
              <td className="rgt-sm:p-4 rgt-p-2" colSpan={columns.length}>
                <div className="rgt-flex rgt-justify-center rgt-gap-2">
                  {loading ? <Loader className="rgt-mx-auto rgt-my-24" /> : `No ${entityName}s found.`}
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
                  <td className="rgt-text-end">
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
      return cloneElement(elementFunc(obj), {
        onClick: elementFunc(obj).props.onClick
          ? () => {
              elementFunc(obj).props.onClick();
              onRowAction(action, obj);
            }
          : () => onRowAction(action, obj),
        key: action,
      });
    });

  return (
    <tr className="rgt-relative after:rgt-absolute after:rgt-left-0 after:rgt-h-[2px] after:rgt-w-full after:rgt-bg-neutral-400">
      {Object.entries(objColumnMap).map(([colName, colData]) => {
        const { value, colProps } = colData;
        return colName === "actions" ? (
          <td key={colName} className="rgt-p-3 sm:rgt-p-4">
            <div className="rgt-flex rgt-justify-center rgt-gap-2">{formatActions(colName, value)}</div>
          </td>
        ) : (
          <td key={colName} className={`rgt-p-3 sm:rgt-p-4 ${colProps?.className}`} {...omit(colProps, colPropsToOmit)}>
            {colProps?.capitalize === false ? value.toString() : capitalize(value)}
          </td>
        );
      })}
    </tr>
  );
}

function IconLink({ href = "", onClick, Icon, title, label, ...props }) {
  return (
    <a
      className="rgt-group rgt-flex rgt-underline rgt-decoration-transparent rgt-transition-colors rgt-duration-300 rgt-ease-in-out hover:rgt-decoration-inherit hover:rgt-duration-100 touch:rgt-decoration-inherit"
      href={href}
      onClick={onClick}
      title={title ? title : "New"}
      {...props}
    >
      {label && <span>{label}</span>}
      <Icon className="rgt-h-6 rgt-w-6 rgt-transition-transform rgt-duration-300 active:rgt-scale-95 group-hover:rgt-scale-[120%] group-hover:rgt-duration-75" />
    </a>
  );
}

function Loader({ className }) {
  return (
    <svg
      className={`${className} rgt-h-16 rgt-w-16 rgt-animate-spin dark:rgt-text-white`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="rgt-opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path className="rgt-opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );
}

export default GenericTable;
