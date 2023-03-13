## Vite中配置 ```@``` 别名  


### 配置步骤
```ts
// vite.config.ts
// npm i --save-dev path @types/node
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})

// tsconfig.json
{
  "compilerOptions": {
    //...
    "baseUrl": "./",
    "paths": {
      "@/*": [
        "src/*",
      ]
    },
  },
  // ...
}

// vite.config.ts(弃用)
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      find: '@',
      replacement: path.resolve(__dirname, 'src')
    }
  }
})
```


### 其他问题说明
1. [vite 官方说明](https://cn.vitejs.dev/config/shared-options.html#resolve-alias)
2. ReferenceError: __dirname is not defined
    * ```__dirname```是```commonjs```规范的内置变量。如果使用了```esm```，是不会注入这个变量的。
    * 在```commonjs```中，注入了```__dirname, __filename, module, exports, require```五个内置变量用于实现导入导出的能力。而在```esm```中，因为规范已经完全不一样，故实现方式也是不一样的。
    * 在```esm```中，显然模块的导入导出使用```export/import```，自然不会再用```exports/require```，同理```__dirname, __filename```也有对应的规范写法。
      ```js
      import path from 'path'
      import { fileURLToPath } from 'url'

      const __filename = fileURLToPath(import.meta.url)
      const __dirname = path.dirname(__filename)
      ```
    > 可以看到使用了一个关键API import.meta.url，其实import.meta是ECMA规范的一部分：  
    > The import.meta object exposes context-specific metadata to a JavaScript module. It contains information about the module, like the module’s URL.
    * 如上，言下之意，```import.meta```提供了一个模块的上下文信息，其实上文```commonjs```的提供的那些变量不也是上下文信息么？只不过标准不一样了，写法也不一样了。
3. [关于__dirname和__filename](https://juejin.cn/post/7036744678749765640)
