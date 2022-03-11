<template>
  <q-dialog v-model="felAppPinManagerDialog" persistent>
    <q-card class="card-in-level-2-dialog">
      <q-card-section class="row justify-center q-pb-none">
          <div class="text-h6">Create <span class="text-subtitle1">P.I.C.</span> (Personal Identification Characters)</div>
        </q-card-section>

        <q-card-section>
          <div class="row q-pb-md">
            <div class="col-2 text-center"><q-icon name="info_outline" size="1.5em"/></div>
            <div class="col-10 q-pr-sm">Personal Indentification Characters will encrypt & 
              secure the local data used by this app to some extent. DO NOT FORGET THESE 4 CHARACTERS! 
              The characters are hidden & each appended with one extra character (-). </div>
          </div>

          <div class="q-gutter-md row justify-center q-pb-md">
            <q-input
              outlined
              rounded
              v-model="pic"
              style="max-width: 20vw"
              label="P.I.C."
              mask="X-X-X-X"
              hint="Format: (X = 0-9/A-Z) X-X-X-X"
              :rules='[val => val.replace(pic_regex, "").length == 4 || "Fill all the characters !"]'
            />
          </div>

          <div class="q-gutter-md row justify-center">
            <q-input
              outlined
              v-model="confirm_pic"
              type="password"
              rounded
              style="max-width: 20vw"
              label="Confirm P.I.C."
              bottom-slots
              mask="X-X-X-X"
              :error="confirm_pic_err"
            >
              <template v-slot:error>{{confirm_pic_error_msg}}</template>

            </q-input>

          </div>

          <div class="q-gutter-md row justify-center q-pa-md">
            <q-btn label="enter" :disable="enter_button_disable" id="enterBtn" @click="enter_app" rounded class="text-white shadow-up-1 btn-disabled" icon="check_circle"/>
          </div>

          <div class="row q-pb-md">
            <div class="col-2 text-center"><q-icon name="warning_amber" size="1.5em"/></div>
            <div class="col-10 q-pr-md">If you forgot your <span style="font-size: 0.7em">P.I.C.</span> then you will need to reset this app which will remove all the local stored data.</div>
          </div>
        </q-card-section>

    </q-card>
  </q-dialog>
</template>



<script>
import { useQuasar } from "quasar"
import { ref, watchEffect } from "vue"

export default {
  name: 'felAppPinManager',
  setup () {
    const qs = useQuasar()
    const felAppPinManagerDialog = ref(false)
    const pic = ref('')
    const confirm_pic = ref('')
    const pic_regex = ref(/_|-/gi)
    const enter_button_disable = ref(true)
    const confirm_pic_error_msg = ref('')
    const confirm_pic_err = ref(false)
    watchEffect(() => {
      if(!pic.value || pic.value.replace(pic_regex.value, '').length < 4) {
        enter_button_disable.value = true
        if(document.getElementById('enterBtn')) {
          document.getElementById('enterBtn').style.backgroundColor = '#828282'
        }
        return
      }
      confirm_pic_err.value = true 
      document.getElementById('enterBtn').style.backgroundColor = '#828282'
      enter_button_disable.value = true
      let k = confirm_pic.value.replace(pic_regex.value, '').length == 4; 
      let _k = confirm_pic.value == pic.value;
      if(!k) {
        confirm_pic_error_msg.value = 'Fill all the characters!';
        return true
      }
      else if(!_k) {
        confirm_pic_error_msg.value = 'Both inputs must match!';
        return true;
      } else {
        confirm_pic_err.value = false
        enter_button_disable.value = false
      }
      document.getElementById('enterBtn').style.backgroundColor = 'rgb(88,179,154)'

    });

    return {
      felAppPinManagerDialog,
      pic,
      confirm_pic,
      qs,
      pic_regex,
      enter_button_disable,
      confirm_pic_error_msg,
      confirm_pic_err,
      enter_app() {
        console.log("ENTRRRR")

        if(confirm_pic_err.value == true) {
          // if user tries to enable enter_button through other way
          // not tackling if user clears the whole dialog (other way)
          qs.notify("No cheating!")
          return
        }

        window.crypto.subtle.generateKey(
        {
            name: "AES-CTR",
            length: 256
        },
        true,
        ["encrypt", "decrypt"]
        ).then(async (key) => { 
          // console.log(key) 
          felAppPinManagerDialog.value = false 
          try {
            const enc = new TextEncoder(); // 66696e65 (Fine in bytes)
            const algorithm = { name: "AES-CTR", counter: enc.encode(confirm_pic.value + "-66696e65"), length: 64 } 
            const _uid = window.crypto.randomUUID();
            const encoded_uid = enc.encode(_uid) 
            const encrypted_val = await window.crypto.subtle.encrypt(algorithm, key, encoded_uid)
            const edec = new TextDecoder();
            const encrypted_decoded_text = edec.decode(encrypted_val) // To save it
            qs.localStorage.set('important_welcome_edec', encrypted_decoded_text)
          } catch (err) {
            console.log(err)
            // TODO: Show error through notification for longer time
          }
        })

        // console.log(pic.value)
        // console.log(confirm_pic.value)
        // console.log(pic.value.replace(pic_regex.value, ""))
        // console.log(confirm_pic.value.replace(pic_regex.value, "").length)
      }
    }
  },

  mounted() {
    // TODO: Add `enter/return` key as clickable for  ok/enter/confirm buttons, `esc.` key for other if required
    // TODO: If failed to decrypt the UID then ask for correct P.I.C or app reset.
    // TODO: Add an error to save keys only and not value to test below...
    // TODO: If no value in `important_welcome` key then delete it and ask for correct P.I.C or app reset.
    // TODO: ask user to add P.I.C. or reset the app (if other keys exists and 'important_welcome' not) as now the data cannot be decrypted

    if(this.qs.localStorage.has("important_welcome_edec")) {
      console.log("found the encrypted decoded key!")
      console.log(this.qs.localStorage.getItem('important_welcome_edec'))
    } 
    else {
      this.felAppPinManagerDialog = true
    }
  }
}
</script>
