<template>
    <footer class="bdrs6 sh3 d-flex justify-space-between footer-content">
        <w-button
            v-if="prev != ''"
            @click="updateSelectedMail(prev as string)"
            class="ma1"
            bg-color="primary"
        >
            <w-icon class="ml1">mdi mdi-chevron-double-left</w-icon>
            Prev
        </w-button>
        <div class="spacer"></div>
        <w-button
            v-if="next != ''"
            @click="updateSelectedMail(next as string)"
            class="ma1"
            bg-color="primary"
        >
            Next
            <w-icon class="ml1">mdi mdi-chevron-double-right</w-icon>
        </w-button>
    </footer>
</template>

<script setup lang="ts">
    import { computed, inject } from 'vue';
    import { Socket } from 'socket.io-client';
    
    import { Mail } from '@mail-app/model';
    import { ClientToServerEvents, ServerToClientEvents } from '@mail-app/event';


    const socket = inject('socket') as Socket<ServerToClientEvents, ClientToServerEvents>;

    const props = defineProps<{ 
        mails: Mail[],
        mail: Mail
    }>();

    const emit = defineEmits<{ (e: 'update:mail', mail: Mail): void }>();

    const prev = computed(() => {
        return props.mail.history || ''
    });
    const next = computed(() => {
        return(props.mails.filter(mail => {
            return mail.history == props.mail._id
        })[0]?._id || '')
    });

    const updateSelectedMail = (id: string) => {
        const search = props.mails.find(a => a._id == id)

        if (search) {
            emit('update:mail', search)
        } else {
            socket.emit('getMailById',id, (mail) => emit('update:mail', mail as Mail))
        }
    }
</script>

<style scoped>
.footer-content {
    min-height: 60px;
    background-color: white;
}
</style>