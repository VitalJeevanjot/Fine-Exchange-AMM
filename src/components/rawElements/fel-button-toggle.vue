<template>
  <div>
    <q-btn-toggle
      :model-value="_selected_value"
      @update:modelValue="updateValue"
      class="q-pb-md"
      no-caps
      rounded
      unelevated
      text-color="grey-1"
      :toggle-color=_toggle_btn_color
      toggle-text-color="grey-1"
      :options="[
        {label: _label_1, value: _value_1, color: _btn_color1},
        {label: _label_2, value: _value_2, color: _btn_color2}
      ]"
    />
    <q-chip size="xs" style="pointer-events: none; user-select: none;" class="text-caption" :text-color="_toggle_btn_color">{{_selected_value == _value_1 ? _label_1 : _label_2}}</q-chip>
</div>
</template>

<script>
import { watchEffect } from '@vue/runtime-core'
export default {
  name: 'felButtonToggle',
  props: ['_selected_value', 
  '_toggle_btn_color',
  '_btn_color1', 
  '_btn_color2', 
  '_value_1',
  '_value_2',
  '_label_1',
  '_label_2'],
  setup () {
    return {}
  },
  methods: {
    updateValue(event) {
      this.$emit('update:_selected_value', event)
      console.log(event)
    }
  }
}
</script>
