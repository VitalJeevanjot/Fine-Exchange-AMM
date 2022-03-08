<template>
  <q-dialog v-model="felAppPinManagerDialog">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Create <span class="text-subtitle1">P.I.C.</span> (Personal Identification Characters)</div>
        </q-card-section>

        <q-card-section>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
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
    return {
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
