<template>
  <div class="number-scroll">
    <button @click="decrement">-</button>
    <div class="number-display">
      <div class="number-wrapper" :style="{ transform: `translateY(-${offset}px)` }">
        <div v-for="(num, index) in displayNumbers" :key="index" class="number">
          {{ num }}
        </div>
      </div>
    </div>
    <button @click="increment">+</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentValue: 0, // 当前显示的数字（0 到 9）
      displayNumbers: [9, 0, 1], // 当前显示的数字窗口
      offset: 20, // 偏移量，初始显示中间数字
      itemHeight: 20, // 每个数字的高度（单位：px）
    }
  },
  methods: {
    increment() {
      // 向上滚动（增加数字）
      this.offset += this.itemHeight
      this.$nextTick(() => {
        setTimeout(() => {
          if (this.currentValue === 9) {
            this.currentValue = 0
          } else {
            this.currentValue++
          }
          this.updateDisplayNumbers()
          this.offset = this.itemHeight // 重置到中间位置
          this.disableTransition()
        }, 500) // 等待动画完成
      })
    },
    decrement() {
      // 向下滚动（减少数字）
      this.offset -= this.itemHeight
      this.$nextTick(() => {
        setTimeout(() => {
          if (this.currentValue === 0) {
            this.currentValue = 9
          } else {
            this.currentValue--
          }
          this.updateDisplayNumbers()
          this.offset = this.itemHeight // 重置到中间位置
          this.disableTransition()
        }, 500) // 等待动画完成
      })
    },
    updateDisplayNumbers() {
      // 根据当前值动态生成显示数组
      const prev = (this.currentValue - 1 + 10) % 10 // 前一个数字
      const next = (this.currentValue + 1) % 10 // 后一个数字
      this.displayNumbers = [prev, this.currentValue, next]
    },
    disableTransition() {
      const wrapper = this.$el.querySelector('.number-wrapper')
      wrapper.style.transition = 'none'
      wrapper.style.transform = `translateY(-${this.offset}px)`
      wrapper.offsetHeight // 强制重绘
      wrapper.style.transition = 'transform 0.5s ease'
    },
  },
  created() {
    this.updateDisplayNumbers() // 初始化显示数组
  },
}
</script>

<style>
.number-scroll {
  display: flex;
  align-items: center;
  gap: 10px;
}

.number-display {
  width: 30px;
  height: 20px; /* 只显示一个数字的高度 */
  overflow: hidden;
  position: relative;
}

.number-wrapper {
  transition: transform 0.5s ease; /* 平滑滚动动画 */
}

.number {
  height: 20px; /* 每个数字的高度 */
  line-height: 20px;
  text-align: center;
}
</style>
