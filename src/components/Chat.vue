<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useChatStore } from "../stores/chat";
import Commands from "./commands.vue";
import axios from "axios";
import moment from "moment";
import { io } from "socket.io-client";
const socket = io("https://chatt6969.herokuapp.com");

const store = useChatStore();

const { messages, myname, commands, commandsPageState } = storeToRefs(
  useChatStore()
);

const message = ref("");
const yname = ref(false);
const myip = ref(localStorage.getItem("ip"));
const myos = ref(localStorage.getItem('os'))
const me = ref(localStorage.getItem("username"));
const allmessages = ref("allmessages");

function addName() {
  localStorage.setItem("username", me.value);
  yname.value = false;
}

function commandsPage() {
  console.log(commandsPageState.value);
  store.changeCommandsPageState(true);
}

function soundEffects(sound) {
  var audio = new Audio(sound);
  audio.play();
}

function getOs() {
  if (navigator.userAgent.indexOf("Android") != -1) {
    localStorage.setItem("os", "Android");
    return "Android";
  }

  if (navigator.userAgent.indexOf("Mac") != -1) {
    localStorage.setItem("os", "Mac os");
    return "Mac os";
  }

  if (navigator.userAgent.indexOf("Win") != -1) {
    localStorage.setItem("os", "Windows");
    return "Windows";
  }

  if (navigator.userAgent.indexOf("Linux") != -1) {
    localStorage.setItem("os", "Linux");
    return "Linux";
  }
}

function get_ip() {
  axios
    .get("https://ifconfig.me")
    .then((res) => {
      console.log(res.data);
      localStorage.setItem("ip", res.data);
    })
    .catch((e) => {
      console.log(e);
    });
}

function addText() {
  switch (message.value) {
    case "/clear":
      store.clearMessages();
      message.value = "";
      break;

    case "/commands":
      commandsPage();
      break;

    case "/minionLaugh":
      socket.emit("chat", { message: "/minionLaugh" });
      soundEffects(
        "https://github.com/Inffinite/chatter/blob/main/src/assets/minionLaugh.mpeg?raw=true"
      );
      message.value = "";
      break;

    case "/zeze":
      socket.emit("chat", { message: "/zeze" });
      soundEffects(
        "https://github.com/Inffinite/chatter/blob/main/src/assets/zeze.mpeg?raw=true"
      );
      message.value = "";
      break;

    case "/minionHello":
      socket.emit("chat", { message: "/minionHello" });
      soundEffects(
        "https://github.com/Inffinite/chatter/blob/main/src/assets/minionHello.mpeg?raw=true"
      );
      message.value = "";
      break;

    case "/ohno":
      socket.emit("chat", { message: "/ohno" });
      soundEffects(
        "https://github.com/Inffinite/chatter/blob/main/src/assets/ohno.mpeg?raw=true"
      );
      message.value = "";
      break;

    case "/whips":
      socket.emit("chat", { message: "/whips" });
      soundEffects(
        "https://github.com/Inffinite/chatter/blob/main/src/assets/whips.mpeg?raw=true"
      );
      message.value = "";
      break;

    case "/changename":
      yname.value = true;
      me.value = "";
      message.value = "";
      break;

    default:
      if (message.value.length <= 0) {
        console.log("[---------]");
      } else {
        socket.emit("chat", {
          username: me.value,
          message: message.value,
          ip: myip.value,
          os: myos.value,
          date: new Date(),
        });
        store.addMessage({
          username: me.value,
          message: message.value,
          ip: myip.value,
          os: myos.value,
          date: new Date(),
        });
        message.value = "";
      }
      break;
  }
}

onMounted(() => {
  const m = localStorage.getItem("username");
  getOs()
  get_ip();
  if (!m) {
    yname.value = true;
    socket.on("chat", (data) => {
      soundEffects(
        "https://github.com/Inffinite/chatter/blob/main/src/assets/new.mpeg?raw=true"
      );
      console.log(data);
      store.addMessage({
        username: data.username,
        message: data.message,
        ip: data.ip,
        os: data.os,
        date: data.date,
      });
    });
  } else {
    socket.on("chat", (data) => {
      switch (data.message) {
        case "/minionLaugh":
          soundEffects(
            "https://github.com/Inffinite/chatter/blob/main/src/assets/minionLaugh.mpeg?raw=true"
          );
          break;

        case "/zeze":
          soundEffects(
            "https://github.com/Inffinite/chatter/blob/main/src/assets/zeze.mpeg?raw=true"
          );
          break;

        case "/minionHello":
          soundEffects(
            "https://github.com/Inffinite/chatter/blob/main/src/assets/minionHello.mpeg?raw=true"
          );
          break;

        case "/ohno":
          soundEffects(
            "https://github.com/Inffinite/chatter/blob/main/src/assets/ohno.mpeg?raw=true"
          );
          break;

        case "/whips":
          soundEffects(
            "https://github.com/Inffinite/chatter/blob/main/src/assets/whips.mpeg?raw=true"
          );
          break;

        default:
          var audio = new Audio(
            "https://github.com/Inffinite/chatter/blob/main/src/assets/new.mpeg?raw=true"
          );
          audio.play();
          console.log(data);
          store.addMessage({
            username: data.username,
            message: data.message,
            ip: data.ip,
            os: data.os,
            date: data.date,
          });
          break;
      }
    });
  }
});
</script>

<template>
  <div class="chat">
    <Commands />

    <!-- name component -->
    <div v-if="yname" class="y-name-wr">
      <div class="y-name">
        <div class="qst">Whats your name?</div>
        <div class="y-q">
          <input
            @keyup.enter="addName()"
            v-model="me"
            type="text"
            placeholder="Someone"
            class="y-ans"
          />
        </div>
        <div @click="addName" class="c-close">Continue</div>
      </div>
    </div>
    <!-- name component -->

    <div class="main-card">
      <!-- Chatty -->
      <div ref="allmessages" id="all-chats" class="all-chats">
        <div
          v-for="mymessage in messages"
          :key="mymessage.username"
          class="message"
        >
          {{ mymessage.username }}
          <div class="chatmessage">
            {{ mymessage.message }}
          </div>
          <div class="timestamp">
            {{ moment(mymessage.date).format("MMM h:mm a") }}
             {{ mymessage.os }} {{ mymessage.ip }}
          </div>
        </div>
      </div>
      <div class="text-inp">
        <input
          @keyup.enter="addText()"
          v-model="message"
          type="text"
          placeholder="Press Enter to send"
          class="chat-text"
          autofocus
        />
        <svg
          @click="addText()"
          xmlns="http://www.w3.org/2000/svg"
          class="iconS"
          viewBox="0 0 20 20"
        >
          <path
            d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../styles/chat.css";
@import "../styles/commands.css";
</style>
