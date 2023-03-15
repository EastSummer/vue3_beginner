## 响应性语法糖(已废弃)

### 介绍
自从引入组合式 API 的概念以来，一个主要的未解决的问题就是 ```ref``` 和 ```reactive``` 到底用哪个。```reactive``` 存在解构丢失响应性的问题，而 ```ref``` 需要到处使用 ```.value``` 则感觉很繁琐，并且在没有类型系统的帮助时很容易漏掉 ```.value```。  
例如，下面的计数器：
```html
<template>
  <button @click="increment">{{ count }}</button>
</template>
```
使用 ```ref``` 定义 ```count``` 变量和 ```increment``` 方法：
```ts
let count = ref(0)

function increment() {
  count.value++
}
```
而使用响应性语法糖，我们可以像这样书写代码：
```ts
let count = $ref(0)

function increment() {
  count++
}
```

### 废弃原因
尤雨溪在2个星期前（2023 年 2 月 21 日上午 10:05 GMT+8），亲自给出了废弃的原因，翻译如下：  
正如你们中的许多人已经知道的那样，我们在团队一致同意的情况下正式放弃了这个 RFC。

#### **理由**
***  
Reactivity Transform 的最初目标是通过在处理反应状态时提供更简洁的语法来改善开发人员的体验。我们将其作为实验性产品发布，以收集来自现实世界使用情况的反馈。尽管提出了这些好处，我们还是发现了以下问题：

1. 失去 ```.value``` 使得更难分辨正在跟踪的内容以及哪条线触发了反应效果。这个问题在小型 SFC 中并不那么明显，但在大型代码库中，心理开销变得更加明显，特别是如果语法也**在 ```SFC``` 之外使用**。
2. 由于 (1)，一些用户选择仅在 SFC 内部使用 Reactivity Transform，这会在不同心智模型之间造成不一致和上下文转换成本。因此，困境在于仅在 SFC 内部使用它会导致不一致，但在 SFC 外部使用它会损害可维护性。
3. 由于仍然会有外部函数期望使用原始引用，因此反应变量和原始引用之间的转换是不可避免的。这最终增加了更多的学习内容和额外的精神负担，我们注意到这比普通的 Composition API 更让初学者感到困惑。

最重要的是，碎片化的潜在风险。尽管这是明确的选择加入，但一些用户对该提议表示强烈反对，原因是他们担心他们将不得不与不同的代码库一起工作，在这些代码库中，有些人选择了使用它，而有些人则没有。这是一个合理的担忧，因为 Reactivity Transform 需要一种不同的心智模型，它会扭曲 JavaScript 语义（变量赋值能够触发反应效果）。

考虑到所有因素，我们认为将其作为一个稳定的功能使用会导致问题多于收益，因此不是一个好的权衡。

#### **迁移计划**
***  
  * 该功能已经通过 [Vue Macros](https://vue-macros.sxzz.moe/features/reactivity-transform.html) 以外部包的形式得到支持。
  * 3.3：该功能将被标记为已弃用。它将继续工作，但您应该在此期间迁移到 Vue Macros。
  * 3.4：该功能将从核心中删除，除非使用 Vue Macros，否则将不再有效。


### 参考
1. [官方文档](https://cn.vuejs.org/guide/extras/reactivity-transform.html)
2. [响应性语法糖已废弃](https://github.com/vuejs/rfcs/discussions/369#discussioncomment-5059028)