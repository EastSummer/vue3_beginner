## Husky + Commitlint实现commit message校验

### 配置git提交的校验钩子
  > husky：git 提交时触发hooks  
  > commitlint: 对提交的内容做规范校验husky，主要对pre-commit和commit-msg钩子做校验
### husky
```sh
# 安装husky
npm install husky -D
# 初始化husky配置，在根目录新增.husky配置文件
npx husky install
# 新增一个hooks，commit-log
npx husky add .husky/commit-msg
# vim commit-msg 添加一行
npm run commitlint
```
目录结构：
```sh
└── .husky
    ├── _
    │   ├── .gitignore
    │   └── husky.sh
    └── commit-msg
```
commit-msg 完整内容：
```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run commitlint
```
### commitlint

```sh
# 安装commitlint
npm install -D @commitlint/config-conventional @commitlint/cli
# 在package.json文件中添加
"scripts": {
  "commitlint": "commitlint --config commitlint.config.js -e -V"
}
# 根目录新建commitlint.config.js，内容如下例子
module.exports = {
  ignores: [(commit) => commit.includes("build")],
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [1, "always"],
    "header-max-length": [2, "always", 108],
    "subject-empty": [2, "never"],
    "type-empty": [2, "never"],
    "type-enum": [2, "always", ["merge", "feat", "fix", "perf", "style", "docs", "test", "refactor", "build", "ci", "chore", "revert", "wip", "workflow", "types", "release", "build"]]
  }
}
```
### 参考
  * [commitlint github](https://github.com/luoxue-victor/commitlint)
  * [Husky + Commitlint实现commit message校验](https://www.cnblogs.com/chailuG/p/17335050.html)
