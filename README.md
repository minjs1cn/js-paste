# js-paste

监听用户粘贴行为，获取数据

## Usage

安装

```
yarn add @minjs1cn/js-paste
```

使用

```javascript
import paste from '@minjs1cn/js-paste'

function createImage(file) {
  const image = new Image()
  image.src = URL.createObjectURL(file)
  return image
}

function createText(text) {
  const p = document.createElement('p')
  p.textContent = text
  return p
}

const p = paste()

p.on(result => {
  console.log(result)
  const { kind, data } = result
  if (kind === 'file') {
    // 文件（图片）
    document.body.appendChild(createImage(data))
  } else {
    // 字符串
    document.body.appendChild(createText(data))
  }
})
```