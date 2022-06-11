<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia'
import { useChatStore } from '../stores/chat'
import moment from 'moment'
import { io } from "socket.io-client"
const socket = io("ws://localhost:4444")

const store = useChatStore()

const { messages, myname } = storeToRefs(useChatStore())

const message = ref('')
const allmessages = ref('allmessages')

function sendText(){
    console.log(message.value)
}

function scrollToBottom(){
    var elem = document.getElementById('all-chats')
    elem.scroll({ top: elem.scrollHeight, behavior: "smooth" })
}

function addText(){
    socket.emit("chat", { username: myname, message: message.value, date: new Date() })
    store.addMessage({ username: myname, message: message.value, date: new Date() })
    message.value = ""
}

onMounted(() => {
    socket.on("chat", (data) => {
        var audio = new Audio('http://localhost:8000/new.mpeg')
        audio.play()
        console.log(data.username._object.myname)
        store.addMessage({ username: data.username._object.myname, message: data.message, date: data.date })
    })
})
</script>

<template>
  <div class="chat">
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
            <input @keyup.enter="addText()" v-model="message" type="text" placeholder="Say something" class="chat-text">
        </div>
    </div>
  </div>
</template>

<style scoped>
@import '../styles/chat.css';
</style>
