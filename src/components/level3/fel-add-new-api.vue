<template>
  <div>
  <q-btn icon="add" flat dense>
    <q-tooltip>
      Add new API Key/Secret
    </q-tooltip>
  </q-btn>


  <q-dialog v-model="felAddNewApiDialog" persistent>
    <q-card class="card-in-level-3-dialog">
      <q-card-section class="row justify-center">
        <q-space/>
        <q-btn icon='close' flat dense v-close-popup/>
      </q-card-section>

      <q-card-section>
        Ok so add now pls...
      </q-card-section>
    </q-card>
  </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'felAddNewApi',
  setup () {
    return {}
  }
}
</script>
