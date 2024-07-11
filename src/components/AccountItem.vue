<script setup lang="ts">
import { ref } from 'vue';
import { defineEmits } from 'vue';
import { Account } from '../type/main.ts';

const props = defineProps<{
  account: Account,
}>();
const emit = defineEmits(['delete', 'update']);

const account = ref<Account>(props.account);

const labelString = ref((account.value.label || []).map(item => item.text).join(';'));
console.log(labelString);
const types = ['LDAP', 'Local'];

function onLabelBlur() {
  account.value.label = labelString.value.split(';').map(text => ({ text }));
  emit('update', account.value);
}

function onChange() {
  emit('update', account.value);
}

function onBlur() {
  emit('update', account.value);
}

function onDelete() {
  emit('delete');
}
</script>

<template>
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
              v-model.lazy="account.login"
              @blur="onBlur"
              label="Логин"
            ></v-text-field>
          </v-col>
          <v-col v-if="account.type === 'Local'">
            <v-text-field
              v-model.lazy="account.password"
              @blur="onBlur"
              label="Пароль"
              type="password"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-btn @click="onDelete"></v-btn>
          </v-col>
        </v-row>
      </v-card-text>
</template>

  
<style scoped>
</style>
  