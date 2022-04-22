<template>
  <div>
    <q-list class="rounded-borders" style="max-width: 600px">
      <q-item-label header>Saved API Credentials</q-item-label>
      <q-item clickable style="border-radius: 20px" v-for="(data, index) in saved_data" :key="index">
        <q-item-section top>
          <q-item-label lines="1">
            <span class="text-weight-medium">{{data.api_name}}</span>
          </q-item-label>
          <q-item-label caption lines="1">
            <span class="text-grey-8">{{data.api_update_date}}</span>
          </q-item-label>
        </q-item-section>
        <q-tem-section top side v-show="show_delete">
          <felAppDeleteDataAskPin v-bind="val_binding = {unique_id: data.api_unique_id}" @afterAPIDeletion="$emit('commandToUpdate')"/>
        </q-tem-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { useQuasar } from "quasar"
import { ref } from "vue"

import felAppDeleteDataAskPin from 'components/level3/fel-app-delete-data-ask-pin.vue'

export default {
  name: 'felListItem',
  components: {felAppDeleteDataAskPin},
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
