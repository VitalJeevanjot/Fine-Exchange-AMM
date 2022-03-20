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
        Add new API key/secret
        <q-space/>
        <q-btn icon='close' flat dense v-close-popup/>
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

        <div class="row justify-center">
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


    return {
      felAddNewApiDialog,
      api_name,
      api_key,
      api_secret,
      val_binding_api_name,
      val_binding_api_key,
      val_binding_api_secret
    }
  }
}
</script>
