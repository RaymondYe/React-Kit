React-Kit
=========

kickstart new project width react, webpack, es6

- Equip with React, ES6 & Babel
- Build with Webpack
- Support hot module replacement


Requirements
------------
Paddington requires the following to run:

* [Node.js](http://nodejs.org/) 8+
* [npm](https://www.npmjs.com/) (normally comes with Node.js)


Usage
-----

### How to Start

```sh
git clone https://github.com/RaymondYe/React-Kit

cd React-Kit

# Install Node.js components listed in ./package.json
npm i

# Compile and launch
npm start
```

### How to Build

```sh
npm run build
```


Directory Layout
----------------

```
- /dist                   # The folder for compiled output
- /docs                   # Document files for the project
- /node_modules           # 3rd-party libraries and utilities
- README.md               # README.md
- src                     # The source code of the application
  - components            # React Presentational Components
  - containers            # React Container Componets
  - content               # Static content (HTML, Markdown, Jade etc.)
  - public                # Static files(css, js, img .etc) which are copied into the /dist/public folder
  - utils                 # Utility classes and functions
  - app.js                # Client-side startup script
- tools                   # Build automation scripts and utilities
  - build.js              # Builds the project from source to output (build) folder
  - bundle.js             # Bundles the web resources into package(s) throuth Webpack
  - run.js                # Helper function for running build automation tasks
  - copy.js               # Copies static files to output (build) folder
  - clean.js              # Cleans up the output (build) folder
  - webpack.config.js     # Webpack Configurations
  - start.js              # Launches the development web server with live reload
- .babelrc                # Local babel config
- .editorconfig           # Editor config
- .gitignore              # Local .gitignore
- package.json            # The list of 3rd party libraries and utilities
- package.json            # Npm lockfiles
- yarn.lock               # Yarn lockfiles
```
