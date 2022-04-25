<template>
  <div>
    <q-btn-toggle
      :model-value="_selected_value"
      @update:modelValue="updateValue"
      class="q-pb-md"
      no-caps
      rounded
      unelevated
      color="grey-6"
      text-color="grey-1"
      toggle-color="teal-9"
      toggle-text-color="grey-1"
      :options="[
        {label: 'Buy', value: 'one', color:'cyan-8'},
        {label: 'Sell', value: 'two', color:'purple-8'}
      ]"
    />
    <q-chip size="xs" style="pointer-events: none; user-select: none;" class="text-caption text-cyan-9">{{_selected_value == 'one' ? 'Buy' : 'Sell'}}</q-chip>
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
