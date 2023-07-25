<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-07-25 10:48:23
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-07-25 15:51:13
-->

### setup语法糖

> 本文写作时，vue 使用的 3.2.45 版本。

### 前言/背景
在 ```Vue 3``` 的 .vue 组件里，遵循 [SFC 规范要求](https://cn.vuejs.org/api/sfc-spec.html)（注：SFC，即 Single-File Component，单文件组件），标准的 ```setup``` 用法是，在 ```setup``` 里面定义的数据如果需要在 ```template``` 中使用，都需要 ```return``` 出来。

如果你使用的是 ```TypeScript``` ，还需要借助 ```defineComponent``` 来帮助你对类型的自动推导。

```script-setup``` 的推出是为了让熟悉 Vue3 的用户可以更高效率的开发组件，减少一些心智负担，只需要给 script 标签添加一个 setup 属性，那么整个 script 就直接会变成 setup 函数，所有顶级变量、函数，均会自动暴露给模板使用（无需再一个个 return 了）。

Vue 会通过单组件编译器，在编译的时候将其处理回标准组件。所以，```<script setup>``` 是在单文件组件 (SFC) 中使用 ```composition api``` 的编译时**语法糖**。

### 发展历程
* **3.0早期**：对 ```composition api``` 的支持，只能在组件选项 setup 函数中使用
* **3.0.0-beta.21**：增加了 ```<script setup>``` 实验特性。（此时使用会提示 ```<script setup>``` 还处在实验特性阶段。）
* **3.1.3**：进入定稿状态，部分实验性API将被舍弃 [\<script setup> Finalization](https://github.com/vuejs/rfcs/pull/227#issuecomment-870105222)
* **3.2.0**：移除 ```<script setup>``` 的实验状态，从此，宣告 ```<script setup>``` 正式转正使用，成为框架稳定的特性之一。
* **3.3.0**：拓展了原来在选项式中但未包含在组合式中的[API](https://cn.vuejs.org/api/options-misc.html)

### 特性
* 更少的样板内容，更简洁的代码
  * 声明的变量，不需要通过 ```return``` 选项来暴露
  * 外部引入的方法，不需要通过 ```methods``` 选项来暴露
  * 外部引入的组件，不需要通过 ```components``` 选项来暴露
* 能够使用纯 ```TypeScript``` 声明 ```props``` 和自定义事件(无需借助额外的辅助)
* 更好的运行时性能 (其模板会被编译成同一作用域内的渲染函数，避免了渲染上下文代理对象)
* 更好的 IDE 类型推导性能 (减少了语言服务器从代码中抽取类型的工作)
* 顶级 await 的支持 -> ```const post = await fetch() -> async setup(){ //... }```

### API
#### 编译器宏（compiler macros）
在 script-setup 模式下，新增了 4 个全局编译器宏，他们无需 import 就可以直接使用。
* ```defineProps -> props: [ //... ]```
* ```withDefaults(props, defaultValues)```
* ```defineEmits -> emits: [ //... ]```
* ```defineExpose -> $ref```

#### 辅助函数
* ```useAttrs -> setup (props, { attrs })```
* ```useSlots -> setup (props, { slots })```
* ```useCssModule```

#### ~~需要单独使用\<script>导出的API~~
> 3.3开始你也可以直接在 ```<script setup>``` 中使用
* ```name```
* ```inheritAttrs```

#### [响应式 API：核心](https://cn.vuejs.org/api/reactivity-core.html)

### [Question](./setup-q.md)


### 参考
* [script-setup 使用指南](https://blog.csdn.net/qq_41581588/article/details/128869363)
* [setup 语法糖(Vue3.2+)](https://cn.vuejs.org/api/sfc-script-setup.html)
