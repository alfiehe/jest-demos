# jest learn

## Use

```bash
yarn test
```

```bash
yarn coverage
```

## Support ES6 module

```bash
npm install --save-dev @babel/core @babel/preset-env
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