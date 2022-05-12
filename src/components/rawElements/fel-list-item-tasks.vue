<template>
  <div class="row justify-center">
    <q-table
      :title="'All Tasks' + ' (' + saved_data.length + ')'"
      dark
      class="q-mr-sm q-mt-sm q-mb-sm"
      style="width: 98vw; height: 87vh;"
      virtual-scroll
      :rows-per-page-options="[0]"
      :rows="getData()"
    >
      <template v-slot:body-cell="props">
        <q-td :props="props" 
        :class="(props.row.status == 'running') ? 'bg-green-9' : 
        (props.row.status == 'stopped') ? 'bg-red-9' : 'bg-grey-3'">
          {{props.value}}
          <!-- <div v-if="props.row.status == 'running'">
            <q-badge color="green-9" :label="props.value" />
          </div>
          <div v-if="props.row.status == 'stopped'">
            <q-badge color="red-9" :label="props.value" />
          </div> -->
        </q-td>
      </template>
      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <div>
            <q-btn @click="copyText(props.value)" size="sm" :color="(props.row.status == 'running') ? 'green-9' : 
        (props.row.status == 'stopped') ? 'red-9' : 'grey-3'"
         icon="las la-clipboard" :label="props.value"/>
          </div>
        </q-td>
      </template>
      <template v-slot:bottom>
        <!-- <div v-show="data.status == 'running'">
          <q-btn icon="las la-stop-circle" class="q-ma-xs" rounded dense style="color: #58B39A"/>
        </div>

        <div v-show="data.status == 'stopped'">
          <q-btn icon="las la-stop-circle" class="q-ma-xs" rounded dense style="color: #d13030"/>
        </div> -->
        <div v-show="show_delete">
          <felDeleteTaskAskPin v-bind="val_binding = {unique_id: '0'}" @afterTaskDeletion="$emit('commandToUpdate')"/>
        </div>
      </template>
    </q-table>
    
  </div>

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
</template>

<style scoped>
.table {
  background-color: #CFCFCF;
}
</style>

<script>
import { useQuasar } from "quasar"
import { ref } from "vue"
import { copyToClipboard } from 'quasar'

import felDeleteTaskAskPin from 'src/components/pinManagers/fel-delete-task-ask-pin.vue'

export default {
  name: 'felListItem',
  components: {felDeleteTaskAskPin},
  props: ['saved_data', 'show_delete'],
  setup () {
    const val_binding = {unique_id: 'hello'}
    const qs = useQuasar()
    return {
      val_binding,
      qs
    }
  },
  data() {
    return {

    }
  },
  methods: {
    getData() {
      var data = []
      for (let index = 0; index < this.saved_data.length; index++) {
        data.push(
          {
            pair: this.saved_data[index].pair.label,
            api: this.saved_data[index].api.label,
            type: this.saved_data[index].type,
            amount: this.saved_data[index].amount,
            interval: this.saved_data[index].interval,
            spread: this.saved_data[index].spread,
            status: this.saved_data[index].status,
            date: this.saved_data[index].date,
            id: this.saved_data[index]["unique id"],
          }
        );
        
      }
      return data
    },
    copyText(t) {
      copyToClipboard(t)
      .then(() => {
        // success!
        this.qs.notify({
          color: 'grey-8',
          message: 'Copied to clipboard',
          group: true,
          badgeColor: 'grey-10',
          position: 'top'
        })
      })
      .catch(() => {
        // fail
        // Error message patteren
        this.qs.notify({
          color: 'grey-2',
          textColor: 'grey-10',
          badgeColor: 'grey-2',
          badgeTextColor: 'grey-10',
          message: 'Error when Copying Id, Report to developers!',
          position: 'top'
        })
      })
    }
  },
  mounted() {
    console.log(this.getData())
    console.log(this.saved_data)
  }
}
</script>
