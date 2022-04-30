<template>
  <q-scroll-area
    style="height: 95vh; min-height: 400px; max-width: 100vw;"
    > 
    <q-list>
      <q-item-label header>Tasks ({{saved_data.length}})</q-item-label>
      <q-item clickable style="border-radius: 10px; margin-right: 1rem;" v-for="(data, index) in saved_data" :key="index">
        <q-item-section top>
          <q-item-label style="
              width: 15rem;
              white-space: nowrap; 
              overflow: hidden;
              text-overflow: ellipsis;">
            <span class="text-weight-medium">
              {{data.pair_selected}}
            </span>
          </q-item-label>
          <q-item-label>
            <span class="text-grey-9 text-caption">{{data.selected_type}}</span>
          </q-item-label>
          <q-item-label caption>
            <span class="text-grey-6">{{data.seconds_interval}}</span>
          </q-item-label>
          <q-item-label caption>
            <span class="text-grey-6">{{data.spread_percent}}</span>
          </q-item-label>
        </q-item-section>
        <q-item-section top side v-show="show_delete">
          <div v-show="data.status == 'running'">
            <q-btn icon="las la-stop-circle" rounded dense style="color: #58B39A"/>
          </div>

          <div v-show="data.status == 'stopped'">
            <q-btn icon="las la-stop-circle" rounded dense style="color: #d13030"/>
          </div>
          <felDeleteTaskAskPin v-bind="val_binding = {unique_id: data.unique_id}" @afterTaskDeletion="$emit('commandToUpdate')"/>
        </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
</template>

<script>
import { useQuasar } from "quasar"
import { ref } from "vue"

import felDeleteTaskAskPin from 'src/components/pinManagers/fel-delete-task-ask-pin.vue'

export default {
  name: 'felListItem',
  components: {felDeleteTaskAskPin},
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
