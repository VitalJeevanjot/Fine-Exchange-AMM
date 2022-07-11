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
        <div class="">
          <felDropdown 
            v-model:model="exchange_name"
            v-bind="val_binding_exchanges_dropdown"
          />
        </div>

        <div class="">
          <felInput 
            v-model:_input_val="api_name"
            v-bind="val_binding_api_name"
          />
        </div>

        <div class="">
          <felInput 
            v-model:_input_val="api_key"
            v-bind="val_binding_api_key"
          />
        </div>


        <div class="">
          <felInput 
            v-model:_input_val="api_secret"
            v-bind="val_binding_api_secret"
          />

        </div>

        <div class="row justify-center">
          <felApiAddDataAskPin v-bind="val_binding_data_to_save" @savedApiData="dataSaved" @beforeSavingData="update_date_now"/>
        </div>

      </q-card-section>
    </q-card>
  </q-dialog>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue"
import felApiAddDataAskPin from 'components/pinManagers/fel-api-add-data-ask-pin.vue'
import felInput from 'components/rawElements/fel-input.vue'
import felDropdown from 'components/rawElements/fel-dropdown'
export default {
  name: 'felAddNewApi',
  components: {
    felApiAddDataAskPin,
    felInput,
    felDropdown
  },
  setup () {
    const felAddNewApiDialog = ref(false)

    const exchange_name = ref({
          value: 'https://api.fine.exchange',
          label: 'Fine Exchanges Mainnet'
    })

    const api_name = ref('')
    const api_key = ref('')
    const api_secret = ref('')
    const updated_date = ref(null);

    const disable_add_button = ref(true)
    
    const random_val_as_id = ref(null)
    
    const val_binding_data_to_save = ref({'disable_btn': disable_add_button})

    const val_binding_exchanges_dropdown = ref({
      options: 'Exchanges',
      category: 'Select Exchange'
    })

    const val_binding_api_name = ref({
      _style: 'min-width: 300px; width: 20rem;',
      _mask: '',
      _label: 'API Name',
      _hint: 'Enter name for Key/Secret',
      _show_error: false,
      _error_msg: '',
      _rules: [val => val.length >= 4 || "Add some good name to remind yourself!"],
      _class: 'q-pt-sm'
    })

    const val_binding_api_key = ref({
      _style: 'min-width: 300px; width: 24rem;',
      _mask: '',
      _label: 'API Key',
      _hint: 'The API Key',
      _show_error: false,
      _error_msg: '',
      _rules: [val => val.length >= 1 || "Please add api key !"],
      _class: 'q-pt-md'
    })

    const val_binding_api_secret = ref({
      _style: ' min-width: 300px; width: 24rem;',
      _mask: '',
      _label: 'API Secret',
      _hint: 'The API Secret',
      _show_error: false,
      _error_msg: '',
      _rules: [val => val.length >= 1 || "Please add api secret!"],
      _class: 'q-pt-sm'
    })
    

    watchEffect(() => {
      if(api_name.value.length >= 4 && api_key.value && api_secret.value) {
        updated_date.value = new Date().toLocaleString('en-GB'); // update date here
        disable_add_button.value = false

        random_val_as_id.value = window.crypto.randomUUID()
        val_binding_data_to_save.value = {
          'key1': `api_data_api_name_plain_pretext_${random_val_as_id.value}`,
          'value1': api_name,
          'key2': `api_data_api_key_pretext_${random_val_as_id.value}`,
          'value2': api_key,
          'key3': `api_data_api_secret_pretext_${random_val_as_id.value}`,
          'value3': api_secret,
          'key4': `api_data_exchange_name_plain_pretext_${random_val_as_id.value}`,
          'value4': exchange_name,
          'key5': `api_data_date_plain_pretext_${random_val_as_id.value}`,
          'value5': updated_date,
          'key6': `api_data_url_plain_pretext_${random_val_as_id.value}`,
          'value6': exchange_name.value.value,
          'disable_btn': disable_add_button
        }
      } else {
        disable_add_button.value = true
      }
    })


    return {
      felAddNewApiDialog,
      exchange_name,
      random_val_as_id,
      api_name,
      api_key,
      api_secret,
      updated_date,
      val_binding_data_to_save,
      disable_add_button,
      val_binding_exchanges_dropdown,
      val_binding_api_name,
      val_binding_api_key,
      val_binding_api_secret
    }
  },
  methods: {
    dataSaved() {
      // console.log('data saved ran')
      this.api_name = ''
      this.api_key = ''
      this.api_secret = ''
      this.api_name = ''
      // keep recently selected exchange until setup run again
      this.felAddNewApiDialog = false

      this.$emit('reloadApiManagement')
    },
    update_date_now() {
      this.updated_date = new Date().toLocaleString('en-GB'); // update date here
    }
  }
}
</script>
