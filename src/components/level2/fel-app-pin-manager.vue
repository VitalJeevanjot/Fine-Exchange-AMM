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
            <felInput 
            v-model:_input_val="pic" 
            v-bind="val_binding_pic" />

            <!-- <q-input
              outlined
              rounded
              v-model="pic"
              style="width: 30vw"
              label="P.I.C."
              mask="X-X-X-X"
              hint="Format: (X = 0-9/A-Z) X-X-X-X"
              :rules='[val => val.replace(pic_regex, "").length == 4 || "Fill all the characters !"]'
            /> -->
          </div>

          <div class="q-gutter-md row justify-center">
            <!-- <q-input
              outlined
              v-model="confirm_pic"
              type="password"
              rounded
              style="width: 30vw"
              label="Confirm P.I.C."
              bottom-slots
              mask="X-X-X-X"
              :error="confirm_pic_err"
            >
              <template v-slot:error>{{confirm_pic_error_msg}}</template>

            </q-input> -->
            <felInput 
            v-model:_input_val="confirm_pic"
            v-bind="val_binding_confirm_pic"
            />

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
import felInput from 'components/level4/fel-input.vue'

export default {
  name: 'felAppPinManager',
  components: {
    felInput
  },
  setup () {
    const qs = useQuasar()
    const felAppPinManagerDialog = ref(false)
    const pic = ref('')
    const confirm_pic = ref('')
    const pic_regex = ref(/_|-/gi)
    const enter_button_disable = ref(true)
    const confirm_pic_err = ref(false)
    const confirm_pic_error_msg = ref('')

    const val_binding_pic = ref({
      _style: 'width: 30vw', 
      _mask: 'X-X-X-X',
      _label: 'P.I.C.',
      _hint: 'Format: (X = 0-9/A-Z) X-X-X-X',
      _show_error: false,
      _error_msg: '',
      _rules: [val => val.replace(pic_regex.value, "").length == 4 || "Fill all the characters !"]
    })

    const val_binding_confirm_pic = ref({
      _style: 'width: 30vw', 
      _mask: 'X-X-X-X',
      _label: 'Confirm P.I.C.',
      _hint: 'Format: (X = 0-9/A-Z) X-X-X-X',
      _show_error: confirm_pic_err,
      _error_msg: confirm_pic_error_msg,
      _rules: []
    })
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

    function strToArrayBuffer(str) {
        var buf = new ArrayBuffer(str.length * 2);
        var bufView = new Uint16Array(buf);

        for (var i = 0, strLen = str.length; i < strLen; i++) {
          bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }
    function arrayBufferToString(buf) {
      return String.fromCharCode.apply(null, new Uint16Array(buf));
    }

    return {
      felAppPinManagerDialog,
      pic,
      confirm_pic,
      qs,
      pic_regex,
      enter_button_disable,
      confirm_pic_error_msg,
      confirm_pic_err,
      strToArrayBuffer,
      arrayBufferToString,
      val_binding_confirm_pic,
      val_binding_pic,
      async enter_app() {
        console.log("ENTRRRR")

        if(confirm_pic_err.value == true) {
          // if user tries to enable enter_button through other way
          // not tackling if user clears the whole dialog (other way)
          qs.notify("No cheating!")
          return
        }

         
        try {
          const _uid = window.crypto.randomUUID(); 
          // keep _uid & _key in storage as encrypted form to use right values each time for new encryption & decryption

          const _key = await window.crypto.subtle.generateKey(
            {
                name: "AES-GCM",
                length: 256
            },
            true,
            ["encrypt", "decrypt"]
          )
          const exported = await window.crypto.subtle.exportKey( "raw", _key );
          const exportedKeyBuffer = new Uint8Array(exported);
          qs.localStorage.set('important_welcome_key', exportedKeyBuffer)
          
          const _algo = { 
            name: "AES-GCM", 
            iv: strToArrayBuffer(confirm_pic.value + "-66696e65"), // 66696e65 ("fine" in bytes from https://onlinestringtools.com/convert-string-to-bytes)
          }
          
          const encrypted_val = await window.crypto.subtle.encrypt(
            _algo,
            _key, 
            strToArrayBuffer(_uid)
          );

          _algo.iv = arrayBufferToString(_algo.iv)

          // store 'important_welcome_algo' for testing (iv is value to be given by user)
          // qs.localStorage.set('important_welcome_algo', _algo)

          const encrypted_decoded_text = arrayBufferToString(encrypted_val) // To save it (convert it to string)
          // store 'important_welcome_edec' (edec = encrypted decoded text)
          qs.localStorage.set('important_welcome_edec', encrypted_decoded_text)

          felAppPinManagerDialog.value = false

        } catch (err) {
          felAppPinManagerDialog.value = true
          console.log(err)
          // TODO: Show error through notification for longer time
        }
        // console.log(pic.value)
        // console.log(confirm_pic.value)
        // console.log(pic.value.replace(pic_regex.value, ""))
        // console.log(confirm_pic.value.replace(pic_regex.value, "").length)
      }
    }
  },

  async mounted() {
    // if(!this.qs.localStorage.getItem('important_welcome_uid')) {
    //   const _uid = window.crypto.randomUUID();
    //   this.qs.localStorage.set('important_welcome_uid', _uid)
    // } if decrypt with wrong key doesn't bring error then use this as reference to encrypt other things later

    // TODO: `algo` is not something to store at all...
    // TODO: If 'important_welcome_key' or algo is not available then will some of below TODO works?
    // TODO: Add `enter/return` key as clickable for  ok/enter/confirm buttons, `esc.` key for other if required
    // TODO: If failed to decrypt the UID then ask for correct P.I.C or app reset.
    // TODO: Add an error to save keys only and not value to test below...
    // TODO: If no value in `important_welcome` key then delete it and ask for correct P.I.C or app reset.
    // TODO: ask user to add P.I.C. or reset the app (if other keys exists and 'important_welcome' not) as now the data cannot be decrypted

    if(!this.qs.localStorage.has("important_welcome_edec") || 
      !this.qs.localStorage.has("important_welcome_key")) 
    {
      this.felAppPinManagerDialog = true
    }

    // for testing
    // if(this.qs.localStorage.has("important_welcome_edec") && 
    //   this.qs.localStorage.has("important_welcome_algo") &&
    //   this.qs.localStorage.has("important_welcome_key")
    // ) {
    //   // console.log("found the encrypted decoded key!")
    //   // console.log(this.qs.localStorage.getItem('important_welcome_edec'))

    //   // console.log("Decrypted form of above is as below: ")

    //   let _algo = this.qs.localStorage.getItem("important_welcome_algo")
    //   _algo.iv = _algo.iv
    //   console.log(_algo)
    //   _algo.iv = this.strToArrayBuffer(_algo.iv)

    //   let key_stored = this.qs.localStorage.getItem("important_welcome_key")
    //   let vlk = []
    //   vlk = Object.values(key_stored)
      
    //   let imported_key = await window.crypto.subtle.importKey(
    //     'raw',
    //     new Uint8Array(vlk),
    //     'AES-GCM',
    //     true,
    //     ['encrypt', 'decrypt']
    //   )

    //   try {
    //     let decrypted = await window.crypto.subtle.decrypt(
    //       _algo, 
    //       imported_key,
    //       this.strToArrayBuffer(this.qs.localStorage.getItem("important_welcome_edec"))
    //     );
    //     console.log(this.arrayBufferToString(decrypted))
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }
    // else {
    //   this.felAppPinManagerDialog = true
    // }
  }
}
</script>
