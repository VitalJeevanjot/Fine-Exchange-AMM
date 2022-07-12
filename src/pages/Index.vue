<template>
  <fel-header
      v-bind="value_bind"
      @commandToUpdate="updateData"
    />
  <q-page style="background-color: #CFCFCF">
    <!-- old background color #CFCFCF -->
    <div v-show="show_no_tasks_content">
      <div class="row justify-center q-pt-md">
        <p class="text-h4 text-grey-6" style="user-select: none;">No tasks Yet!</p>
      </div>

      <div class="row justify-center">
        <felCreateTaskModal v-bind="val_bind_create_task" @commandToUpdate="updateData"/>
      </div>
    </div>
    <div v-show="!show_no_tasks_content" style="width: 100vw;" class="q-pl-sm">
    <felListItem v-bind="val_bind_list_data" @commandToUpdate="updateData"/>
    </div>
  </q-page>
</template>




<script>
import { ref, defineComponent } from "vue";
import { QSpinnerCube, useQuasar } from "quasar"
import felHeader from "components/fel-header.vue"
import felCreateTaskModal from "components/operations/fel-create-task-modal.vue"
import felListItem from 'components/rawElements/fel-list-item-tasks.vue'
import {fetchTasks, getAPIs} from 'components/helpers'

export default defineComponent({
  name: "PageIndex",
  components: {
    felHeader,
    felCreateTaskModal,
    felListItem
  },
  setup () {
    const qs = useQuasar()
    const show_no_tasks_content = ref(false)
    const value_bind = ref({ logo_src: "fine_exchange_smaller.png" })
    const val_bind_create_task = ref({show_in_body: true})

    return {
      value_bind,
      qs,
      show_no_tasks_content,
      val_bind_create_task,
    }
  },
  data () {
    return {
      val_bind_list_data: {saved_data: [], show_delete: true}
    }
  },
  methods: {
    async get_tasks_data() {
      await fetchTasks(this.qs, QSpinnerCube, this.$axios)
      let all_keys = this.qs.localStorage.getAllKeys()
      let tasks_keys = []

      for (let index = 0; index < all_keys.length; index++) {
        if(all_keys[index].includes('task_data_type_plain_pretext_')) {
          let uniq_id = all_keys[index].replace('task_data_type_plain_pretext_', '')
          tasks_keys.push({
            pair: this.qs.localStorage.getItem('task_data_pair_plain_pretext_' + uniq_id),
            api: this.qs.localStorage.getItem('task_data_api_plain_pretext_' + uniq_id),
            type: this.qs.localStorage.getItem('task_data_type_plain_pretext_' + uniq_id),
            amount: this.qs.localStorage.getItem('task_data_amount_plain_pretext_' + uniq_id),
            interval: this.qs.localStorage.getItem('task_data_interval_plain_pretext_' + uniq_id).toString(),
            spread: this.qs.localStorage.getItem('task_data_spread_percentage_plain_pretext_' + uniq_id).toString(),
            status: this.qs.localStorage.getItem('task_data_state_plain_pretext_' + uniq_id),
            date: this.qs.localStorage.getItem('task_data_date_plain_pretext_' + uniq_id),
            // "task id": qs.localStorage.getItem('task_data_id_plain_pretext_' + uniq_id),
            "unique id": uniq_id
          })
        }
      }
      if(tasks_keys.length > 0) {
        this.show_no_tasks_content = false
      } else {
        this.show_no_tasks_content = true
      }

      return tasks_keys.sort(function(a,b){
        return a.date.localeCompare(b.date);
      }).reverse();

    },
    async updateData() {
      this.val_bind_list_data = {saved_data: await this.get_tasks_data(), show_delete: true}
    }
  },
  async mounted() {
    if(getAPIs(this.qs).length == 0) {
      this.show_no_tasks_content = true
      return
    }
    // ALready updaring data through API Management at start
    // await this.updateData()
  }
});
</script>
