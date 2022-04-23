<template>
  <div v-show="show_in_header">
    <q-btn flat round dense icon="add_circle" class="q-mr-sm" @click="create_new_task" />
  </div>

  <div class="row justify-center" v-show="show_in_body">
    <q-btn class="text-grey-6" round flat icon="add_circle" size="xl"/>
  </div>

</template>

<script>
export default {
  name: 'felCreateTaskModal',
  props: ['show_in_body', 'show_in_header'],
  setup () {
    return {
      create_new_task () {
        console.log("new task created!")
      }
    }
  }
}
</script>
