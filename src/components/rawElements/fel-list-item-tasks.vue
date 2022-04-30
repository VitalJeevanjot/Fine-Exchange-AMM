<template>
  <q-scroll-area
    style="height: 90vh; min-height: 400px; max-width: 100vw;"
    > 
    <q-list bordered>
      <q-item-label header>Tasks ({{saved_data.length}})</q-item-label>
      <q-item clickable style="border-radius: 10px; margin-right: 1rem;" v-for="(data, index) in saved_data" :key="index">
        <q-item-section top>
          <q-item-label style="
              width: 15rem;
              white-space: nowrap; 
              overflow: hidden;
              text-overflow: ellipsis;">
            <span class="text-h6">
              <span class="text-grey-7">Pair: </span>{{data.pair_selected.label}}
            </span>
          </q-item-label>
          <q-item-label>
            <span class="text-grey-9 text-subtitle1"> <span class="text-grey-7">Type: </span>{{data.selected_type}}</span>
          </q-item-label>
          <q-item-label>
            <span class="text-grey-8 text-subtitle1"><span class="text-grey-7">Interval (in Seconds): </span>{{data.seconds_interval}}</span>
          </q-item-label>
          <q-item-label>
            <span class="text-grey-8 text-subtitle2"><span class="text-grey-7">Spread: </span>{{data.spread_percent}}</span>
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
