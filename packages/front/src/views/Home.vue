<template>
  <w-app id="wapp" row>
    <navbar 
      @logout="logout"
      :mails="mails" 
      v-model:mail="selectedMail"  
      v-model:overlay="showOverlay" 
      :canLoadMoreMail="canLoadMoreMail">
        <Main :mail="selectedMail" @update:mail="updateMail" :mails="mails"/>
    </navbar>
    <overlay v-model="showOverlay"/>
    <notification 
      v-if="mails[0]" 
      v-model:selected-mail="selectedMail" 
      v-model="notifNewMail" 
      :mail="mails[0]" 
    />

  </w-app>
</template>

<script setup lang="ts">
import { inject, reactive, ref } from 'vue';
import { Socket }       from 'socket.io-client';
import { useUserStore } from '@/store/user'
import router           from '@/router';

import navbar  from '@/components/navbar.vue'
import overlay from '@/components/overlay.vue';
import Main    from '@/components/main/index.vue';
import notification from '@/components/notification.vue';

import {
  ClientToServerEvents,
  ServerToClientEvents
} from "@mail-app/event"

import { Mail, emptyMail } from '@mail-app/model';

const socket = inject('socket') as Socket<ServerToClientEvents, ClientToServerEvents>;
const store  = useUserStore()

const mails           = store.mails;
const showOverlay     = ref(false);
const notifNewMail    = ref(false);
const canLoadMoreMail = ref(true);
const selectedMail    = ref<Mail>(emptyMail)

socket.auth = store.user; 
socket.connect()
socket.off('getMsg')
socket.off('sendMsg')

socket.on('getMsg', (data) => { 
    if (selectedMail.value.content == '') selectedMail.value = data[0]
    if (data.length != 10) canLoadMoreMail.value = false
  
    mails.push(...data)
})

socket.on("sendMsg", (data: Mail) => {
	mails.unshift(data);

  if (store.user.from != data.metadata.from)
    notifNewMail.value = true;
});

const updateMail = (mail: Mail) => {
  if (!mails.find(a => a._id == mail._id))
    mails.push(mail)
  selectedMail.value = mail; 
}

const logout = () => {
  store.logout();
  socket.disconnect()
  router.push('/login');
}

socket.emit('getMsg');
</script>

<style>
.w-app {padding: 4px; height: 100%;}
header, footer, aside, main {
  margin: 4px;
  padding: 12px;
  text-transform: uppercase;
  color: #666;
}
</style>
