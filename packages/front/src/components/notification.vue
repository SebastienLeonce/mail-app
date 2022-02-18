<template>
    <w-notification
        v-model="show"
        :bottom="true"
        :right="true"
        :timeout="3000"
        round
        shadow>
    <div class="pa2">
        <p>New mail from: <span>{{ mail.metadata.sender.mail }}</span> </p>
        <w-button
            class="mt2"
            @click="$emit('update:selected-mail', mail); show = false"
        >
            Open
        </w-button>
    </div>
    </w-notification>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Mail } from '@mail-app/model';


const props = defineProps<{ 
    mail: Mail;
    modelValue: boolean;
}>()
const emit = defineEmits<{ 
    (e: 'update:selected-mail', mail: Mail): void;
    (e: 'update:modelValue', val: boolean): void;
}>();

const show = computed({
    get: () => props.modelValue,
    set: () => emit('update:modelValue', false)
})
</script>