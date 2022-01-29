<template>
    <header class="bdrs6 sh3 d-flex justify-space-evenly align-center align-self-stretch header-content"
    >
        <span>Subject: {{ mail.metadata.titre }}</span>
        <span>To: {{ to }}</span>
        <span>At: {{ date }}</span>
    </header>
</template>

<script setup lang="ts">
    import { computed }     from 'vue';
    import { useUserStore } from '@/store/user';
    
    import { Mail } from '@mail-app/model';

    const store = useUserStore();

    const props = defineProps<{ mail: Mail }>();

    const date = computed(() => {
        if (props.mail.metadata.date)
            return new Date(props.mail.metadata.date as unknown as string).toLocaleString();
        return ''
    })

    const to = computed(() => {
        return store.user.from == props.mail.metadata.to ? props.mail.metadata.from : props.mail.metadata.to
    })
</script>

<style scoped>
.header-content {
    background-color: white;
    min-height: 60px;
    flex-wrap: wrap;
}
</style>