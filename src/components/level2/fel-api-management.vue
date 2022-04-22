<template>
<div>
  <q-btn icon='key' flat dense @click="felApiManagementDialog = true">
    <q-tooltip>
      API(s) Management
    </q-tooltip>
  </q-btn>
  <q-dialog v-model="felApiManagementDialog" persistent>
      <q-card class="card-in-level-2-dialog" style="min-width: 300px;">
        <q-bar>
          <felAddNewApi @reloadApiManagement="updateData"/>
          <!-- <q-btn name="folder_delete" dense flat>
            <q-tooltip>
              Delete All API(s) (Irreversible Operation)
            </q-tooltip>
          </q-btn> -->

          <q-space/>
          <q-btn icon="close" flat dense v-close-popup/>
            
        </q-bar>
        <q-card-section>
            <felListItem v-bind="val_list_data_binding" @commandToUpdate="updateData"/>
        </q-card-section>
      </q-card>
    </q-dialog>


</div>
  
</template>

<script>
import { useQuasar } from "quasar"
import felAddNewApi from 'components/level3/fel-add-new-api.vue';
import felListItem from 'components/level4/fel-list-item.vue'
import { ref } from "vue";
export default {
  name: 'felApiManagement',
  components: {
    felAddNewApi,
    felListItem
  },
  setup () {
    const felApiManagementDialog = ref(false)
    const qs = useQuasar()

    return {
      qs,
      felApiManagementDialog,
      get_saved_api_data() {
        let all_keys = qs.localStorage.getAllKeys()
        let api_name_keys = []
        for (let i = 0; i < all_keys.length; i++) {
          if(all_keys[i].includes('api_data_api_name_plain_pretext_')) {
            let uniq_id = all_keys[i].replace('api_data_api_name_plain_pretext_', '')
            api_name_keys.push({
              api_name: qs.localStorage.getItem(all_keys[i]),
              api_update_date: qs.localStorage.getItem('api_data_date_plain_pretext_' + uniq_id),
              api_exchange_name: qs.localStorage.getItem('api_data_exchange_name_plain_pretext_' + uniq_id),
              api_unique_id: uniq_id
            })
          }
        }

        return api_name_keys.sort(function(a,b){
          return a.api_update_date.localeCompare(b.api_update_date);
        }).reverse();
      }
    }
  },
  data () {
    return {
      val_list_data_binding: {saved_data: this.get_saved_api_data(), show_delete: true}
    }
  },
  methods: {
    updateData() {
      this.val_list_data_binding = {saved_data: this.get_saved_api_data(), show_delete: true}
    }
  }
}
</script>
