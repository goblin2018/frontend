export const usePopupStore = defineStore({
  id: 'popup',
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
