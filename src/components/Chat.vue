<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia'
import { useChatStore } from '../stores/chat'
import moment from 'moment'
import { io } from "socket.io-client"
const socket = io("https://chatt6969.herokuapp.com")

const store = useChatStore()

const { messages, myname } = storeToRefs(useChatStore())

const message = ref('')
const yname = ref(false)
const me = ref(localStorage.getItem('username'))
const allmessages = ref('allmessages')

function addName(){
    localStorage.setItem("username", me.value)
    yname.value = false 
}

function soundEffects(sound){
    var audio = new Audio(sound)
    audio.play()
}

function addText(){
    switch (message.value) {
        case "/clear":
            store.clearMessages()
            message.value = ""
            break;

        case "/minionLaugh":
            socket.emit("chat", { message: "/minionLaugh" })
            soundEffects('https://github.com/Inffinite/chatter/blob/main/src/assets/minionLaugh.mpeg?raw=true')
            message.value = ""
            break;

        case "/minionHello":
            socket.emit("chat", { message: "/minionHello" })
            soundEffects('https://github.com/Inffinite/chatter/blob/main/src/assets/minionHello.mpeg?raw=true')
            message.value = ""
            break;

        case "/ohno":
            socket.emit("chat", { message: "/ohno" })
            soundEffects('https://github.com/Inffinite/chatter/blob/main/src/assets/ohno.mpeg?raw=true')
            message.value = ""
            break;

        case "/whips":
            socket.emit("chat", { message: "/whips" })
            soundEffects('https://github.com/Inffinite/chatter/blob/main/src/assets/whips.mpeg?raw=true')
            message.value = ""
            break;

        case "/changename":
            yname.value = true
            me.value = ""
            message.value = ""
            break;
    
        default:
            if(message.value.length <= 0){
                console.log('[---------]')
            } else {
                socket.emit("chat", { username: me.value, message: message.value, date: new Date() })
                store.addMessage({ username: me.value, message: message.value, date: new Date() })
                message.value = ""
            }
            break;
    }
}

onMounted(() => {
    const m = localStorage.getItem('username')
    if(!m){
        yname.value = true
        socket.on("chat", (data) => {
            soundEffects('https://github.com/Inffinite/chatter/blob/main/src/assets/new.mpeg?raw=true')
            console.log(data)
            store.addMessage({ username: data.username, message: data.message, date: data.date })
        })
    } else {
        socket.on("chat", (data) => {
            switch (data.message) {
                case '/minionLaugh':
                    soundEffects('https://github.com/Inffinite/chatter/blob/main/src/assets/minionLaugh.mpeg?raw=true')
                    break;

                case '/minionHello':
                    soundEffects('https://github.com/Inffinite/chatter/blob/main/src/assets/minionHello.mpeg?raw=true')
                    break;

                case '/ohno':
                    soundEffects('https://github.com/Inffinite/chatter/blob/main/src/assets/ohno.mpeg?raw=true')
                    break;

                case '/whips':
                    soundEffects('https://github.com/Inffinite/chatter/blob/main/src/assets/whips.mpeg?raw=true')
                    break;
            
                default:
                    var audio = new Audio('https://github.com/Inffinite/chatter/blob/main/src/assets/new.mpeg?raw=true')
                    audio.play()
                    console.log(data)
                    store.addMessage({ username: data.username, message: data.message, date: data.date })
                    break;
            }
        })
    }
})
</script>

<template>
  <div class="chat">
    <!-- name component -->
    <div v-if="yname" class="y-name-wr">
        <div class="y-name">
            <div class="qst">Whats your name?</div>
            <div class="y-q">
                <input @keyup.enter="addName()" v-model="me" type="text" placeholder="Someone" class="y-ans">
            </div>
        </div>
    </div>
    <!-- name component -->

    <div class="main-card">
        <!-- Chatty -->
        <div ref="allmessages" id="all-chats" class="all-chats">
            <div v-for="mymessage in messages" :key="mymessage.username" class="message">
                {{ mymessage.username }}
                <div class="chatmessage">
                    {{ mymessage.message }}
                </div>
                <div class="timestamp">
                    {{ moment(mymessage.date).format("MMM h:mm a") }}
                </div>
            </div>
        </div>
        <div class="text-inp">
            <input @keyup.enter="addText()" v-model="message" type="text" placeholder="Press Enter to send" class="chat-text" autofocus>
        </div>
    </div>
  </div>
</template>

<style scoped>
@import '../styles/chat.css';
</style>
