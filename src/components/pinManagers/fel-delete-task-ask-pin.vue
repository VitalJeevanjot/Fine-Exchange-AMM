<template>


  <q-btn icon="las la-trash" size="xs" class="text-white q-mr-xs"
    style="background: #D75959"
   round @click="felAppPinManagerDialog=true"/>


  <q-dialog v-model="felAppPinManagerDialog" persistent>
    <q-card class="card-in-level-2-dialog">
      <q-card-section class="row q-pb-none">
          
          <div class="text-h6"><q-btn icon='las la-angle-left' flat dense v-close-popup @click="pic=''"/> Confirm Your <span class="text-subtitle1">P.I.C.</span> To Delete It</div>
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
            <q-btn label="delete" :disable="enter_button_disable" id="enterBtn" @click="delete_encrypted_data" rounded class="text-white shadow-up-1 btn-disabled" icon="check_circle"/>
          </div>

          <div class="row q-pb-md">
            <div class="col-2 text-center"><q-icon name="warning_amber" size="1.5em"/></div>
            <div class="col-10 q-pr-md">If you forgot your <span style="font-size: 0.7em">P.I.C.</span> then you will need to reset this app which will remove all the local stored data & any running processes.</div>
          </div>
        </q-card-section>

    </q-card>
  </q-dialog>
</template>



<script>
import { QSpinnerCube, useQuasar } from "quasar"
import { ref, watchEffect } from "vue"

import felInput from 'components/rawElements/fel-input.vue'
import { showDialog, showLoading } from '../helpers'

export default {
  name: 'felTaskDeleteDataAskPin',
  components: {
    felInput
  },
  props: ['unique_id'],
  emits: ['afterTaskDeletion'],
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
      document.getElementById('enterBtn').style.backgroundColor = 'rgb(215,89,89)'

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
    async delete_encrypted_data() {
      // console.log("uniqueIDD")
      // console.log(this.unique_id)
      // console.log("uniqueIDD//")
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
      
      // var get_saved_all_keys = this.qs.localStorage.getAllKeys()

      // for (let index = 0; index < get_saved_all_keys.length; index++) {
      //   if(get_saved_all_keys[index].includes(this.unique_id)) {
      //     this.qs.localStorage.remove(get_saved_all_keys[index])
      //   }
      // }
      // Delete Task
      showLoading(this.qs, QSpinnerCube, 'Your task is deleting from', '<span class="text-cyan-5">cloud</span>')
      try {
        let res = await this.$axios.post("http://localhost:3003/delete_service", {
          body: {
            id: this.unique_id,
            login_api_apiKey_S: this.qs.localStorage.getItem('login_api_apiKey_S'),
            login_api_apiKey: this.qs.localStorage.getItem('login_api_apiKey'),
            login_api_secretKey: this.qs.localStorage.getItem('login_api_secretKey'),
          }
        })
        // console.log(res)
        // console.log(res.data)

        showDialog(this.qs, 'bg-grey-4 text-grey-10', '<span class="text-blue-grey text-caption text-bold">Server Response</span>', "Task Status: " + res.data.message)

        
        this.pic = ''
        this.felAppPinManagerDialog = false
      } catch(e) {
        let error = e.message;
        if(e.response) {
          error = e.response.data.message
        }
        showDialog(this.qs, 'bg-grey-3 text-grey-10', '<span class="text-blue-grey text-caption text-bold">Request Status</span>', "API_Error:CodeD_S1:"+error)
      }
      // await fetchTasks(this.qs, QSpinnerCube, this.$axios)
      this.pic = ''
      this.felAppPinManagerDialog = false
      this.$emit('afterTaskDeletion')
      this.qs.loading.hide()

    }
  },
}
</script>
