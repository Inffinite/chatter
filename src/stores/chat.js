import { defineStore } from 'pinia'

export const useChatStore = defineStore({
  id: 'chat',
  state: () => ({
    myname: "Lewis",
    messages: [
        {
            username: "Anonymous",
            message: "/clear erases all messages",
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
