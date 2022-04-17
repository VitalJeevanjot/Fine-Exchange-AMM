<template>
  <div>
  <q-btn icon="add" flat dense @click="felAddNewApiDialog = true">
    <q-tooltip>
      Add New API Key/Secret
    </q-tooltip>
  </q-btn>


  <q-dialog v-model="felAddNewApiDialog" persistent>
    <q-card class="card-in-level-3-dialog">
      <q-card-section>
        <q-btn icon='las la-angle-left' flat dense v-close-popup/>
        Add new API key/secret
      </q-card-section>

      <q-card-section>
        <div class="row justify-center">
          <felInput 
            v-model:_input_val="api_name"
            v-bind="val_binding_api_name"
          />
          <!-- <q-input
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

            </q-input> -->
        </div>

        <div class="row justify-center">
          <felInput 
            v-model:_input_val="api_key"
            v-bind="val_binding_api_key"
          />
          <!-- <q-input
              outlined
              v-model="api_key"
              type="password"
              rounded
              label="API Key"
              bottom-slots
              :error="api_key_err"
            >
            <template v-slot:error>{{api_key_err_msg}}</template>

            </q-input> -->
        </div>


        <div class="row justify-center">
          <felInput 
            v-model:_input_val="api_secret"
            v-bind="val_binding_api_secret"
          />

        </div>

        <div class="row justify-center" v-show="show_add_button">
          <felAppAddDataAskPin v-bind="data_to_save_binding"/>
        </div>

      </q-card-section>
    </q-card>
  </q-dialog>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue"
import felAppAddDataAskPin from 'components/level3/fel-app-add-data-ask-pin.vue'
import felInput from 'components/level4/fel-input.vue'
export default {
  name: 'felAddNewApi',
  components: {
    felAppAddDataAskPin,
    felInput
  },
  setup () {
    const felAddNewApiDialog = ref(false)

    const api_name = ref('')
    const api_key = ref('')
    const api_secret = ref('')

    const show_add_button = ref(false)

    const data_to_save_binding = ref({
      'key1': 'api_name',
      'value2': api_name,
      'key2': 'api_key',
      'value2': api_key,
      'key3': 'api_secret',
      'value3': api_secret,
      'key4': 'index',
      'value4': window.crypto.randomUUID(),
      'key5': 'type',
      'value5': 'api_data'
    })

    const val_binding_api_name = ref({
      _style: 'max-width: 70vw',
      _mask: '',
      _label: 'API Name',
      _hint: 'Enter name for Key/Secret',
      _show_error: false,
      _error_msg: '',
      _rules: [val => val.length >= 4 || "Add some good name to remind yourself!"],
      _class: 'q-pt-sm'
    })

    const val_binding_api_key = ref({
      _style: 'max-width: 70vw',
      _mask: '',
      _label: 'API Key',
      _hint: 'The API Key',
      _show_error: false,
      _error_msg: '',
      _rules: [val => val.length >= 1 || "Please add api key !"],
      _class: 'q-pt-md'
    })

    const val_binding_api_secret = ref({
      _style: 'max-width: 70vw',
      _mask: '',
      _label: 'API Secret',
      _hint: 'The API Secret',
      _show_error: false,
      _error_msg: '',
      _rules: [val => val.length >= 1 || "Please add api secret!"],
      _class: 'q-pt-sm'
    })

    watchEffect(() => {
      if(api_name.value.length < 4 || !api_key.value || !api_secret.value) {
        show_add_button.value = false
      } else {
        show_add_button.value = true
      }
    })


    return {
      felAddNewApiDialog,
      api_name,
      api_key,
      api_secret,
      data_to_save_binding,
      show_add_button,
      val_binding_api_name,
      val_binding_api_key,
      val_binding_api_secret
    }
  }
}
</script>
