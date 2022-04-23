<template>
  <q-page class="flex flex-center" style="background-color: #CFCFCF">
    <div v-show="show_no_tasks_content">
      <p class="text-h4 text-grey-6" style="user-select: none;">No tasks Yet!</p>
      <felCreateTaskModal v-bind="val_bind_create_task"/>
    </div>
  </q-page>
</template>




<script>
import { ref, defineComponent } from "vue";
import felCreateTaskModal from "components/level1/fel-create-task-modal.vue"


export default defineComponent({
  name: "PageIndex",
  components: {
    felCreateTaskModal
  },
  setup () {
    const show_no_tasks_content = ref(true)
    const val_bind_create_task = ref({show_in_body: true})
    return {
      show_no_tasks_content,
      val_bind_create_task
    }
  }
});
</script>
