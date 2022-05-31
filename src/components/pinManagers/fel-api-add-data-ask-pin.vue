<template>
  <div>

  <div class="row justify-center">
    <q-btn :disable="disable_btn" class="my-green text-grey-1 q-mt-md" label="Add" rounded @click="felAppPinManagerDialog=true"/>
  </div>

  <q-dialog v-model="felAppPinManagerDialog" persistent>
    <q-card class="card-in-level-2-dialog">
      <q-card-section class="row q-pb-none">
          
          <div class="text-h6"><q-btn icon='las la-angle-left' flat dense v-close-popup @click="pic=''"/> Encrypt With <span class="text-subtitle1">P.I.C.</span> (Personal Identification Characters)</div>
        </q-card-section>

        <q-card-section>
          <div class="row q-pb-md">
            <div class="col-2 text-center"><q-icon name="info_outline" size="1.5em"/></div>
            <div class="col-10 q-pr-sm">Personal Indentification Characters or Code will encrypt & 
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

import felInput from 'components/rawElements/fel-input.vue'

import {getAPIs} from 'components/helpers'

export default {
  name: 'felApiAddDataAskPin',
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
  'key6', 
  'value6',
  'disable_btn'],
  emits: ['savedApiData', 'beforeSavingData'],
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
      _type: 'password',
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
    async check_pic(_algo, imported_key) {
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
      return true
    },
    async encrypt_data() {
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


      if(!await this.check_pic(_algo, imported_key)) {
          // print something, show something that PIC is incorrect
          this.qs.notify({
            message: 'Please enter correct Code !',
            color: 'red-7',
            icon: 'warning',
            timeout: 2500
          })
          return
      }
      
      this.$emit('beforeSavingData')


      for (let index = 1; index <= 6; index++) {
        var encrypted_decoded_text = this['value'+index]
        if(!!this['key'+index] && !!this['value'+index]) {
          if(!(this['key'+index].includes('plain_'))) {
        
            const encrypted_val = await this.encryptVals(_algo, imported_key, this['value'+index]) 

            encrypted_decoded_text = this.arrayBufferToString(encrypted_val)
          }
          this.qs.localStorage.set(this['key'+index], encrypted_decoded_text)
        }
        
      }

      if(getAPIs(this.qs).length == 1) {
        // TODO: Run a get services (tasks) method here as well (if get user details returned error here then reset user api added and ask for api details again (this only when adding api first time)) by taking value2 and value3 unencrypted...
        let api_key_encrypted = this.arrayBufferToString(await this.encryptVals(_algo, imported_key, this['value2']))
        let api_secret_encrypted = this.arrayBufferToString(await this.encryptVals(_algo, imported_key, this['value3']))
        
        this.qs.localStorage.set('login_api_apiName', this['value1'])
        this.qs.localStorage.set('login_api_apiKey', api_key_encrypted)
        this.qs.localStorage.set('login_api_secretKey', api_secret_encrypted)
        this.qs.localStorage.set('login_api_exchangeName', this['value4'])
        this.qs.localStorage.set('login_api_addDate', this['value5'])
        this.qs.localStorage.set('login_api_exchangeURL', this['value6'])
      }

      this.pic = ''
      this.felAppPinManagerDialog = false
      this.$emit('savedApiData')
    },

    async encryptVals(_algo, imported_key, val) {
      return await window.crypto.subtle.encrypt(
        _algo,
        imported_key, 
        this.strToArrayBuffer(val)
      );
    }
  },


  async mounted() {

  }
}
</script>
