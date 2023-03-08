<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenpengfei
 * @Date: 2023-03-06 16:44:36
 * @LastEditors: chenpengfei
 * @LastEditTime: 2023-03-08 13:42:40
-->

### [vue3 使用defineComponent和使用＜script setup＞语法糖的比较](https://blog.csdn.net/weixin_43993121/article/details/125084148)
### [Vue3之script-setup全面解析](https://www.jianshu.com/p/5096bfb42e5a)


Q1. Vue3 setup语法糖写法给组件添加name属性
  >1. 新增一个script标签，在这个script标签定义一个name属性  
  >2. 使用 unplugin-vue-define-option 插件  
  >3. 使用 vite-plugin-vue-setup-extend 插件  

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

Q3. 

