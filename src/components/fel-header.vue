<template>
  <q-header style="background-color: #071013" class="q-pa-xs">
      <q-toolbar>

        <q-avatar rounded style="width: 89px; height: 45px;" class="q-ml-md">
          <img :src="logo_src" alt="Fine Exchange Small Logo">
        </q-avatar>

        <q-space />

        <felAppPinManager />
        <felCreateTaskModal v-bind="val_bind_create_task" />
        <felSettingsModal />
        <felUserAccountModal />
        <felHelpModal />


      </q-toolbar>

    </q-header>


</template>

<style lang="sass">
.card-in-level-1-dialog
  background-color: #f2f2f2
  border-radius: 30px !important

.card-in-level-2-dialog
  background-color: #ECECEC
  border-radius: 30px !important
  min-width: 300px !important
  width: 70vw !important

.card-in-level-3-dialog
  background-color: #E0E0E0 
  border-radius: 40px !important
  min-width: 300px

.btn-disabled
  background-color: #828282
</style>


<script>
import { defineComponent, ref } from "vue";

import felHelpModal from "components/miscellaneous/fel-help-modal.vue"
import felSettingsModal from "src/components/operations/fel-settings-modal.vue"
import felUserAccountModal from "src/components/information/fel-user-account-modal.vue"
import felCreateTaskModal from "src/components/operations/fel-create-task-modal.vue"

import felAppPinManager from "src/components/pinManagers/fel-app-pin-manager.vue"



export default defineComponent ({
  name: 'felHeader',
  components: {
    felHelpModal,
    felSettingsModal,
    felUserAccountModal,
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
    const val_bind_create_task = ref({show_in_header: true})
    return {
      val_bind_create_task
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
