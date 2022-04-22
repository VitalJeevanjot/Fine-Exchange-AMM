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
          <felDropdownExchanges 
            v-model:model="exchange_name"
          />
        </div>

        <div class="row justify-center">
          <felInput 
            v-model:_input_val="api_name"
            v-bind="val_binding_api_name"
          />
        </div>

        <div class="row justify-center">
          <felInput 
            v-model:_input_val="api_key"
            v-bind="val_binding_api_key"
          />
        </div>


        <div class="row justify-center">
          <felInput 
            v-model:_input_val="api_secret"
            v-bind="val_binding_api_secret"
          />

        </div>

        <div class="row justify-center">
          <felAppAddDataAskPin v-bind="data_to_save_binding" @savedApiData="dataSaved"/>
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
import felDropdownExchanges from 'components/level4/fel-dropdown-exchanges'
export default {
  name: 'felAddNewApi',
  components: {
    felAppAddDataAskPin,
    felInput,
    felDropdownExchanges
  },
  setup () {
    const felAddNewApiDialog = ref(false)

    const exchange_name = ref('Fine Exchanges Mainnet')

    const api_name = ref('')
    const api_key = ref('')
    const api_secret = ref('')
    const updated_date = ref(null);

    const disable_add_button = ref(false)
    
    const random_val_as_id = window.crypto.randomUUID()
    const data_to_save_binding = ref({
      'key1': `api_data_api_name_plain_pretext_${random_val_as_id}`,
      'value1': api_name,
      'key2': `api_data_api_key_pretext_${random_val_as_id}`,
      'value2': api_key,
      'key3': `api_data_api_secret_pretext_${random_val_as_id}`,
      'value3': api_secret,
      'key4': `api_data_exchange_name_pretext_${random_val_as_id}`,
      'value4': exchange_name,
      'key5': `api_data_date_plain_pretext_${random_val_as_id}`,
      'value5': updated_date,
      'disable_btn': disable_add_button
    })

    const val_binding_api_name = ref({
      _style: 'max-width: 70vw; min-width: 300px;',
      _mask: '',
      _label: 'API Name',
      _hint: 'Enter name for Key/Secret',
      _show_error: false,
      _error_msg: '',
      _rules: [val => val.length >= 4 || "Add some good name to remind yourself!"],
      _class: 'q-pt-sm'
    })

    const val_binding_api_key = ref({
      _style: 'max-width: 70vw; min-width: 300px;',
      _mask: '',
      _label: 'API Key',
      _hint: 'The API Key',
      _show_error: false,
      _error_msg: '',
      _rules: [val => val.length >= 1 || "Please add api key !"],
      _class: 'q-pt-md'
    })

    const val_binding_api_secret = ref({
      _style: 'max-width: 70vw; min-width: 300px;',
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
        disable_add_button.value = true
        updated_date.value = new Date().toLocaleString('en-GB'); // update date here
      } else {
        disable_add_button.value = false
      }
    })


    return {
      felAddNewApiDialog,
      exchange_name,
      api_name,
      api_key,
      api_secret,
      updated_date,
      data_to_save_binding,
      disable_add_button,
      val_binding_api_name,
      val_binding_api_key,
      val_binding_api_secret
    }
  },
  methods: {
    dataSaved() {
      console.log('data saved got rannn')
      this.api_name = ''
      this.api_key = ''
      this.api_secret = ''
      this.api_name = ''
      // keep recently selected exchange until setup run again
      this.felAddNewApiDialog = false
    }
  }
}
</script>
