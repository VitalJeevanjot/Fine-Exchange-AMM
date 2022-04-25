<template>
  <div>
    <q-btn-toggle
      :model-value="_selected_value"
      @update:modelValue="updateValue"
      class="q-pb-md"
      no-caps
      rounded
      unelevated
      color="white"
      text-color="primary"
      toggle-color="grey-6"
      toggle-text-color="grey-1"
      :options="[
        {label: 'Option 1', value: 'one', class: 'bg-red-8 text-grey-1'},
        {label: 'Option 2', value: 'two', class: 'bg-blue-8 text-grey-1'}
      ]"
    />
</div>
</template>

<script>
import { watchEffect } from '@vue/runtime-core'
export default {
  name: 'felButtonToggle',
  props: ['_selected_value', '_option1', '_option2'],
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
