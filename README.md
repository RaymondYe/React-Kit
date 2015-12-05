### Features

- Equip with React, ES6 & Babel
- Build with Webpack
- Support hot module replacement

###Getting Started
```shell
$ git clone https://github.com/RaymondYe/React-Kit
$ cd React-Kit
$ npm install   # Install Node.js components listed in ./package.json
$ npm start     # Compile and launch
```

###How to Build
```shell
$ npm run build
# or `npm run build release`
```

###How to Run
```shell
$ npm start
# or `npm start release`
```

###Directory Layout
```
- /build                  # The folder for compiled output
- /docs                   # Document files for the project
- /node_modules           # 3rd-party libraries and utilities
- README.md               # README.md
- src                     # The source code of the application
  - components            # React Components
  - html                  # Static content (HTML, Markdown, Jade etc.)
  - public                # Static files(css, js, img .etc) which are copied into the /build/public folder
  - utils                 # Utility classes and functions
  - app.js                # Client-side startup script
- tools                   # Build automation scripts and utilities
  - build.js              # Builds the project from source to output (build) folder
  - bundle.js             # Bundles the web resources into package(s) throuth Webpack
  - run.js                # Helper function for running build automation tasks
  - copy.js               # Copies static files to output (build) folder
  - clean.js              # Cleans up the output (build) folder
  - webpack.config.js     # Webpack Configurations
  - start.js              # Launches the development web server with "live reload"
- package.json            # The list of 3rd party libraries and utilities
```
