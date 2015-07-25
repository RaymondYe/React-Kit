#目录结构
---------
- build  编译后发布用代码
- node_modules  node 库
- gulpfile.js  Gulp 配置文件
- package.json  依赖包配置文件
- webpack.config  webpack 配置文件
- src  dev 源码
  - components  React 组件
  - html  html
  - lib  插件目录 
    - js
    - css
  - public  静态资源
   - img
  - style  less,css
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



---

#React

##操作数据流程
1. gitInitialState() 初始化数据
2. render() 渲染初始化数据
3. componentDidMount() 异步获取数据
4. setState() 更新数据


- render()
  返回的是一系列嵌套的组件
- this.props 
  获取父组件传递给子组件的数据
- this.setState({data: data})
  用于动态更新状态，设置数据（设置后UI会自动刷新）
- getInitialState()
  在整个组件的生命周期中只会执行一次，用于初始化数据
- componentDidMount 会在 render
  后自动调用，用于异步获取数据，更新数据









