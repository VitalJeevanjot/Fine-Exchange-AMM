<template>
  <q-dialog v-model="felAppPinManagerDialog" persistent>
    <q-card class="card-in-level-2-dialog">
      <q-card-section class="row justify-center q-pb-none">
          <div class="text-h6">Create <span class="text-subtitle1">P.I.C.</span> (Personal Identification Characters)</div>
        </q-card-section>

        <q-card-section>
          <div class="row q-pb-md">
            <div class="col-2 text-center"><q-icon name="info_outline" size="1.5em"/></div>
            <div class="col-10 q-pr-sm">Personal Indentification Characters will encrypt & secure the local data used by this app to some extent. DO NOT FORGET THESE 4 CHARACTERS!</div>
          </div>

          <div class="q-gutter-md row justify-center q-pb-md">
            <q-input
              outlined
              rounded
              v-model="pic"
              fill-mask
              label="P.I.C."
              mask="X-X-X-X"
              hint="Format: (X = 0-9/A-Z) X-X-X-X"
            />
          </div>

          <div class="q-gutter-md row justify-center">
            <q-input
              outlined
              rounded
              v-model="confirm_pic"
              fill-mask
              label="Confirm P.I.C."
              mask="X-X-X-X"
              hint="Format: (X = 0-9/A-Z) X-X-X-X"
            />

          </div>

          <div class="q-gutter-md row justify-center q-pa-md">
            <q-btn label="enter" rounded class="text-white shadow-up-1" style="background-color: #58B39A" icon="check_circle"/>
          </div>

          <div class="row q-pb-md">
            <div class="col-2 text-center"><q-icon name="warning_amber" size="1.5em"/></div>
            <div class="col-10 q-pr-md">If you forgot your <span style="font-size: 0.7em">P.I.C.</span> then you will need to reset the whole app storage which will remove all the local stored data.</div>
          </div>

          <!-- <div class="q-gutter-md row justify-center q-pb-md"> -->
        </q-card-section>

    </q-card>
  </q-dialog>
</template>




<script>
import { useQuasar } from "quasar"
import { ref } from "vue"

export default {
  name: 'felAppPinManager',
  setup () {
    const $q = useQuasar()
    const felAppPinManagerDialog = ref(false)
    const pic = ref("")
    const confirm_pic = ref("")
    return {
      pic,
      confirm_pic,
      $q,
      felAppPinManagerDialog,
    }
  },
  mounted() {
    console.log(this.$q.localStorage)
    if(this.$q.localStorage.has("hello")) {
      console.log("found the key!")
    } else {
      this.felAppPinManagerDialog = true
    }
  }
}
</script>
