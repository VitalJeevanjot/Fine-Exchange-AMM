<template>
  <div> 
    <q-select 
    standout="bg-grey-10 text-grey-1" 
    :model-value="model" 
    @update:modelValue="$emit('update:model', $event)"
    class="q-pb-sm"
    style="min-width: 300px"
    rounded
    :options="options" 
    label="Select Exchange" />
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'felDropdownExchanges',
  props: ['model'],
  emits: ['update:model'],
  setup () {
    return {
      options: [
        'Fine Exchanges Mainnet', 'Fine Exchanges Testnet'
      ]
      // options: [
      //   {
      //     value: 'https://base/v2',
      //     label: 'Fine Exchanges Mainnet'
      //   },
      //   {
      //     value: 'https://base/v2',
      //     label: 'Fine Exchanges Testnet'
      //   }
      // ]
    }
  }
}
</script>
