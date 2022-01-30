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
    if (user.value.from != '') return true
    return false
  }

  function login (data : User) {
    user.value = data

    const t : Mail[] = JSON.parse(localStorage.getItem('mails') || '[]') 

    if (t.every(value => value.metadata.from == data.from || value.metadata.to == data.from))
      mails.concat(t)
    else
      localStorage.removeItem('mails')
  }

  function logout () {
    user.value = {
      name: '',
      account: '',
      from: ''
    }
  }

  return { user, isLogged, login, logout, mails }
})