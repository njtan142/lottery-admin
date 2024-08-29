# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Important notes
- If you commit changes please detail it as much as possible

## Installation
vite uses `dev` and `build` scripts, 
`dev` is the development script (`yarn dev`) 
`build` is the production script (`yarn build`)

`yarn install` to install the packages
`yarn dev` to start development server

It is recommended to use `yarn upgrade`, `yarn audit` and `yarn audit fix` to keep the packages up to date

## Project Structure

```
/src
  /pages
  /shared
  /assets
  /App.jsx
  /index.jsx
```

in `pages` folder we will have all the pages of the application.
in `assets` folder we will have all the assets of the application.
in `apis` folder we will have all the apis of the application.

### `pages`
- a folder is considered an endpoint
    - login folder will correspond to <website>.<com(net, etc.)>/login

- each folder will have a `.jsx` file which will be the main component of the page
    - styled-components should not be imported or exported unless in `shared` folder
    - dont import unless within same folder or `shared` folder
    - main component should have a suffix `Page`

- each folder will have a `functions.js` or `.ts` file which will contain the functions
    - `.ts` is recommended
    - The main component should only handle events
    - The functions file should contain the functions
    - Each function should have:
        - Parameters
        - Return value (avoid return null or undefined)
        - Use try catch, throw errors
    - The main component should handle errors
- each folder will have a `components` folder 
    - each component should have a suffix `Component`
    - each component should have a prefix of parent folder
        - e.g. `LoginHeaderComponent` if in `login` folder
## Packages used:
 - Styled Components

### Styled Components 
Documentation: (https://styled-components.com/)

Description:
Styled Components is a library for React and React Native that allows you to use component-level styles in your application. It is a tool for building UI components with ease.

Why:
Instead of using css classes, its better for better styling control. 

Extension required: 
vs-code-styled-components (https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components.)