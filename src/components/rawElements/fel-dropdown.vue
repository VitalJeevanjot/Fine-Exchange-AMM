<template>
  <div> 
    <q-select 
    standout="bg-grey-10 text-grey-1" 
    :model-value="model" 
    @update:modelValue="$emit('update:model', $event)"
    class="q-pb-sm"
    style="min-width: 300px"
    rounded
    :options="getOptions()" 
    label="Select Value" />
  </div>
</template>

<script>

import { useQuasar } from "quasar"

export default {
  name: 'felDropdown',
  props: ['model', 'options'],
  emits: ['update:model'],
  setup () {
    const qs = useQuasar()
    return {
      qs
    }
  },
  methods: {
    getOptions() {
      if(this.options == 'Exchanges') {
        return this.getExchanges()
      } else if(this.options == 'APIs') {
        return this.getAPIs()
      }
    },
    getExchanges() {
      return [
        {
          value: 'https://base1/v2',
          label: 'Fine Exchanges Mainnet'
        },
        {
          value: 'https://base/v2',
          label: 'Fine Exchanges Testnet'
        }
      ]
    },
    getAPIs() {
      var allAPIKeys = this.qs.localStorage.getAllKeys()

      return [
        {
          value: 'https://base1/v2',
          label: 'Fine Exchanges Mainnet'
        },
        {
          value: 'https://base/v2',
          label: 'Fine Exchanges Testnet'
        }
      ]
    }
  }
}
</script>
