export const usePopupStore = defineStore('popup', {
  state: () => ({
    show: false,
  }),

  actions: {
    open() {
      this.show = true
    },
    close() {
      this.show = false
    },
  },
})
