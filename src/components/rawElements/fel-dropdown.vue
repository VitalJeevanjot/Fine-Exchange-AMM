<template>
  <div> 
    <q-select 
    standout="bg-grey-10 text-grey-1" 
    color="grey-6"
    @filter="filterFn"
    use-input
    @blur="model_value=model"
    @focus="model_value=model"
    :model-value="model_value" 
    @update:modelValue="updateValue"
    @input-value="input_value"
    class="q-pb-md"
    style="min-width: 20rem; 
      width: 20rem;"
    rounded
    :options="theseOptions" 
    :label="category">

    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <q-item-label 
          style="
            width: 50vw;
            max-width: 400px;
            white-space: nowrap; 
            overflow: hidden;
            text-overflow: ellipsis;"
          >{{ scope.opt.label }}</q-item-label>
          <q-item-label caption>{{ scope.opt.description }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>

    </q-select>
  </div>
</template>

<style>
.q-field__native > span {
  max-width: 400px;
  padding-left: 0.3rem;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
}

.q-field__native > input {
  position: absolute;
}
</style>


<script>

import { useQuasar } from "quasar"
import { ref, watchEffect } from '@vue/runtime-core'

import { getAPIs } from '../helpers'

export default {
  name: 'felDropdown',
  props: ['model', 'options', 'category'],
  emits: ['update:model'],
  setup () {
    const qs = useQuasar()
    const input_value = ref('')

    return {
      qs,
      input_value
    }
  },
  data() {
    return {
      theseOptions: this.getOptions(),
      model_value: this.model,
    }
  },
  methods: {
    updateValue (event) {
      this.$emit('update:model', event)
      this.model_value = event

      if(this.options == 'APIs') {
        // emit and catch in create task so pair selection can be reset
        this.qs.localStorage.set('api_selected_now', event)
        this.qs.localStorage.set('available_pairs', this.getPairs())
      }
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.theseOptions = this.getOptions()
          this.model_value = ''
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.theseOptions = this.getOptions().filter(v => v.label.toLowerCase().indexOf(needle) > -1)
        this.input_value = ''
      })
    },
    getOptions() {
      if(this.options == 'Exchanges') {
        return this.getExchanges()
      } else if(this.options == 'APIs') {
        return getAPIs(this.qs)
      } else if(this.options == 'Pairs') {
        return this.getPairs()
      }
    },
    getExchanges() {
      if(!getAPIs(this.qs).length) {
        return [
          // TODO: on official lounch, disable testnet and enable mainnet
          // {
          //   value: 'https://api.fine.exchange',
          //   label: 'Fine Exchange Mainnet',
          //   description: 'required first to sync tasks with cloud & unlock others',
          //   disable: true
          // },
          {
            value: 'https://apitest.fine.exchange',
            label: 'Fine Exchange Testnet'
          }
        ]
      } else {
        return [
          {
            value: 'https://api.fine.exchange',
            label: 'Fine Exchange Mainnet'
          },
          {
            value: 'https://apitest.fine.exchange',
            label: 'Fine Exchange Testnet'
          }
        ]
      }
    },
    getPairs() {
      var current_api = this.qs.localStorage.getItem('api_selected_now')
      if(current_api) {
        var get_exchanges = this.getExchanges()
  
        for (let index = 0; index < get_exchanges.length; index++) {
          if(get_exchanges[index].label == current_api.description) {
            // var exchange = new this.$ccxt.hollaex({urls: {api: {rest: get_exchanges[index].value}}})
            // console.log(await exchange.loadMarkets())
            return this.getPairForEachExchange(get_exchanges[index].label)
          }
        }
      }
      // var ccxt = new ccxt.hollaex({urls: {api: {rest: current_api.}}})
      // var fine_exchange_mainnet = []
    },
    getPairForEachExchange(label) {
      switch(label) {
        case 'Fine Exchange Mainnet':
          return [{label: 'BCH/USDT', value: 'BCH/USDT'}, 
          {label: 'BTC/USDT', value: 'BTC/USDT'}, 
          {label: 'ETH/BTC', value: 'ETH/BTC'}, 
          {label: 'ETH/USDT', value: 'ETH/USDT'}, 
          {label: 'XHT/USDT', value: 'XHT/USDT'}]
          break;
        case 'Fine Exchange Testnet':
          return [{label: 'ETH/BTC', value: 'ETH/BTC'}, 
          {label: 'XHT/USDT', value: 'XHT/USDT'}]
          break;
      }
    },

    printConsole(val) {
    }
  }
}
</script>
