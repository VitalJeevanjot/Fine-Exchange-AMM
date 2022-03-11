<template>
<div>
  <q-btn icon='key' flat dense @click="felApiManagementDialog = true">
    <q-tooltip>
      API(s) Management
    </q-tooltip>
  </q-btn>
  <q-dialog v-model="felApiManagementDialog" persistent>
      <q-card class="card-in-level-2-dialog">
        <q-bar>
          <felAddNewApi/>
          <!-- <q-btn name="folder_delete" dense flat>
            <q-tooltip>
              Delete All API(s) (Irreversible Operation)
            </q-tooltip>
          </q-btn> -->

          <q-space/>
          <q-btn icon="close" flat dense v-close-popup/>
            
        </q-bar>
        <q-card-section>
          <div class="row justify-center">
            Hello
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>


</div>
  
</template>

<script>
import felAddNewApi from 'components/level3/fel-add-new-api.vue';
import { ref } from "vue";
export default {
  name: 'felApiManagement',
  components: {
    felAddNewApi
  },
  setup () {
    const felApiManagementDialog = ref(false)
    return {
      felApiManagementDialog
    }
  }
}
</script>
