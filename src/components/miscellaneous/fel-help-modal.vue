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
          <div class="text-h6">Help</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-btn class="bg-grey-10 text-white" @click="openDocs">
            <q-icon name="navigate_next"/>
            Get Started Guide
          </q-btn>
        </q-card-section>
        
        <q-separator/>

        <q-card-section>
            <p class="text-caption">Get technical support by 
              email. Forward your question with your unique id:</p>
          <div class="row">
            <p> <b>Unique Id:</b> {{api_logging_key}} </p>
          </div>
          <div class="row">
            <!-- TODO: activate the email -->
            <p> <b>Support email:</b> supportaom@fine.exchange (Email support not activated yet!) </p> 
          </div>
        </q-card-section>

      </q-card>
    </q-dialog>


  </div>

</template>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar"

export default {
  name: 'felHelpModal',
  setup () {
    const qs = useQuasar()
    const felHeaderDialog = ref(false);
    const api_logging_key = ref(qs.localStorage.getItem('login_api_apiKey_S'))
    return {
      api_logging_key,
      felHeaderDialog,
      toggleFelHelpDialog() { felHeaderDialog.value = !felHeaderDialog.value },
      openDocs() {window.open('https://docs.fine.exchange/docs/aom_docs/get_started/', '_blank')}
      
    }
  }
}
</script>
