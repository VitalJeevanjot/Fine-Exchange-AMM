<template>
  <div> 
    <q-select 
    standout="bg-grey-10 text-grey-1" 
    @filter="filterFn"
    use-input
    :model-value="model_value" 
    @update:modelValue="updateValue"
    @input-value="model_value=''"
    class="q-pb-sm"
    style="min-width: 300px; 
      width: 30vw;
      max-width: 500px;"
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

export default {
  name: 'felDropdown',
  props: ['model', 'options', 'category'],
  emits: ['update:model'],
  setup () {
    const qs = useQuasar()
    return {
      qs,
    }
  },
  data() {
    return {
      theseOptions: this.getOptions(),
      model_value: this.model
    }
  },
  methods: {
    updateValue (event) {
      this.$emit('update:model', event)
      this.model_value = event
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.theseOptions = this.getOptions()
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.theseOptions = this.getOptions().filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
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
      var all_keys = this.qs.localStorage.getAllKeys()

      let api_name_keys = []
      for (let i = 0; i < all_keys.length; i++) {
        if(all_keys[i].includes('api_data_api_name_plain_pretext_')) {
          let uniq_id = all_keys[i].replace('api_data_api_name_plain_pretext_', '')
          api_name_keys.push({
            label: this.qs.localStorage.getItem(all_keys[i]),
            description: this.qs.localStorage.getItem('api_data_exchange_name_plain_pretext_' + uniq_id).label,
            api_key: this.qs.localStorage.getItem('api_data_api_key_pretext_' + uniq_id),
            api_secret: this.qs.localStorage.getItem('api_data_api_secret_pretext_' + uniq_id),
            api_update_date: this.qs.localStorage.getItem('api_data_date_plain_pretext_' + uniq_id)
          })
        }
      }

      return api_name_keys.sort(function(a,b){
          return a.api_update_date.localeCompare(b.api_update_date);
        }).reverse();
    },

    printConsole(val) {
    }
  }
}
</script>
