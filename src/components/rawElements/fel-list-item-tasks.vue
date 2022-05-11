<template>
  <q-scroll-area
    style="height: 90vh; min-height: 400px;"
    > 
    <q-list class="q-pr-md">
      <q-item-label header>All Tasks ({{saved_data.length}})</q-item-label>
      <q-item class="q-mt-sm" clickable style="border-radius: 10px; background-color: #eaeaea" v-for="(data, index) in saved_data" :key="index">
        <q-item-section>
          <q-table
            style="width: 95vw"
            virtual-scroll
            :sortable="false"
            :rows-per-page-options="[0]"
            :rows="getData()"
          >
          <template v-slot:bottom>
            <div v-show="data.status == 'running'">
            <q-btn icon="las la-stop-circle" class="q-ma-xs" rounded dense style="color: #58B39A"/>
          </div>

          <div v-show="data.status == 'stopped'">
            <q-btn icon="las la-stop-circle" class="q-ma-xs" rounded dense style="color: #d13030"/>
          </div>
          <div v-show="show_delete">
          <felDeleteTaskAskPin v-bind="val_binding = {unique_id: data.unique_id}" @afterTaskDeletion="$emit('commandToUpdate')"/>
          </div>
      </template>
          </q-table>

          <!-- <q-item-label style="
              width: 15rem;
              white-space: nowrap; 
              overflow: hidden;
              text-overflow: ellipsis;">
            <span class="text-h6">
              <span class="text-grey-7">Pair: </span>{{data.pair_selected.label}}
            </span>
          </q-item-label> -->
          <!-- <q-item-label>
            <span class="text-grey-9 text-subtitle1"> <span class="text-grey-7">Type: </span>{{data.selected_type}}</span>
          </q-item-label>
          <q-item-label>
            <span class="text-grey-9 text-subtitle1">  <span class="text-grey-7">API:</span> {{data.api_selected.label}}</span>
          </q-item-label>
          <q-item-label>
            <span class="text-grey-8 text-subtitle1"><span class="text-grey-7">Interval: </span>{{data.seconds_interval}}<span class="text-caption">s</span></span>
          </q-item-label>
          <q-item-label>
            <span class="text-grey-8 text-subtitle2"><span class="text-grey-7">Spread: </span>{{data.spread_percent}}%</span>
          </q-item-label> -->
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
  data() {
    return {
      data: {
        pair: this.saved_data[0].pair_selected.label,
        api: this.saved_data[0].api_selected.label,
        type: this.saved_data[0].selected_type,
        amount: this.saved_data[0].amount,
        interval: this.saved_data[0].seconds_interval,
        status: this.saved_data[0].status,
        date: this.saved_data[0].updated_date,
        id: this.saved_data[0].unique_id
      }
    }
  },
  methods: {
    getData() {
      return [Object.assign({}, this.data)]
    }
  },
  mounted() {
    console.log(this.getData())
  }
}
</script>
