<template>

  <div>
    <q-btn rounded
    @click="toggleFelHelpDialog"
    > 
      <q-icon name="laptop_chromebook" size="1.2em"/> 
      <span class="q-pl-xs">Help</span>
      <!-- Get started guide & Show API 15 digits and email to take help -->
    </q-btn>


  <!-- Fine Exchange Limited (fel) or fel = Fine Exchange Limited -->
  <q-dialog v-model="felHeaderDialog" persistent>
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Close icon</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>

      </q-card>
    </q-dialog>


  </div>

</template>

<script>
import { ref } from "vue";

export default {
  name: 'felHelpModal',
  setup () {
    const felHeaderDialog = ref(false);
    return {
      felHeaderDialog,
      toggleFelHelpDialog() { felHeaderDialog.value = !felHeaderDialog.value },
      
    }
  }
}
</script>
