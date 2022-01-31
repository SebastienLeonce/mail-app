import { defineStore } from 'pinia'
import { Mail        } from '@mail-app/model';
import { reactive, ref, watch } from 'vue'

interface User {
    name: string,
    account: string,
    from: string
}

export const useUserStore = defineStore('user', () => {
    const user = ref<User>({
        name: '',
        account: '',
        from: ''
    });

    const mails = reactive<Mail[]>([]);

    watch<Mail[]>(mails as Mail[], (newValue) => {
        const oldValue : Mail[] = JSON.parse(localStorage.getItem('mails') || '[]');

        if (oldValue.length == 0) 
            localStorage.setItem('mails', JSON.stringify(newValue))
        else {
            const m = newValue.filter(mail => {
                return !oldValue.map(item => {
                    return mail._id == item._id
                }).includes(true)
            })
            localStorage.setItem('mails', JSON.stringify(m.concat(oldValue)))
        }
    })

    function isLogged () : boolean {
        return user.value.from != ''
    }

    function login (data : User) {
        user.value = data

        if (localStorage.getItem('user'))
            mails.concat(JSON.parse(localStorage.getItem('mails') || '[]'))
            
        localStorage.setItem('user', JSON.stringify(data))
    }

    function logout () {
        user.value = {
            name: '',
            account: '',
            from: ''
        }

        mails.splice(0, mails.length)
        localStorage.clear()
    }

  return { user, isLogged, login, logout, mails }
})