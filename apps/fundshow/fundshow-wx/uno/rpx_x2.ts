import { definePreset } from 'unocss'

const remRE = /(-?[\.\d]+)rpx/g

const namedSet = new Set([
  'width',
  'height',
  'padding',
  'padding-left',
  'padding-right',
  'padding-top',
  'padding-bottom',
  'margin',
  'margin-left',
  'margin-right',
  'margin-top',
  'margin-bottom',
  'left',
  'right',
  'top',
  'bottom',
])

export const rpxX2 = definePreset(() => {
  return {
    name: '@unocss/rpx-x2',
    postprocess: (util) => {
      util.entries.forEach((i) => {
        let name = i[0]

        if (namedSet.has(name)) {
          const value = i[1]
          if (typeof value === 'string' && remRE.test(value)) {
            i[1] = value.replace(remRE, (_, p1) => `${p1 * 2}rpx`)
            // console.log(i)
          }
        }
      })
    },
  }
})

export default rpxX2
