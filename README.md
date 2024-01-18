# react-generic-table

> A generic but very usable table component for react with built-in sorting, 
> configurable cell rendering & item counts, actions support with callbacks, out-of-the-box sorting & loading states and more!

[![NPM](https://img.shields.io/npm/v/react-generic-table.svg)](https://www.npmjs.com/package/react-generic-table) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Introduction

`react-generic-table` is a generic table component for react to display data in a table format. It supports
custom cell rendering, configurable item counts, actions with callbacks, out-of-the-box sorting & loading states and much more!

Check out examples [here](https://alianza.github.io/react-generic-table/)!

## Install
Npm:
```bash
npm install --save react-generic-table
```
Yarn:
```bash
yarn add --save react-generic-table
```

## Usage

```jsx
import React, { Component } from 'react'

import GenericTable from "react-generic-table";
import "react-generic-table/dist/index.css";

function Example() {
    return(
      <GenericTable
        objArray={[
          { id: 1, name: "J.W.", age: "25", profession: "Developer" },
          { id: 2, name: "Lea", age: "22", profession: "Journalist" },
          { id: 3, name: "Max", age: "34", profession: "Taxi Driver" }
        ]}
        columns={["name", "age", "profession"]}
        {...options}
      />
    )
}
```

## Options

| Name                | Type       | Default     | Description                                                                                                                                    |
|---------------------|------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| `objArray`          | `Array`    | `null`      | Array of objects to display in table (Defaults to null which triggers table loading state)                                                     |
| `columns`           | `Array`    | `[]`        | Array of column names or objects with key as column name and options as value to display in the table                                          |
| `actions`           | `Array`    | `undefined` | Array of action objects with key as action name and value as element function to display in the table (function has access to full row object) |
| `entityName`        | `String`   | `null`      | Name of entity to display in table (Defaults to `item` as generic entity name, useful for making empty state and new links more specific)      |
| `onAction`          | `function` | `() => {}`  | Callback function to handle actions (has access to the action and the full row object)                                                         |
| `showCount`         | `boolean`  | `false`     | Whether to show count of entities in table                                                                                                     |
| `newLink`           | `string`   | `null`      | Whether to show a link to add new entities to the table (Value is link address)                                                                |
| `actionsColumnName` | `string`   | `Actions`   | Custom name for the actions column                                                                                                             |
| `sorting`           | `boolean`  | `true`      | Whether to enable sorting on columns                                                                                                           |

### Column Options

Columns can be specified as an array of strings or objects. If specified as a string, the column name will be used as the key and the column header will be the capitalized column name. If specified as an object, the key will be used as the column name and the value will be an object with the following options:

| Name         | Type       | Default | Description                                                                                                   |
|--------------|------------|---------|---------------------------------------------------------------------------------------------------------------|
| `alias`      | `string`   | `null`  | Column header to display in table (Useful if the key in the object is different than the desired column name) |
| `capitalize` | `boolean`  | `true`  | Whether to capitalize the values in the column rows                                                           |
| `onClick`    | `function` | `null`  | Callback function to handle click events on a row value in the column (has access to the full row object)     |
| Any prop     | `any`      | `null`  | Any other prop will be passed to the cell component (useful for custom cell rendering)                        |

## Features

* 🚀 Simple syntax  
* ⚙️ Minimal config  
* 🎨 Customizable  
* 🔍 Out-of-the-box sorting  
* ⌛ Built-in loading state  
* 📭 Built-in empty state  
* ➕🔗 Built-in new link  
* 🔧 Built-in row actions column  
* 🔨 Built-in row actions  
* 🔄 Built-in action callbacks  
* 📊 Built-in count display  

## License

MIT © [alianza](https://github.com/alianza)
