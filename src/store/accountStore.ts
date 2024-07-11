// src/stores/accountStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Account } from '../type/main.ts';

export const useAccountStore = defineStore('accountStore', {
    state: () => ({
        accounts: ref([] as Account[]),
    }),
    persist: true,
    actions: {
        addAccount() {
            this.accounts.push({ label: [], type: 'LDAP', login: 'Значение', password: null });
        },

        deleteAccount(index: number) {
            this.accounts.splice(index, 1);
        },

        updateAccount(index: number, account: Account) {
            this.accounts[index] = account;
        }
    }
});
