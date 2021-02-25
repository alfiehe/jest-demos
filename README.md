# jest learn

---
## Use

```
yarn install
```
```bash
yarn test
```
```bash
yarn coverage
```

---

## Config

`package.json`

```json
"scripts": {
  "test": "jest --watchAll",
  "coverage": "jest --coverage"
}
```

### Support ES6 module import and export

```bash
yarn add @babel/core @babel/preset-env --dev
```

`.babelrc`
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

jestconfig todo

vscode jest autocomplete todo

--- 

## Jest Note.