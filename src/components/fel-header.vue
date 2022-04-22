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

<style lang="sass">
.card-in-level-1-dialog
  background-color: #f2f2f2
  border-radius: 40px !important

.card-in-level-2-dialog
  background-color: #ECECEC
  border-radius: 30px !important

.card-in-level-3-dialog
  background-color: #E0E0E0 
  border-radius: 40px !important
  min-width: 300px

.btn-disabled
  background-color: #828282
</style>


<script>
import { defineComponent, ref } from "vue";

import felHelpModal from "components/level1/fel-help-modal.vue"
import felSettingsModal from "components/level1/fel-settings-modal.vue"
import felUserModal from "components/level1/fel-user-modal.vue"
import felCreateTaskModal from "components/level1/fel-create-task-modal.vue"

import felAppPinManager from "components/level2/fel-app-pin-manager.vue"



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
  //     window.crypto.subtle.generateKey(
  //   {
  //       name: "AES-CTR",
  //       length: 256
  //   },
  //   true,
  //   ["encrypt", "decrypt"]
  // ).then((key) => { console.log(key) })
    // console.log(window.crypto.randomUUID())
    // console.log(window.crypto.getRandomValues(new Uint8Array(16)))
  }
})
</script>
