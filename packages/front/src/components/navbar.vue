<template>
    <div class="fill-width">
    <w-button
        @click="openDrawer = true"
        v-if="!openDrawer"
        class="ma1 mr6 smu-hide hamburger-btn"
        icon="mdi mdi-menu" xl
    ></w-button>
    <w-drawer
        v-model="openDrawer"
        push-content
        :no-overlay="!waveUi.breakpoint.xs"
        :left="true"
        :width="drawerWidth"
    >

        <template #pushable>
            <slot>
            </slot>
        </template>

        <div 
            @scroll="canLoadMoreMail && onScroll($event)"
            class="bdrs6 sh3 fill-width hamburger-container"
        >
            <p class="title1 justify-space-between pa3 d-flex bdb1">
                <span class="hamburger-text-overflow">
                    {{ store.user.name }}
                </span>
                <w-button @click="$emit('logout')">
                    <w-icon class="mr1">mdi mdi-logout</w-icon>
                    <span v-if="!waveUi.breakpoint.xs">Logout</span>
                </w-button>
            </p>
            <w-card 
                v-for="mail in filterMail" :key="mail._id" 
                class="bd2 sh2 nav-card text-nowrap hamburger-card" 
                title-class="blue-light5--bg"
                @click="selectMail(mail)">
                <template #title>
                    <div class="hamburger-text-overflow text-nowrap">
                        <w-icon bg-color="primary">
                            mdi mdi-account
                        </w-icon>
                        <span class="hamburger-card-to">
                            {{ to(mail) }}
                        </span>
                    </div>
                    <div class="spacer"></div>
                    <div class="hamburger-text-overflow">
                        {{ mail.metadata.titre }}
                    </div>
                </template>
                <p class="hamburger-text-overflow text-nowrap" v-html="mail.content"></p>
            </w-card>
            <w-button
                class="ma1 mr6 mta mb1 hamburger-mail" 
                icon="wi-plus" xl 
                @click="emit('update:overlay', true)"
            ></w-button>
        </div>
    </w-drawer>
    </div>
</template>


<script setup lang="ts">
    import { computed, inject, ref, watch } from 'vue';
    import { Socket }       from 'socket.io-client';
    import { useUserStore } from '@/store/user';

    import { Mail } from '@mail-app/model';
    import { ClientToServerEvents, ServerToClientEvents } from '@mail-app/event';

    import WaveUI from '@/plugins/wave-ui';

    const waveUi = inject('waveui') as WaveUI
    const socket = inject('socket') as Socket<ServerToClientEvents, ClientToServerEvents>;
    const store = useUserStore();

    const openDrawer  = ref(true);
    const drawerWidth = ref("15em")

    const props = defineProps<{ 
        mails: Mail[] 
        canLoadMoreMail: boolean
    }>();

    const emit = defineEmits<{
        (e: 'update:mail', mail: Mail): void;
        (e: 'update:overlay', val: boolean): void;
        (e: 'logout') : void;
    }>();

    const filterMail = computed(() => {
        return props.mails.filter(mail => {
            return !props.mails.map((val) => {
                return val.history == mail._id
            }).includes(true)
        }).sort((a, b) => {
            return Date.parse(b.metadata.date as unknown as any) - Date.parse(a.metadata.date as unknown as any)
        })
    })

    const onScroll = (payload: Event ) => {
        const t = payload.target as HTMLInputElement

        if (t.scrollTop + t.clientHeight >= t.scrollHeight - 1)
            socket.emit('getMsg', filterMail.value.length)
    }

    watch(waveUi, () => {
        if (!waveUi.breakpoint.xs) {
            openDrawer.value = true
            drawerWidth.value = "25em"
        } else {
            drawerWidth.value = "15em"
        }
    })

    const to = (mail: Mail) => {
        return store.user.from == mail.metadata.to ? mail.metadata.from : mail.metadata.to
    }

    const selectMail = (mail: Mail) => {
        emit('update:mail', mail);
    }
</script>

<style scoped>
.hamburger-btn {
    margin: 20px; 
    position: absolute; 
    top: 0; 
    left: 0;
}

.hamburger-container {
    flex-direction: column; 
    overflow-y: auto;
}

.hamburger-card {
    margin: 10px;
    font-size: 2vh;
}

.hamburger-card-to {
    margin-left: 10px;
}

.hamburger-text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
}

.hamburger-mail {
    top: 0;
    bottom: 0;
    position: fixed;
    transform: translate(-50%, -50%);
}
</style>