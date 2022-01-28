<template>
    <w-overlay 
        v-model="showOverlay" 
        bg-color="rgba(35, 71, 129, 0.4)"
    >
        <w-card class="card-content sh5">
            <w-form 
                @success="sendMsg"
                v-model="valid">
                <w-input 
                    v-model="to"
                    class="mb1" 
                    label="To" 
                    tile
                    :validators="[validator.required]">
                </w-input>
                <w-input 
                    v-model="subject"
                    class="mb1" 
                    label="Subject" 
                    tile
                    :validators="[validator.required]">
                </w-input>
                <w-textarea 
                    v-model="content"
                    rows="10" 
                    :resizable='false'
                    :validators="[validator.required]"
                >
                    Content
                </w-textarea>
                <div>
                    <w-button 
                        class="my1 mr2" 
                        bg-color="warning" 
                        type="reset"
                    >
                        Reset
                    </w-button>
                    <w-button 
                        class="my1" 
                        type="submit"
                        :disabled="valid === false"
                    >
                        Validate
                    </w-button>
                </div>
            </w-form>
        </w-card>
    </w-overlay>
</template>

<script setup lang="ts">
    import { computed, inject, ref } from 'vue'
    import { Socket }       from 'socket.io-client';
    import { useUserStore } from '@/store/user'
    import WaveUI           from '@/plugins/wave-ui';

    const store   = useUserStore()

    const props   = defineProps<{ modelValue: boolean }>();
    const emit    = defineEmits<{ (e: 'update:modelValue', val: boolean): void;}>();

    const socket  = inject('socket') as Socket;
    const waveUi  = inject('waveui') as WaveUI;

    const to      = ref('');
    const subject = ref('')
    const content = ref('')
    const valid   = ref(null);

    const validator =  {
        required: (value: string) => !!value || 'This field is required'
    }

    const sendMsg = () => {
        socket.emit("sendMsg", { 
			metadata: {
				...store.user,
				titre: subject.value,
				categories: ['TEST'],
				to: to.value
			},
			content: content.value,
			interaction: true,
			history: undefined
		});
        
        emit('update:modelValue', false)
        waveUi.notify('Message successfully sent !', 'success')
        to.value      = '';
        subject.value = '';
        content.value = '';
    }
    
    const showOverlay = computed({
        get: () => props.modelValue,
        set: () => emit('update:modelValue', false)
    })

</script>

<style scoped>
.card-content {
    background-color: #FFFFFF;
    min-width: 300px;
}
</style>