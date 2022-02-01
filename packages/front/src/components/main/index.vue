<template>
    <w-flex 
        column 
        :style="transform"
        class="content"
    >
        <Header :mail="mail"/>
        <Content  :mail="mail" v-model:show-reply="showReply"/>
        <Response :mail="mail" v-model:show-reply="showReply"/>
        <Footer :mail="mail" @update:mail="emit('update:mail', $event)" :mails="mails"/>
    </w-flex>
</template>

<script setup lang="ts">
    import { inject, ref, watch } from 'vue';

    import Header   from './header.vue';
    import Content  from './content.vue';
    import Response from './response.vue';
    import Footer   from './footer.vue';
    
    import { Mail } from '@mail-app/model';
    import WaveUI   from 'wave-ui';

    const waveUi : WaveUI = inject('waveui') as WaveUI

    const showReply = ref(false);
    const transform = ref("height: 100%;width: calc(100% - 25em);")

    defineProps<{ 
        mails: Mail[],
        mail: Mail
    }>();

    const emit = defineEmits<{ (e: 'update:mail', mail: Mail): void }>();

    watch(waveUi, () => {
        if (waveUi.breakpoint.xs){
            transform.value = "height: 100%;width: calc(100% - 15em)"
        } else {
            transform.value = "height: 100%;width: calc(100% - 25em)"
        }

    })
</script>

<style scoped>
@media screen and (max-width: 600px) {
  .content {
    min-width: -webkit-fill-available;
  }
}
</style>