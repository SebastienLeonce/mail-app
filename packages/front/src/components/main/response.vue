<template>
    <w-transition-expand y>
        <main  v-if="showReply" class="response-container sh3 bdrs3">
            <w-textarea 
                rows="10" 
                v-model="content"
                :resizable='false'
            >
                Response
            </w-textarea>
            <w-button
                class="ma1 mr6 response-close" 
                icon="mdi mdi-close" xl
                @click="emit('update:show-reply', false)"
            ></w-button>
            <w-button
                class="ma1 mr6 response-send" 
                icon="mdi mdi-send" xl
                @click="response"
            ></w-button>
        </main>
    </w-transition-expand>
</template>

<script setup lang="ts">
    import { Socket }       from 'socket.io-client';
    import { inject, ref }  from 'vue';
    import { useUserStore } from '@/store/user'

    import { ClientToServerEvents, ServerToClientEvents } from '@mail-app/event';

    import { Mail }   from '@mail-app/model';
    import WaveUI from 'wave-ui';

    const socket = inject('socket') as Socket<ServerToClientEvents, ClientToServerEvents>;
    const waveUi  = inject('waveui') as WaveUI
    
    const props = defineProps<{ 
        mail: Mail,
        showReply: boolean
    }>();
    const emit = defineEmits<{ (e: 'update:show-reply', val: false): void }>();
    
    const store = useUserStore()

    const content = ref('');

    const response = () => {
        const to = props.mail.metadata.sender.mail == store.user.from ? props.mail.metadata.receiver : props.mail.metadata.sender.mail;
        socket.emit("sendMsg", { 
			metadata: {
                sender: {
                    name: store.user.name,
                    lastName: store.user.name,
                    account: store.user.account,
                    mail: store.user.from
                },
                receiver: to,
                subject: props.mail.metadata.subject,
                categories: ['TEST']
			},
			content: content.value,
			history: props.mail._id as string
		});
        content.value = '';
        emit('update:show-reply', false)
        waveUi.notify('Response successfully sent !', 'success')
    }
</script>

<style scoped>
.response-container {
    z-index: 10;
    position: relative;
}

.response-close {
    position: absolute;
    top: 0;
    right: 0;
}

.response-send {
    position: absolute;
    right: 0;
    bottom: 0px;
    margin-bottom: 20px;
}
</style>