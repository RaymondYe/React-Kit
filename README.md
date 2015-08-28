#Getting Started
$ git clone https://github.com/RaymondYe/React-Kit
$ cd React-Kit
$ npm install   # Install Node.js components listed in ./package.json
$ npm start     # Compile and launch

#How to Build
$ run run build
> npm run build -- release

#How to Run
$ npm start
> npm start -- release

#Directory Layout
---------
- build  # 编译后发布用代码
- node_modules  # node库
- gulpfile.js  # Gulp配置文件
- package.json  # 依赖包配置文件
- webpack.config  # webpack配置文件
- README.md  # 文档说明
- src  # dev源码
  - components  # React组件
  - html  # html
  - lib  # 插件目录
    - js
    - css
  - public  # 静态资源
   - img
  - style  less, css
  - utils  Utility classes and functions
  - app.js  Client-side startup script

##JsModule
###Base
- react

###extend
- flux
- react-router
- store  localStorage类库
- lodash  方法库
- PreloadJS  预加载
- lazyLoad  延迟加载
- fastclick  消除Mobile点击延迟
- touch  手势处理
- 全局事件 https://github.com/Wolfy87/EventEmitter
- selection 处理 https://github.com/timdown/rangy
- Ajax 请求 https://github.com/ded/Reqwest
- className 拼接 https://github.com/JedWatson/classnames
- 浏览器检测 https://github.com/ded/bowser
- 文件大小格式化 https://github.com/avoidwork/filesize.js
- pen https://github.com/teambition/pen
- pdfobject https://github.com/teambition/PDFObject
- thenjs https://github.com/teambition/then.js

##CssModule
###Base
- reset.css  重置
- iconfont  字体图片

###extend
- animate.css  动画
- button  按钮
- Modals  拟态框
- Dropdowns  下拉

#Webpack
- babel-loader es6
- less-loader
- css,js 压缩,合并
- css cssAutoprefix
- image Min
- md5, minhtml, uploadToCdn
- React-Hot, LiveReload
- Development web server for BrowserSync
