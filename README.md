#Start
$ npm install
$ gulp

# Release
$ gulp build --release

# Webpack
$ webpack-dev-server --devtool eval --progress --colors --hot --content-base build

package.json
```js
"scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server --devtool eval --progress --colors --hot --content-base build"
  }
```
- webpack-dev-server - 在 localhost:8080 建立一个 Web 服务器
- --devtool eval - 为你的代码创建源地址。当有任何报错的时候可以让你更加精确地定位到文件和行号
- --progress - 显示合并代码进度
- --colors - Yay，命令行中显示颜色！
- --content-base build - 指向设置的输出目录

#目录结构
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
- fastclick  消除点击延迟
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

Bootstrap部分模块引入

###Base
- reset.css  重置
- iconfont  字体图片

###extend
- animate.css  动画
- button  按钮
- Modals  拟态框
- Dropdowns  下拉

# 构建工具 Gulp && Webpack

- coffee-loader
- coffee-jsx-loader
- less-loader
- js 压缩,合并
- css sprite, cssAutoprefix, 压缩, 合并
- image Min
- md5, minhtml, uploadToCdn


