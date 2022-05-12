<template>
  <div v-show="show_in_header">
    <q-btn flat round dense icon="add_circle" class="q-mr-sm" @click="create_new_task" />
  </div>

  <div class="row justify-center" v-show="show_in_body">
    <q-btn class="text-grey-6" round flat icon="add_circle" size="xl" @click="create_new_task"/>
  </div>

  <div>
    <q-dialog v-model="felCreateNewTaskDialog" persistent>
      <q-card class="card-in-level-1-dialog" style="min-width: 300px;">
          <q-bar class="bg-grey-10 text-grey-1">
            <div>Create New Task</div> 
            <q-space/> 
            <q-btn icon='close' round flat dense v-close-popup/>
            <q-btn icon='help' label="help" rounded flat dense v-close-popup/>
          </q-bar>
          <q-scroll-area
        style="height: 80vh; min-height: 200px; min-width: 26rem;"
      > 
        <q-card-section>
          
          <!-- Add toggle for buy/sell -->
          <felButtonToggle
            v-model:_selected_value="selected_value"
            v-bind="val_binding_toggle_buy_sell"
          />

          <!-- Select API -->
          <div class="row">
            <felDropdown 
              v-model:model="api_selected"
              v-bind="val_binding_apis_dropdown"
            />
            <felApiManagement style="margin-left: 3px; margin-top: 1.1vh;"/>
          </div>

          <!-- select pair :: show balance (after selecting api) --> 
          <felDropdown 
            v-show="show_dropdown_select_pair"
            v-model:model="pair_selected"
            v-bind="val_binding_pairs_dropdown"
          />
          <!-- Add timer interval (select range then provide min-max (excluded/included check)) -->
            <felInput
              v-model:_input_val="seconds_interval"
              v-bind="val_binding_seconds_interval"
            />
            <felInput
              v-model:_input_val="amount"
              v-bind="val_binding_amount"
            />
          <!-- Add spread or if use custom basic equation (With e(price) e_low e_high etc parameters provided for basic arithmetic form fine exchnage) -->
          <felInput
            v-model:_input_val="spread_percent"
            v-bind="val_binding_spread_percent"
          />
          <!-- use create task ask pin component for below button -->
          <felCreateTaskAskPin v-bind="val_binding_data_to_save" @savedCreatedTask="task_created" @beforeSavingData="update_date_now"/>
          <!-- <q-btn label="create task" rounded class="q-mt-md my-green text-white"/> -->
        </q-card-section>
      </q-scroll-area>
      </q-card>

    </q-dialog>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import { useQuasar } from "quasar"
import felDropdown from 'components/rawElements/fel-dropdown.vue'
import felInput from 'components/rawElements/fel-input.vue'
import felButtonToggle from 'components/rawElements/fel-button-toggle.vue'
import felCreateTaskAskPin from 'components/pinManagers/fel-create-task-ask-pin.vue'
import felApiManagement from 'components/operations/fel-api-management.vue';
export default {
  name: 'felCreateTaskModal',
  props: ['show_in_body', 'show_in_header'],
  emits: ['commandToUpdate'],
  components: {
    felDropdown,
    felInput,
    felButtonToggle,
    felCreateTaskAskPin,
    felApiManagement
  },
  setup () {
    const qs = useQuasar()
    const felCreateNewTaskDialog = ref(false)
    const api_selected = ref('')
    const pair_selected = ref('')
    const updated_date = ref('')
    const val_binding_apis_dropdown = ref({
      options: 'APIs',
      category: 'Select API'
    })

    const val_binding_pairs_dropdown = ref({
      options: 'Pairs',
      category: 'Select Pair'
    })

    const selected_value = ref('buy')

    const seconds_interval = ref('')
    const amount = ref('')
    const spread_percent = ref('')

    const disable_add_button = ref(true)

    const show_dropdown_select_pair = ref(false)

    const random_val_as_id = ref(null)

    const val_binding_toggle_buy_sell = ref({
      _toggle_btn_color: 'cyan-9',
      _btn_color1: 'cyan-7',
      _btn_color2: 'cyan-7',
      _value_1: 'buy',
      _value_2: 'sell',
      _label_1: 'Buy',
      _label_2: 'Sell'
    })

    const val_binding_seconds_interval = ref({
      _style: 'max-width: 500px; min-width: 350px; width: 30vw;',
      _mask: '',
      _type: 'number',
      _label: 'Interval (seconds)',
      _hint: 'Enter seconds to wait before next call.',
      _show_error: false,
      _error_msg: '',
      _rules: [val => val >= 400 && val <= 10000 || "Please add between 400 to 10000 (seconds)!"],
      _class: 'q-pt-sm'
    })

    const val_binding_amount = ref({
      _style: 'max-width: 500px; min-width: 350px; width: 30vw;',
      _mask: '',
      _type: 'number',
      _label: 'Amount (per cent)',
      _hint: 'Enter how much amount you like to use.',
      _show_error: false,
      _error_msg: '',
      _rules: [val => val >= 0.001 && val <= 100 || "Please add between 0.001 to 100 (per cent)!"],
      _class: 'q-mt-sm'
    })

    const val_binding_spread_percent = ref({
      _style: 'max-width: 500px; min-width: 350px; width: 30vw;',
      _mask: '',
      _type: 'number',
      _label: 'Spread (per cent)',
      _hint: 'Enter spread from sell or buy price.',
      _show_error: false,
      _error_msg: '',
      _rules: [val => val >= 0.01 && val <= 2 || "Please add between 0.01 to 2 (percent)!"],
      _class: 'q-mt-sm'
    })

    const val_binding_data_to_save = ref({'disable_btn': disable_add_button})

    watchEffect(() => {
      // console.log(api_selected.value)
      if(api_selected.value.label) {
        show_dropdown_select_pair.value = true
        if(seconds_interval.value >= 400 
        && seconds_interval.value <= 10000 
        && spread_percent.value >= 0.01 
        && spread_percent.value <= 2 
        && amount.value >= 0.001 
        && amount.value <= 100
        && qs.localStorage.getItem('available_pairs').find(o => o.label === pair_selected.value.label) != undefined
        && pair_selected.value.label) {
          random_val_as_id.value = window.crypto.randomUUID()
          updated_date.value = new Date().toLocaleString('en-GB'); // update date here
          val_binding_data_to_save.value = {
            'key1': `task_data_type_plain_pretext_${random_val_as_id.value}`, //buy or sell
            'value1': selected_value, //buy or sell
            'key2': `task_data_api_plain_pretext_${random_val_as_id.value}`,
            'value2': api_selected,
            'key3': `task_data_pair_plain_pretext_${random_val_as_id.value}`,
            'value3': pair_selected,
            'key4': `task_data_interval_plain_pretext_${random_val_as_id.value}`,
            'value4': seconds_interval,
            'key5': `task_data_spread_percent_plain_pretext_${random_val_as_id.value}`,
            'value5': spread_percent,
            'key6': `task_data_state_plain_pretext_${random_val_as_id.value}`,
            'value6': 'stopped',
            'key7': `task_data_date_plain_pretext_${random_val_as_id.value}`,
            'value7': updated_date,
            'key8': `task_data_amount_plain_pretext_${random_val_as_id.value}`,
            'value8': amount,
            'key9': `task_data_id_plain_pretext_${random_val_as_id.value}`,
            'value9': '0',
            'disable_btn': false
          }
        } else {
          val_binding_data_to_save.value = {
            'disable_btn': true
          }
        }
      } else { // this else here make sure even if some ciritical case the API selection resets then the button gets disable
        val_binding_data_to_save.value = {
          'disable_btn': true
        }
      }
    })

    return {
      qs,
      felCreateNewTaskDialog,
      selected_value,
      api_selected,
      pair_selected,
      disable_add_button,
      seconds_interval,
      amount,
      spread_percent,
      show_dropdown_select_pair,
      random_val_as_id,
      updated_date,
      val_binding_toggle_buy_sell,
      val_binding_apis_dropdown,
      val_binding_pairs_dropdown,
      val_binding_seconds_interval,
      val_binding_spread_percent,
      val_binding_data_to_save,
      val_binding_amount,
      create_new_task () {

        felCreateNewTaskDialog.value = true
      }
    }
  },
  methods: {
    update_date_now() {
      this.updated_date = new Date().toLocaleString('en-GB');
    },
    task_created() {
      this.$emit('commandToUpdate')
      this.felCreateNewTaskDialog = false
      this.seconds_interval = ''
      this.spread_percent = ''
    }
  }
}
</script>
