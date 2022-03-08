<template>
  <q-header style="background-color: #071013" class="q-pa-xs">
      <q-toolbar>

        <q-avatar rounded style="width: 89px; height: 45px;" class="q-ml-md">
          <img :src="logo_src" alt="Fine Exchange Small Logo">
        </q-avatar>

        <q-space />

        <felAppPinManager />
        <felCreateTaskModal />
        <felSettingsModal />
        <felUserModal />
        <felHelpModal />


      </q-toolbar>

    </q-header>


</template>

<script>
import { defineComponent, ref } from "vue";

import felHelpModal from "components/level1/fel-help-modal.vue"
import felSettingsModal from "components/level1/fel-settings-modal.vue"
import felUserModal from "components/level1/fel-user-modal.vue"
import felCreateTaskModal from "components/level1/fel-create-task-modal.vue"
import felAppPinManager from "components/level1/fel-app-pin-manager.vue"



export default defineComponent ({
  name: 'felHeader',
  components: {
    felHelpModal,
    felSettingsModal,
    felUserModal,
    felCreateTaskModal,
    felAppPinManager
  },
  props: {
    logo_src: {
      type: String,
      required: true,
    }
  },
  setup () {
    return {
    
    }
  },
  mounted() {
    
    // console.log(window.crypto.randomUUID())
    // const id = window.crypto.randomBytes(16).toString("hex"); 
    // console.log(id);
  }
})
</script>
