# 後端 Hapi 框架

# TODO
* 文檔生成 
```
await server.register({
    plugin: require('lout')
})
```
* 分頁功能
https://www.jishuwen.com/d/2o08/zh-tw

專案初始化
```
npm init
```

安裝 hapi
```
npm install @hapi/hapi
```

安裝環境變數套件，讀取 .env 檔
```
npm install dotenv
```

安裝 mongodb 套件
```
npm install mongoose
```

安裝 supervisor 偵測 js 變更自動重啟

```
npm install supervisor -g
```

安裝分頁元件
```
npm install mongoose-paginate
```

# Hapi 參考網站
* style guide  
  https://hapi.dev/resources/styleguide

* Hapi.js 起步 - 写给前端开发的 Node Web 框架入门  
  https://juejin.im/post/5c6cde8d6fb9a04a05404023

* 使用 Hapi 开发 RESTful APIs  
  https://juejin.im/post/5b5d7c7951882562b92491d8#heading-3

* Node.js+MongoDB对于RestfulApi中用户token认证的实践  
  https://cnodejs.org/topic/58c1477b06dbd608756d0bca

