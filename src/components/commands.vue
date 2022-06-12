<script setup>
import { ref, } from 'vue';
import { storeToRefs } from 'pinia'
import { useChatStore } from '../stores/chat'

const store = useChatStore()

const { 
    commands,
    commandsPageState
} = storeToRefs(useChatStore())

function commandsPageClose(){
    console.log(commandsPageState.value)
    store.changeCommandsPageState(false)
}

</script>

<template>
  <!-- commands -->
    <div v-if="commandsPageState" class="y-name-wr">
        <div class="commands">
            <div class="qst">
                Commands
            </div>
            <div v-for="command in commands" :key="command.command" class="command">
                <span class="cmd">{{ command.command }}  </span>
                - {{ command.effect }}
            </div>
            <div @click="commandsPageClose" class="c-close">
                Close
            </div>
        </div>
    </div>
    <!-- commands -->
</template>

<style scoped>
@import '../styles/commands.css';
</style>
