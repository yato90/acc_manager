<script setup lang="ts">
import { ref, computed } from 'vue';
import { defineEmits } from 'vue';
import { Account } from '../type/main.ts';
import Trash from '../assets/trash.png';

const props = defineProps<{
  account: Account,
}>();
const emit = defineEmits(['delete', 'update']);

const account = ref<Account>(props.account);
const tempLogin = ref(account.value.login); // Временное хранилище для логина
const tempPassword = ref(account.value.password); // Временное хранилище для пароля

const labelString = ref((account.value.label || []).map(item => item.text).join(';'));
console.log(labelString);
const types = ['LDAP', 'Local'];
const isValid = computed(() => validateAccount(account.value, tempLogin.value, tempPassword.value));

function onLabelBlur() {
  if (isValid.value) {
    account.value.label = labelString.value.split(';').map(text => ({ text }));
    emit('update', account.value);
  }
}

function onChange() {
  if (isValid.value) {
    emit('update', account.value);
  }
}

function onBlur() {
  if (isValid.value) {
    account.value.login = tempLogin.value;
    account.value.password = tempPassword.value;
    emit('update', account.value);
  }
}

function onDelete() {
  emit('delete');
}

function validateAccount(account: Account, tempLogin: string, tempPassword: string | null): boolean {
  if (!tempLogin || tempLogin.length === 0 || tempLogin.length > 100) {
    return false;
  }
  if (account.type === 'Local' && (!tempPassword || tempPassword.length === 0 || tempPassword.length > 100)) {
    return false;
  }
  return true;
}
</script>

<template>
  <v-card :class="{'invalid': !isValid}" outlined>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field
            v-model.lazy="labelString"
            @blur="onLabelBlur"
            label="Метки"
            placeholder="Необязательно"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-select
            v-model="account.type"
            @change="onChange"
            :items="types"
            label="Тип записи"
          ></v-select>
        </v-col>
        <v-col>
          <v-text-field
            v-model.lazy="tempLogin"
            @blur="onBlur"
            label="Логин"
          ></v-text-field>
        </v-col>
        <v-col v-if="account.type === 'Local'">
          <v-text-field
            v-model.lazy="tempPassword"
            @blur="onBlur"
            label="Пароль"
            type="password"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-btn @click="onDelete">
            <img :src="Trash" alt="Question icon" style="width: 24px; height: 24px;">
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

  
<style scoped>
.invalid {
  border: 1px solid red;
}
</style>
  