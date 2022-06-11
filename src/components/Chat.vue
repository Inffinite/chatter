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

function sendText(){
    console.log(message.value)
}

function addName(){
    localStorage.setItem("username", me.value)
    yname.value = false 
}

function addText(){
    switch (message.value) {
        case "/clear":
            store.clearMessages()
            message.value = ""
            break;
    
        default:
            if(message.value.length <= 0){
                console.log('')
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
            var audio = new Audio('https://github.com/Inffinite/chatter/blob/main/src/assets/new.mpeg?raw=true')
            audio.play()
            console.log(data)
            store.addMessage({ username: data.username, message: data.message, date: data.date })
        })
    } else {
        socket.on("chat", (data) => {
            var audio = new Audio('https://github.com/Inffinite/chatter/blob/main/src/assets/new.mpeg?raw=true')
            audio.play()
            console.log(data)
            store.addMessage({ username: data.username, message: data.message, date: data.date })
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
                    {{ moment(mymessage.date).format("Do MMM h:mm a") }}
                </div>
            </div>
        </div>
        <div class="text-inp">
            <input @keyup.enter="addText()" v-model="message" type="text" placeholder="Press Enter to send" class="chat-text">
        </div>
    </div>
  </div>
</template>

<style scoped>
@import '../styles/chat.css';
</style>
