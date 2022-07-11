<template>
  <div>

  <div class="row justify-center">
    <q-btn :disable="disable_btn" class="my-green text-grey-1 q-mt-md" label="Create" rounded @click="felAppPinManagerDialog=true"/>
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
          <div class="row q-pb-md">
            <div class="col-2 text-center"><q-icon name="task" size="1.5em"/></div>
            <div class="col-10 q-pr-sm">Cancel orders from the exchange yourself if there is an error. </div>
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
import { QSpinnerCube, useQuasar } from "quasar"
import { ref, watchEffect } from "vue"
import { showLoading, showDialog, fetchTasks } from 'components/helpers.js'
import felInput from 'components/rawElements/fel-input.vue'

export default {
  name: 'felCreateTaskAskPin',
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
  'key7', 
  'value7',
  'key8', 
  'value8',
  'key9', 
  'value9',
  'disable_btn'],
  emits: ['savedCreatedTask', 'beforeSavingData'],
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
        // console.log(this.arrayBufferToString(decrypted))
      } catch (e) {
        console.log(e)
        return false
      }
      return true
    },

    async decrypt_key_secret_data() {
      const _algo = { 
        name: "AES-GCM", 
        iv: this.strToArrayBuffer(this.pic + "-66696e65"), // 66696e65 ("fine" in bytes from https://onlinestringtools.com/convert-string-to-bytes)
      }

      var api_key = null
      var api_secret = null
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
        api_key = await window.crypto.subtle.decrypt(
          _algo, 
          imported_key,
          this.strToArrayBuffer(this.qs.localStorage.getItem("api_selected_now").api_key)
        );
        api_key = this.arrayBufferToString(api_key)
      } catch (e) {
        console.log(e)
      }

      try {
        api_secret = await window.crypto.subtle.decrypt(
          _algo, 
          imported_key,
          this.strToArrayBuffer(this.qs.localStorage.getItem("api_selected_now").api_secret)
        );
        api_secret = this.arrayBufferToString(api_secret)
      } catch (e) {
        console.log(e)
      }

      return {api_key, api_secret}
    },
    async encrypt_data() {
      // encrypt, save and run
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
      
      // @change when change in key/value because task id was 
      // planned to be assigned later when creating or saving(here)

      // OLD: Not saving Tasks locally anymore
      // this.$emit('beforeSavingData')
      // var index = 1
      // for (index = 1; index < 9; index++) {
      //   var encrypted_decoded_text = this['value'+index]
      //   if(!!this['key'+index] && !!this['value'+index]) {
      //     if(!(this['key'+index].includes('plain_'))) {

      //       const encrypted_val = await window.crypto.subtle.encrypt(
      //           _algo,
      //           imported_key, 
      //           this.strToArrayBuffer(this['value'+index])
      //         );
    
      //       encrypted_decoded_text = this.arrayBufferToString(encrypted_val)
      //     }
          
      //     // this.qs.localStorage.set(this['key'+index], encrypted_decoded_text)
      //     // console.log(await this.decrypt_key_secret_data())
      //   }
      // }
      // TODO: When the index is 9 -> make request to my backend, also notify with toast about success or failure
      let constructPostObj = {
        login_api_apiKey_S: this.qs.localStorage.getItem('login_api_apiKey_S'),
        login_api_apiKey: this.qs.localStorage.getItem('login_api_apiKey'),
        login_api_secretKey: this.qs.localStorage.getItem('login_api_secretKey'),
        login_api_exchangeURL: this.qs.localStorage.getItem('login_api_exchangeURL'),
        api_url: this.value2.url,
        api_key: (await this.decrypt_key_secret_data()).api_key,
        api_secret: (await this.decrypt_key_secret_data()).api_secret,
        api_desc: this.qs.localStorage.getItem("api_selected_now").description,
        api_name: this.qs.localStorage.getItem("api_selected_now").label,
        side: this.value1,
        symbol: this.value3,
        type: 'limit',
        seconds_interval: this.value4,
        spread_percent: this.value5,
        amount: this.value8,
        task_uuid: this.value9
      }
      showLoading(this.qs, QSpinnerCube, 'Your task is running in ', '<span class="text-cyan-5">cloud</span>')
      try {
        let res = await this.$axios.post("http://localhost:3003/create_new", {
          body: constructPostObj
        })
        console.log(res)
        console.log(res.data)

        showDialog(this.qs, 'bg-grey-4 text-grey-10', '<span class="text-blue-grey text-caption text-bold">Server Response</span>', "Task Status: " + res.data)

        
        this.pic = ''
        this.felAppPinManagerDialog = false
        this.$emit('savedCreatedTask')
      } catch(e) {
        let error = e.message;
        if(e.response) {
          error = e.response.data.message
        }
        showDialog(this.qs, 'bg-grey-3 text-grey-10', '<span class="text-blue-grey text-caption text-bold">Request Status</span>', "API_Error:CodeC_N1:"+error)
      }
      // await fetchTasks(this.qs, QSpinnerCube, this.$axios)
      this.qs.loading.hide()
      // var created_task = setInterval(() => {
      //   var ccxt = new this.$ccxt.hollaex({urls: {api: {rest: this.value2.url}}})
      //   console.log(this.value7)
      // }, this.value4 * 1000) //value 4 is the interval
      // this.qs.localStorage.set(this['key'+index], created_task)
    }
  },

  async mounted() {
    // testing:
    // fetchTasks(this.qs, QSpinnerCube, this.$axios)
    // showLoading(this.qs, QSpinnerCube)
    // setTimeout(() => {this.qs.loading.hide()}, 3000)
    //error creation task:
    // showDialog(this.qs, 'bg-grey-4 text-grey-10', '<span class="text-red text-caption text-bold">error</span>', "API_Error:CodeC_N1:")
    
    // //success creation task:
    // showDialog(this.qs, 'bg-grey-4 text-grey-10', '<span class="text-green text-caption text-bold">success</span>', "Task Created:")

  }
}
</script>
