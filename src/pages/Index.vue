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
import { useQuasar } from "quasar"
import felHeader from "components/fel-header.vue"
import felCreateTaskModal from "components/operations/fel-create-task-modal.vue"
import felListItem from 'components/rawElements/fel-list-item-tasks.vue'
import {getAPIs} from 'components/helpers'

export default defineComponent({
  name: "PageIndex",
  components: {
    felHeader,
    felCreateTaskModal,
    felListItem
  },
  setup () {
    const show_no_tasks_content = ref(true)
    const value_bind = ref({ logo_src: "fine_exchange_smaller.png" })
    const val_bind_create_task = ref({show_in_body: true})
    const qs = useQuasar()

    return {
      qs,
      value_bind,
      show_no_tasks_content,
      val_bind_create_task,

      get_tasks_data() {
        let all_keys = qs.localStorage.getAllKeys()
        let tasks_keys = []

        for (let index = 0; index < all_keys.length; index++) {
          if(all_keys[index].includes('task_data_type_plain_pretext_')) {
            let uniq_id = all_keys[index].replace('task_data_type_plain_pretext_', '')
            tasks_keys.push({
              pair: qs.localStorage.getItem('task_data_pair_plain_pretext_' + uniq_id),
              api: qs.localStorage.getItem('task_data_api_plain_pretext_' + uniq_id),
              type: qs.localStorage.getItem('task_data_type_plain_pretext_' + uniq_id),
              amount: qs.localStorage.getItem('task_data_amount_plain_pretext_' + uniq_id),
              interval: qs.localStorage.getItem('task_data_interval_plain_pretext_' + uniq_id),
              spread: qs.localStorage.getItem('task_data_spread_percent_plain_pretext_' + uniq_id),
              status: qs.localStorage.getItem('task_data_state_plain_pretext_' + uniq_id),
              date: qs.localStorage.getItem('task_data_date_plain_pretext_' + uniq_id),
              // "task id": qs.localStorage.getItem('task_data_id_plain_pretext_' + uniq_id),
              "unique id": uniq_id
            })
          }
        }
        if(tasks_keys.length > 0) {
          show_no_tasks_content.value = false
        }

        return tasks_keys.sort(function(a,b){
          return a.date.localeCompare(b.date);
        }).reverse();

      }
    }
  },
  data () {
    return {
      val_bind_list_data: {saved_data: this.get_tasks_data(), show_delete: true}
    }
  },
  methods: {
    updateData() {
      this.val_bind_list_data = {saved_data: this.get_tasks_data(), show_delete: true}
    }
  },
  mounted() {
    // console.log(getAPIs(this.qs))
  }
});
</script>
