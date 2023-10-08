// import React from 'react'
// import styles from './styles.module.css'
// import { useEffect, useState } from 'react';
// import { capitalize, isString, sOrNoS } from '../../../lib/commonUtils';
// import { ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon, PlusIcon } from '@heroicons/react/20/solid';
// import TableDataRow from './genericTableDataRow';
// import IconLink from '../IconLink';
// import Loader from '../loader/loader';
// import { useAutoAnimate } from '@formkit/auto-animate/react';
// import { capitalize, deepGet, isString, omit } from '../../../lib/commonUtils';
// import { cloneElement } from 'react';

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>
}

const duration = 250 // default auto-animate duration

export const GenericTable = ({ objArray, columns, actions, entityName, onAction = () => {}, showCount, newLink }) => {
  const [columnSortDirection, setColumnSortDirection] = useState({});
  const [loading, setLoading] = useState(objArray === null);
  const [objArrayState, setObjArrayState] = useState(objArray || []);
  const [tableBody, enableAnimations] = useAutoAnimate();

  if (actions.length) columns = [...columns, 'actions'];

  useEffect(() => {
    sort(columns[0], 'asc'); // Default ascending sort on first column
  }, []);

  useEffect(() => {
    animate(() => {
      setObjArrayState(objArray || []);
      setLoading(objArray === null);
      if (objArray) sort(columns[0], 'asc'); // Default initial ascending sort on first column
    });
  }, [objArray]);

  const sort = (column, direction) => {
    setObjArrayState((prevObjArrayState) =>
      prevObjArrayState.sort((a, b) => {
        if (a[column] > b[column]) return direction === 'asc' ? 1 : -1;
        if (a[column] < b[column]) return direction === 'asc' ? -1 : 1;
        return 0;
      })
    );
    setColumnSortDirection({ [column]: direction });
  };

  export const animate = (fn) => {
    enableAnimations(false);
    fn();
    setTimeout(() => enableAnimations(true), duration);
  };

  return (
    <div className={`flex flex-col items-center overflow-y-hidden`}>
      <table className="relative mx-auto table-auto">
        <thead className="bg-neutral-200 dark:bg-neutral-700">
        <tr>
          {columns.map((col) => {
            const colName = isString(col) ? col : Object.values(col)[0].alias || Object.keys(col)[0];
            const colProp = isString(col) ? col : Object.keys(col)[0];

            return (
              <th key={colName} className="p-3 sm:p-4">
                <div className={`flex justify-center gap-2`}>
                  <p className="font-bold">{capitalize(colName)}</p>
                  {columnSortDirection[colProp] === 'asc' && (
                    <ChevronDownIcon onClick={() => sort(colProp, 'desc')} className="h-6 w-6 cursor-pointer" />
                  )}
                  {columnSortDirection[colProp] === 'desc' && (
                    <ChevronUpIcon onClick={() => sort(colProp, 'asc')} className="h-6 w-6 cursor-pointer" />
                  )}
                  {colName !== 'actions' && !columnSortDirection[colProp] && (
                    <ChevronUpDownIcon onClick={() => sort(colProp, 'asc')} className="h-6 w-6 cursor-pointer" />
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
          <TableDataRow
            key={obj._id}
            obj={obj}
            columns={columns}
            actions={actions}
            onRowAction={(...params) => onAction(...params, entityName)}
          />
        ))}
        </tbody>
        {showCount && objArrayState.length > 0 && (
          <tfoot>
          <tr>
            {newLink && (
              <td>
                <IconLink title={`New ${entityName}`} label="Add new" href={newLink} Icon={PlusIcon} />
              </td>
            )}
            {columns.length > 2 && <td colSpan={columns.length - (newLink ? 2 : 1)}></td>}
            <td className="text-end">
              {objArrayState.length} {capitalize(entityName) + sOrNoS(objArrayState.length)}
            </td>
          </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

const colPropsToOmit = ['className', 'key', 'alias', 'capitalize'];

export const genericTableDataRow = ({ obj, columns, actions, onRowAction }) => {
  const objColumnMap = {};

  columns.forEach((col) => {
    const [[colName, colProps]] = isString(col) ? [[col]] : Object.entries(col);
    if (colName === 'actions') {
      objColumnMap[colName] = { colProps, value: actions }; // Value of actions column are the actions itself
    } else {
      objColumnMap[colName] = { colProps, value: deepGet(obj, colName) };
    }
  });

  return (
    <tr className="relative after:absolute after:left-0 after:h-[2px] after:w-full after:bg-neutral-400">
      {Object.entries(objColumnMap).map(([colName, colData]) => {
        const { value, colProps } = colData;
        if (colName === 'actions') {
          return (
            <td key={colName} className="p-3 sm:p-4">
              <div className="flex justify-center gap-2">
                {value.map((actionObj) => {
                  const [[action, elementFunc]] = Object.entries(actionObj);
                  if (typeof elementFunc !== 'function') {
                    console.warn(`No element function provided for action ${actionObj}`);
                    return null;
                  }
                  return cloneElement(elementFunc(obj), { onClick: () => onRowAction(action, obj), key: action });
                })}
              </div>
            </td>
          );
        }

        return (
          <td key={colName} className={`p-3 sm:p-4 ${colProps?.className}`} {...omit(colProps, colPropsToOmit)}>
            {colProps?.capitalize === false ? value.toString() : capitalize(value)}
          </td>
        );
      })}
    </tr>
  );
};

