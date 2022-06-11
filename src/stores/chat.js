import { defineStore } from 'pinia'

export const useChatStore = defineStore({
  id: 'chat',
  state: () => ({
    myname: "Lewis",
    messages: [
        {
            username: "Billy",
            message: "I really love cyber security.",
            date: new Date()
        }
    ]
  }),
  getters: {
    // messages: (state) => state.messages,
    username: (state) => state.myname
  },
  actions: {
    addMessage(message) {
      this.messages.unshift(message)
    },

    clearMessages(){
      this.messages = []
    }
  }
})
