import { defineStore } from 'pinia'

export const useChatStore = defineStore({
  id: 'chat',
  state: () => ({
    myname: "Lewis",
    commands: [
      {
        command: '/ohno',
        effect: "ohno sound effect"
      },
      {
        command: '/minionLaugh',
        effect: "Launging minion sound effect"
      },
      {
        command: '/minionHello',
        effect: "Minion saying hello"
      },
      {
        command: '/whips',
        effect: "Whips sound effect"
      },
      {
        command: '/commands',
        effect: "Show this list of commands"
      },
    ],
    commandsPageState: true,
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

    changeCommandsPageState(state){
      this.commandsPageState = state
    },

    clearMessages(){
      this.messages = []
    }
  }
})
