## [Mitt](https://github.com/developit/mitt)

> ### 前言
> Vue2.x 使用 ```EventBus``` 事件总线进行兄弟组件通信，**而在Vue3中事件总线模式已经被移除**，官方建议使用外部的、实现了事件触发器接口的库,例如 ```mitt``` 或 ```tiny-emitter```。

### mitt优势
* 足够小，仅有```200bytes```
* 支持全部事件的监听和批量移除
* 不依赖Vue实例，可以在任何```JavaScript```运行时中使用（包括但不限于React、Vue、jQuery）
* 没有依赖项，并且支持```IE9+```

### 安装
```
npm install --save mitt
```

### API
```js
// 创建mitt实例
mitt()
// 事件名称到注册处理程序函数的映射。
all
//触发事件，两个参数：name：触发的方法名，data：需要传递的参数
emit(name, data)
// 绑定事件，两个参数：name：绑定的方法名，callback：触发后执行的回调函数
on(name, callback)
// 解绑事件，一个参数：name：需要解绑的方法名
off(name)
```

### Others
* 使用 ```Provide/Inject``` 的原理其实和使用 ```mitt``` 一样，都是通过事件订阅机制完成对应的需求。```mitt``` 类似旧版的 ```element/ant-design``` 的方式，创建了一个订阅器对象；新版的 ```element-plus``` 在 ```Form``` 表单的实现上使用了Provide/Inject 机制，[源码](https://github.com/element-plus/element-plus/blob/dev/packages/components/form/src/form.vue#L159)
