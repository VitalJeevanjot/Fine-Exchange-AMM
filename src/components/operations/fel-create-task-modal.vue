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
          </q-bar>
        <q-card-section>
          <!-- Add toggle for buy/sell -->
          <felButtonToggle
            v-model:_selected_value="selected_value"
            v-bind="val_binding_toggle_buy_sell"
          />
          <!-- select pair :: show balance (after selecting api) --> 

          <!-- Select API -->
          <felDropdown 
            v-model:model="api_selected"
            v-bind="val_binding_apis_dropdown"
          />
          <!-- Add timer interval (select range then provide min-max (excluded/included check)) -->
          <felInput
            v-model:_input_val="seconds_interval"
            v-bind="val_binding_seconds_interval"
          />
          <!-- Add spread or if use custom basic equation (With e(price) e_low e_high etc parameters provided for basic arithmetic form fine exchnage) -->

        </q-card-section>
      </q-card>

    </q-dialog>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import felDropdown from 'components/rawElements/fel-dropdown.vue'
import felInput from 'components/rawElements/fel-input.vue'
import felButtonToggle from 'components/rawElements/fel-button-toggle.vue'
export default {
  name: 'felCreateTaskModal',
  props: ['show_in_body', 'show_in_header'],
  components: {
    felDropdown,
    felInput,
    felButtonToggle
  },
  setup () {
    const felCreateNewTaskDialog = ref(false)
    const api_selected = ref('')
    const val_binding_apis_dropdown = ref({
      options: 'APIs',
      category: 'Select API'
    })

    const selected_value = ref('buy')

    const seconds_interval = ref(1)

    const val_binding_toggle_buy_sell = ref({
      _toggle_btn_color: 'teal-9',
      _btn_color1: 'teal-7',
      _btn_color2: 'teal-7',
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
      _hint: 'Enter name for Key/Secret',
      _show_error: false,
      _error_msg: '',
      _rules: [val => val.length >= 1 && val > 1 && val < 1000000000 || "Please add appropriate time in seconds!"],
      _class: 'q-pt-sm'
    })

    watchEffect(() => {
      console.log(api_selected.value.label)
    })


    return {
      felCreateNewTaskDialog,
      selected_value,
      val_binding_toggle_buy_sell,
      api_selected,
      val_binding_apis_dropdown,
      seconds_interval,
      val_binding_seconds_interval,
      create_new_task () {
        felCreateNewTaskDialog.value = true
        // var int = 0
        // console.log(int++)
        // var new_int = setInterval(() => {
        //   console.log(int++)
        // }, 10000)
      }
    }
  }
}
</script>
