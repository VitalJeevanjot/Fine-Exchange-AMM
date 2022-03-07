<template>
  <q-header style="background-color: #071013" class="q-pa-xs">
      <q-toolbar>

        <q-avatar rounded style="width: 89px; height: 45px;" class="q-ml-md">
          <img :src="logo_src" alt="Fine Exchange Small Logo">
        </q-avatar>

        <q-space/>

        <q-btn flat round dense icon="add_circle" class="q-mr-sm" />
        <q-btn flat round dense icon="settings" class="q-mr-sm" />
        <q-btn flat round dense icon="account_circle" class="q-mr-sm" />
        <q-btn flat round dense icon="help" class="q-mr-md" />


      </q-toolbar>
    </q-header>

</template>

<script>
import { defineComponent } from "vue";

export default defineComponent ({
  name: 'felHeader',
  props: {
    logo_src: {
      type: String,
      required: true,
    }
  },
  setup () {
    return {}
  }
})
</script>
