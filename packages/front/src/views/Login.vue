<template>
	<w-app id="wapp" row>
		<w-overlay 
			v-model="showOverlay" 
			bg-color="rgba(221, 221, 221, 0.49)"
			:persistent="true"
			:persistent-no-animation="true"
		>
			<w-card class="sh6 login-card">
				<w-form 
					@success="login"
					v-model="valid">
					<w-input 
						v-model="name"
						class="mb1" 
						label="Name" 
						tile
						:validators="[validator.required]">
					</w-input>
					<w-input 
						v-model="account"
						class="mb1" 
						label="Account" 
						tile
						:validators="[validator.required]">
					</w-input>
					<w-input 
						v-model="from"
						class="mb1" 
						label="email" 
						tile
						:validators="[validator.required]">
					</w-input>
					<div>
						<w-button 
							class="mt2" 
							type="submit"
							:disabled="valid === false"
						>
							Validate
						</w-button>
					</div>
				</w-form>
			</w-card>
		</w-overlay>
	</w-app>
</template>

<script setup lang="ts">
	import { ref } 			from 'vue';
	import { useUserStore } from '@/store/user';
	import router 			from '@/router';

	const store  = useUserStore()

	const name    = ref('Mr Test');
	const account = ref('@test');
	const from    = ref('test@test');
	const valid   = ref(null);

	const showOverlay = ref(true)

    const validator =  {
        required: (value: string) => !!value || 'This field is required'
    }

	const login = () => {
		store.login({
			name: name.value,
			account: account.value,
			from: from.value
		});
		router.push('/')
	}
</script>

<style scoped>
	.login-card {
		background-color: #FFFFFF;
		min-width: 300px;
	}
</style>