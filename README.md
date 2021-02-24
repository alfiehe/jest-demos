# jest learn

---
## Use

安装依赖
```
yarn install
```

运行测试用例
```bash
yarn test
```

生成覆盖率报告
```bash
yarn coverage
```

---

## 相关配置

### 运行脚本配置 `package.json`

```json
"scripts": {
  "test": "jest --watchAll",
  "coverage": "jest --coverage"
},
```

### jestconfig todo

### vscode 自动补齐jest todo

### 支持 ES6 模块导入导出配置

安装 babel
```bash
yarn add @babel/core @babel/preset-env --dev
```

根目录创建配置文件 `.babelrc`，加入下面这坨:
```json
{
  "presets":[
    ["@babel/preset-env", {
      "targets": {
        "node": "current"
      }
    }]
  ]
}
```