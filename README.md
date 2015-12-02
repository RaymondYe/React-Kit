### Features

- Equip with React, ES6 & Babel
- Build with Webpack
- Support hot module replacement

###Getting Started
$ git clone https://github.com/RaymondYe/React-Kit
$ cd React-Kit
$ npm install   # Install Node.js components listed in ./package.json
$ npm start     # Compile and launch

###How to Build
$ run run build
> npm run build release

###How to Run
$ npm start
> npm start release

###Directory Layout
---------
- build           # 编译后发布用代码
- node_modules    # node库
- gulpfile.js     # Gulp配置文件
- package.json    # 依赖包配置文件
- webpack.config  # webpack配置文件
- README.md       # 文档说明
- src             # dev源码
  - components    # React组件
  - html          # html
  - lib           # 插件目录
    - js
    - css
  - public        # 静态资源
   - img
  - utils         # Utility classes and functions
  - app.js        # Client-side startup script
