<template>
  <div>
  <q-btn icon="add" flat dense @click="felAddNewApiDialog = true">
    <q-tooltip>
      Add New API Key/Secret
    </q-tooltip>
  </q-btn>


  <q-dialog v-model="felAddNewApiDialog" persistent>
    <q-card class="card-in-level-3-dialog">
      <q-card-section class="row justify-center">
        Add new API key/secret
        <q-space/>
        <q-btn icon='close' flat dense v-close-popup/>
      </q-card-section>

      <q-card-section>
        <div class="row">
          <q-input
              outlined
              v-model="api_name"
              type="text"
              rounded
              label="API Name"
              bottom-slots
              :error="api_name_err"
              :rules='[]'
            >
            <template v-slot:error>{{api_name_err_msg}}</template>

            </q-input>
        </div>

        <div class="row">
          <q-input
              outlined
              v-model="api_key"
              type="password"
              rounded
              label="API Key"
              bottom-slots
              :error="api_key_err"
            >
            <template v-slot:error>{{api_key_err_msg}}</template>

            </q-input>
        </div>


        <div class="row">
          <q-input
              outlined
              v-model="api_secret"
              type="password"
              rounded
              label="API Secret"
              bottom-slots
              :error="api_secret_err"
            >
            <template v-slot:error>{{api_secret_err_msg}}</template>

            </q-input>
        </div>

        <div class="row">
          <felAppAddDataAskPin/>
        </div>

      </q-card-section>
    </q-card>
  </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue"
import felAppAddDataAskPin from 'components/level3/fel-app-add-data-ask-pin.vue'
export default {
  name: 'felAddNewApi',
  components: {
    felAppAddDataAskPin,
  },
  setup () {
    const felAddNewApiDialog = ref(false)

    const api_name = ref('')
    const api_key = ref('')
    const api_secret = ref('')

    const api_name_err = ref(false)
    const api_key_err = ref(false)
    const api_secret_err = ref(false)

    const api_name_err_msg = ref('')
    const api_key_err_msg = ref('')
    const api_secret_err_msg = ref('')

    return {
      felAddNewApiDialog,
      api_name,
      api_key,
      api_secret,
      api_name_err,
      api_key_err,
      api_secret_err,
      api_name_err_msg,
      api_key_err_msg,
      api_secret_err_msg
    }
  }
}
</script>
