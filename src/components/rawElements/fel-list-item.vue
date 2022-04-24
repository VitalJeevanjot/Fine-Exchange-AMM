<template>
  <q-scroll-area
    style="height: 70vh; min-height: 400px; max-width: 100vw;"
    > 
    <q-list>
      <q-item-label header>Saved API Credentials ({{saved_data.length}})</q-item-label>
      <q-item clickable style="border-radius: 10px; margin-right: 1rem;" v-for="(data, index) in saved_data" :key="index">
        <q-item-section top>
          <q-item-label style="
              width: 15rem;
              white-space: nowrap; 
              overflow: hidden;
              text-overflow: ellipsis;">
            <span class="text-weight-medium">
              {{data.api_name}}
            </span>
          </q-item-label>
          <q-item-label>
            <span class="text-grey-9 text-caption">{{data.api_exchange_name.label}}</span>
          </q-item-label>
          <q-item-label caption>
            <span class="text-grey-6">{{data.api_update_date}}</span>
          </q-item-label>
        </q-item-section>
        <q-tem-section top side v-show="show_delete">
          <felApiDeleteDataAskPin v-bind="val_binding = {unique_id: data.api_unique_id}" @afterAPIDeletion="$emit('commandToUpdate')"/>
        </q-tem-section>
      </q-item>
    </q-list>
  </q-scroll-area>
</template>

<script>
import { useQuasar } from "quasar"
import { ref } from "vue"

import felApiDeleteDataAskPin from 'src/components/pinManagers/fel-api-delete-data-ask-pin.vue'

export default {
  name: 'felListItem',
  components: {felApiDeleteDataAskPin},
  props: ['saved_data', 'show_delete'],
  setup () {
    const val_binding = {unique_id: 'hello'}
    return {
      val_binding
    }
  },
  methods: {
  }
}
</script>
