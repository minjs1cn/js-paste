import { TinyEmitter } from 'tiny-emitter'

export type PasteResult = {
  kind: string
  data: File | string
  type: string
}
export type OnPasteEventType = (e: PasteResult) => void

const PasteEventType = 'paste'

const emitter = new TinyEmitter()

/**
 * 监听用户的粘贴行为
 */
export default function onPaste() {
  document.addEventListener('paste', e => {
    e.preventDefault()
    const items = e.clipboardData?.items
    if (items) {
      handle(items)
    }
  })

  return {
    version: __VERSION__,
    on(fn: OnPasteEventType) {
      emitter.on(PasteEventType, fn)
    }
  }
}

function handle(items: DataTransferItemList) {
  // 最后一个对象
  const item = items[items.length - 1]
  // 对象的类别和类型
  const { kind, type } = item

  switch(kind) {
    case 'file':
      // 文件
      const file = item.getAsFile()
      if (file) {
        emitter.emit(PasteEventType, {
          kind,
          type,
          data: file
        })
      }
      break
    case 'string':
      // 字符
      item.getAsString(str => {
        emitter.emit(PasteEventType, {
          kind,
          type,
          data: str
        })
      })
      break
    default:
      break
  }
}

