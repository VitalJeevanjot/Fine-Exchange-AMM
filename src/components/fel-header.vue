<template>
  <q-header style="background-color: #071013" class="q-pa-xs">
      <q-toolbar>

        <q-avatar rounded style="width: 89px; height: 45px;" class="q-ml-md">
          <img :src="logo_src" alt="Fine Exchange Small Logo">
        </q-avatar>

        <q-space/>

        <q-btn flat round dense icon="add_circle" class="q-mr-sm" />
        <q-btn flat round dense icon="settings" class="q-mr-sm" />
        <q-btn flat round dense icon="account_circle" class="q-mr-sm" />
        <q-btn @click=toggleFelHeaderDialog flat round dense icon="help" class="q-mr-md" />


      </q-toolbar>
      <felHelpModal v-model:modal_open="felHeaderDialog" />
    </q-header>


</template>

<script>
import { defineComponent, ref } from "vue";

import felHelpModal from "components/fel-help-modal.vue"
import felSettingsModal from "components/fel-settings-modal.vue"
import felUserModal from "components/fel-user-modal.vue"

export default defineComponent ({
  name: 'felHeader',
  components: {
    felHelpModal
  },
  props: {
    logo_src: {
      type: String,
      required: true,
    }
  },
  setup () {
    const felHeaderDialog = ref(false);

    return {
      felHeaderDialog,
      toggleFelHeaderDialog() {
        felHeaderDialog.value = !felHeaderDialog.value
      },
      // toggleFelHeaderDialog() {
      //   felHeaderDialog.value = !felHeaderDialog.value
      // },
      // toggleFelHeaderDialog() {
      //   felHeaderDialog.value = !felHeaderDialog.value
      // }
    }
  }
})
</script>
