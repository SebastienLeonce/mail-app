<template>
    <main class="grow bdrs6 sh3 main-content">
        <p v-html="mail.content" style="height: 100%;"></p>
        <w-button
            class="mt-12 ml7 main-btn" 
            v-if="mail.content != '' && !showReply"
            icon="mdi mdi-reply" xl 
            @click="emit('update:show-reply', true)"
            :hidden="false"
        ></w-button>
    </main>
</template>

<script setup lang="ts">
    import { Mail } from '@mail-app/model';

    defineProps<{ 
        mail: Mail,
        showReply: boolean
    }>();

    const emit = defineEmits<{
        (e: 'update:show-reply', val: true): void;
    }>();
</script>

<style scoped>
.main-content {
    background-color: white;
    position: relative;
    overflow-wrap: anywhere; 
    overflow-y: auto;
}

.main-btn {
    position: fixed;
    left: 0;
}
</style>