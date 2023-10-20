# react-generic-table

> A generic but very usable table component for react with built-in sorting, 
> configurable cell rendering & item counts, actions support with callbacks, out-of-the-box sorting & loading states and more!

[![NPM](https://img.shields.io/npm/v/react-generic-table.svg)](https://www.npmjs.com/package/react-generic-table) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Introduction

`react-generic-table` is a generic table component for react to display data in a table format. It supports sorting,
custom cell rendering, configurable item counts, actions with callbacks, out-of-the-box sorting & loading states and more!

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

import { TransitionScroll } from 'react-generic-table'
import 'react-generic-table/dist/index.css'

class Example extends Component {
  render() {
    return(
      <GenericTable
        {...options}
      />
    )
  }
}
```

## Options

| Name          | Type           | Default                                                    | Description                                                                                   |
|---------------|----------------|------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| `threshold`   | `number`       | `0`                                                        | Percentage of element that has to be in view to trigger transition (number between 0 and 100) |
| `reAnimate`   | `boolean`      | `false`                                                    | Whether to reanimate if element enters viewport again                                         |
| `baseStyle`   | `Style Object` | `{}`                                                       | Base styles to apply to transition element                                                    |
| `hiddenStyle` | `Style Object` | `{ opacity: 1, translate: '0 12px', filter: 'blur(4px)' }` | Styles to apply to transition element when hidden                                             |
| `showStyle`   | `Style Object` | `{ opacity: 0, translate: '0 0', filter: 'none' }`         | Styles to apply to transition element when hidden                                             |
| `className`   | `string`       | `''`                                                       | Classname to apply to the transition element                                                  |

## Features

😮‍💨 Simple syntax  
👌 Honors `prefers-reduced-motion` media query  
🚀 Uses IntersectionObserver API (Blazingly fast)  
⛔ 0 dependencies!

## License

MIT © [alianza](https://github.com/alianza)
