<template>
  <div>
    <q-btn flat round dense icon="add_circle" class="q-mr-sm" @click="create_new_task" />
  </div>

</template>

<script>
export default {
  name: 'felCreateTaskModal',
  setup () {
    return {
      create_new_task () {
        console.log("new task created!")
      }
    }
  }
}
</script>
