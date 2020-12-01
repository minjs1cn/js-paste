# js-paste

监听用户粘贴行为，获取数据

## Usage

安装

```
yarn add @minjs1cn/js-paste
```

使用

```javascript
onPaste().on(result => {
  const { kind, data, type } = result
  if (kind === 'file') {
    // 文件
  } else if (kind === 'string') {
    // 字符串
  }
})
```