import { defineStore } from 'pinia'
import { ref } from 'vue'

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

  function isLogged () : boolean {
    if (user.value.from != '') return true
    return false
  }

  function login (data : User) {
    user.value = data
  }

  function logout () {
    user.value = {
      name: '',
      account: '',
      from: ''
    }
  }

  return { user, isLogged, login, logout }
})