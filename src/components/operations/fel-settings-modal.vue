<template>
  <div>
    <q-btn flat round dense icon="settings" class="q-mr-sm" @click="felSettingsDialog = true" />

    <q-dialog v-model="felSettingsDialog" persistent>
      <q-card class='card-in-level-1-dialog'>
        <q-card-section>
          <q-btn icon="close" flat dense v-close-popup/>
        </q-card-section>

        <q-card-section>
          <felApiManagement/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>

</template>

<script>

import felApiManagement from 'components/operations/fel-api-management.vue';
import { ref } from "vue";

export default {
  name: 'felSettingsModal',
  components: {
    felApiManagement
  },
  setup () {
    const felSettingsDialog = ref(false)
    return {felSettingsDialog}
  }
}
</script>
