<template>
  <div>

  <div class="row justify-center">
    <q-btn flat icon="add" :disable="disable_btn" class="bg-green text-grey-3 q-mt-md" label="Add" rounded @click="felAppPinManagerDialog=true"/>
  </div>

  <q-dialog v-model="felAppPinManagerDialog" persistent>
    <q-card class="card-in-level-2-dialog">
      <q-card-section class="row justify-center q-pb-none">
          <div class="text-h6">Encrypt With <span class="text-subtitle1">P.I.C.</span> (Personal Identification Characters)</div>
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
              v-bind="val_binding_pic"
             />
          </div>

          <div class="q-gutter-md row justify-center q-pa-md">
            <q-btn label="enter" :disable="enter_button_disable" id="enterBtn" @click="encrypt_data" rounded class="text-white shadow-up-1 btn-disabled" icon="check_circle"/>
          </div>

          <div class="row q-pb-md">
            <div class="col-2 text-center"><q-icon name="warning_amber" size="1.5em"/></div>
            <div class="col-10 q-pr-md">If you forgot your <span style="font-size: 0.7em">P.I.C.</span> then you will need to reset this app which will remove all the local stored data & any running processes.</div>
          </div>
        </q-card-section>

    </q-card>
  </q-dialog>
  </div>
</template>



<script>
import { useQuasar } from "quasar"
import { ref, watchEffect } from "vue"

import felInput from 'components/level4/fel-input.vue'

export default {
  name: 'felAppAddDataAskPin',
  components: {
    felInput
  },
  props: ['key1', 
  'value1', 
  'key2', 
  'value2', 
  'key3', 
  'value3', 
  'key4', 
  'value4', 
  'key5', 
  'value5',
  'disable_btn'],
  setup () {
    const qs = useQuasar()
    const felAppPinManagerDialog = ref(false)
    const pic = ref('')
    const pic_regex = ref(/_|-/gi)
    const enter_button_disable = ref(true)

    const val_binding_pic = ref({
      _style: 'width: 30vw', 
      _mask: 'X-X-X-X',
      _label: 'P.I.C.',
      _hint: 'Format: (X = 0-9/A-Z) X-X-X-X',
      _show_error: false,
      _error_msg: '',
      _rules: [val => val.replace(pic_regex.value, "").length == 4 || "Input must be valid !"]
    })

    watchEffect(() => {
      if(!pic.value || pic.value.replace(pic_regex.value, '').length < 4) {
        enter_button_disable.value = true
        if(document.getElementById('enterBtn')) {
          document.getElementById('enterBtn').style.backgroundColor = '#828282'
        }
        return
      }
      enter_button_disable.value = false
      document.getElementById('enterBtn').style.backgroundColor = 'rgb(88,179,154)'

    });

    return {
      felAppPinManagerDialog,
      pic,
      qs,
      pic_regex,
      val_binding_pic,
      enter_button_disable
    }
  },

  methods: {
    strToArrayBuffer(str) {
        var buf = new ArrayBuffer(str.length * 2);
        var bufView = new Uint16Array(buf);

        for (var i = 0, strLen = str.length; i < strLen; i++) {
          bufView[i] = str.charCodeAt(i);
        }
        return buf;
    },
    arrayBufferToString(buf) {
      return String.fromCharCode.apply(null, new Uint16Array(buf));
    },
    getData() {
        console.log(this["key1"])
        console.log(this["value1"])
        console.log(this.key2)
        console.log(this.value2)
        console.log(this.key3)
        console.log(this.value3)
        console.log(this.key4)
        console.log(this.value4)
        console.log(this.key5)
        console.log(this.value5)
      },
    async check_pic() {
      const _algo = { 
        name: "AES-GCM", 
        iv: this.strToArrayBuffer(this.pic + "-66696e65"), // 66696e65 ("fine" in bytes from https://onlinestringtools.com/convert-string-to-bytes)
      }

      let key_stored = this.qs.localStorage.getItem("important_welcome_key")
      let vlk = []
      vlk = Object.values(key_stored)

      let imported_key = await window.crypto.subtle.importKey(
        'raw',
        new Uint8Array(vlk),
        'AES-GCM',
        true,
        ['encrypt', 'decrypt']
      )

      try {
        let decrypted = await window.crypto.subtle.decrypt(
          _algo, 
          imported_key,
          this.strToArrayBuffer(this.qs.localStorage.getItem("important_welcome_edec"))
        );
        console.log(this.arrayBufferToString(decrypted))
      } catch (e) {
        console.log(e)
        return false
      }
      console.log('hllo')
      return true
    },
    async encrypt_data() {
      if(!this.check_pic(this.pic)) {
          // print something, show something
          return
      }
    }
  },

  async mounted() {

  }
}
</script>
