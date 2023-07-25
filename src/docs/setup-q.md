<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-03-06 16:44:36
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-07-25 14:07:28
-->

<br />

Q1. Vue3 setup语法糖写法给组件添加name属性
  >1. 新增一个```script```标签，在这个```script```标签定义一个```name```属性（在 3.2.34 或以上的版本中，使用```<script setup>```的单文件组件会自动根据文件名生成对应的```name```选项，无需再手动声明。[Link](https://cn.vuejs.org/guide/built-ins/keep-alive.html#include-exclude)）
  >2. 使用 ```unplugin-vue-define-option``` 插件
  >3. 使用 ```vite-plugin-vue-setup-extend``` 插件  

<br />

Q2. [官方文档](https://cn.vuejs.org/api/sfc-script-setup.html#defineprops-defineemits)中```defineProps```和```defineEmits```API可以直接使用，但eslint可能报错
  ```js
  // .eslintrc.cjs文件中增加
  module.exports = {
    // ...
    env: {
      node: true,
      'vue/setup-compiler-macros': true
    },
    // ...
  }
  ```
  > [关于配置文件是```.cjs```而不是```.js```的补充说明](https://blog.csdn.net/qq_36262295/article/details/127058708)  
    >* 因为项目被定义为```ESM```，```eslint --init```会自动识别为```type```，并生成兼容的配置文件名称
    >* 如果改回.js结尾，再运行eslint会报错，出现这个问题是eslint内部使用了```require()```语法读取配置
    >* [ESM（EcmaScript Module）规范](https://tc39.es/ecma262/)需要在```package.json```文件里设置```"type": "module"```

<br />

Q3. 选项式api与组合式api
  > * 选项式api就是用包含多个选项的对象来描述组件的逻辑，比收说，data，methods，mounted，updated等等。在这些选项内定义的属性都会暴露在函数内部的this上，其中的this会指向组件实例
  > * 组合式api与选项式api不同，他通常会跟```<script setup>```一起搭配使用，并且组合式api的可复用性比选项式api要好很多，所以，组合式api适合使用在那些大型项目中，代码的灵活性也比较高，而选项式api对于初学者来说更加友好

<br />

Q4. ref和reactive使用选择
  > https://www.cnblogs.com/hgng/p/17254584.html

1