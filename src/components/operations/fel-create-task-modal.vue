<template>
  <div v-show="show_in_header">
    <q-btn flat round dense icon="add_circle" class="q-mr-sm" @click="create_new_task" />
  </div>

  <div class="row justify-center" v-show="show_in_body">
    <q-btn class="text-grey-6" round flat icon="add_circle" size="xl" @click="create_new_task"/>
  </div>

  <div>
    <q-dialog v-model="felCreateNewTaskDialog" persistent>
      <q-card class="card-in-level-1-dialog" style="min-width: 300px">
          <q-bar class="bg-grey-10 text-grey-1">
            <div>Create New Task</div> 
            <q-space/> 
            <q-btn icon='close' round flat dense v-close-popup/>
            <q-btn icon='help' label="help" rounded flat dense v-close-popup/>
          </q-bar>
        <q-card-section>
          <!-- Add toggle for buy/sell -->
          <felButtonToggle
            v-model:_selected_value="selected_value"
            v-bind="val_binding_toggle_buy_sell"
          />

          <!-- Select API -->
          <felDropdown 
            v-model:model="api_selected"
            v-bind="val_binding_apis_dropdown"
          />

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
          <!-- Add spread or if use custom basic equation (With e(price) e_low e_high etc parameters provided for basic arithmetic form fine exchnage) -->
          <felInput
            v-model:_input_val="spread_percent"
            v-bind="val_binding_spread_percent"
          />
          <!-- use create task ask pin component for below button -->
          <felCreateTaskAskPin v-bind="val_binding_data_to_save"/>
          <!-- <q-btn label="create task" rounded class="q-mt-md my-green text-white"/> -->
        </q-card-section>
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
export default {
  name: 'felCreateTaskModal',
  props: ['show_in_body', 'show_in_header'],
  components: {
    felDropdown,
    felInput,
    felButtonToggle,
    felCreateTaskAskPin
  },
  setup () {
    const qs = useQuasar()
    const felCreateNewTaskDialog = ref(false)
    const api_selected = ref('')
    const pair_selected = ref('')
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
    const spread_percent = ref('')

    const disable_add_button = ref(true)

    const show_dropdown_select_pair = ref(false)

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
      _style: 'max-width: 500px; min-width: 300px; width: 30vw;',
      _mask: '',
      _type: 'number',
      _label: 'Interval (in seconds)',
      _hint: 'Enter seconds to wait before next call.',
      _show_error: false,
      _error_msg: '',
      _rules: [val => val >= 1 && val < 1000000000 || "Please add between 1 (inc.) to 1000000000 (seconds)!"],
      _class: 'q-pt-sm'
    })

    const val_binding_spread_percent = ref({
      _style: 'max-width: 500px; min-width: 300px; width: 30vw; padding-top: 15px',
      _mask: '',
      _type: 'number',
      _label: 'Spread (in Percent)',
      _hint: 'Enter spread from sell or buy price.',
      _show_error: false,
      _error_msg: '',
      _rules: [val => val >= 1 && val <= 10 || "Please add between 1 to 10 (both inc.) (percent)!"],
      _class: 'q-pt-sm'
    })

    const val_binding_data_to_save = ref({'disable_btn': disable_add_button})

    watchEffect(() => {
      if(api_selected.value.label) {
        show_dropdown_select_pair.value = true
        if(seconds_interval.value >= 1 
        && seconds_interval.value < 1000000000 
        && spread_percent.value >= 1 
        && spread_percent.value <= 10 
        && qs.localStorage.getItem('available_pairs').find(o => o.label === pair_selected.value.label) != undefined
        && pair_selected.value.label) {
          val_binding_data_to_save.value = {
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
      spread_percent,
      show_dropdown_select_pair,
      val_binding_toggle_buy_sell,
      val_binding_apis_dropdown,
      val_binding_pairs_dropdown,
      val_binding_seconds_interval,
      val_binding_spread_percent,
      val_binding_data_to_save,
      create_new_task () {
        felCreateNewTaskDialog.value = true
        // var int = 0
        // console.log(int++)
        // var new_int = setInterval(() => {
        //   console.log(int++)
        // }, 10000)
      },
    }
  }
}
</script>
