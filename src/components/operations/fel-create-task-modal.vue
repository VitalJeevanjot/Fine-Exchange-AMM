<template>
  <div v-show="show_in_header">
    <q-btn flat round dense icon="add_circle" class="q-mr-sm" @click="create_new_task" />
  </div>

  <div class="row justify-center" v-show="show_in_body">
    <q-btn class="text-grey-6" round flat icon="add_circle" size="xl" @click="create_new_task"/>
  </div>

  <div>
    <q-dialog v-model="felCreateNewTaskDialog" persistent>
      <q-card class="card-in-level-1-dialog" style="min-width: 300px">
          <q-bar class="bg-grey-10 text-grey-1">
            <div>Create New Task</div> 
            <q-space/> 
            <q-btn icon='close' round flat dense v-close-popup/>
          </q-bar>
        <q-card-section>
          <felDropdown 
          v-model:model="api_selected"
          v-bind="val_binding_apis_dropdown"/>
          <!-- Select API -->
          <!-- Add timer interval (select range then provide min-max (excluded/included check)) -->
          <!-- Add spread or if use custom basic equation (With e(price) e_low e_high etc parameters provided for basic arithmetic form fine exchnage) -->
        </q-card-section>
      </q-card>

    </q-dialog>
  </div>
</template>

<script>
import { ref } from 'vue'
import felDropdown from 'components/rawElements/fel-dropdown.vue'
export default {
  name: 'felCreateTaskModal',
  props: ['show_in_body', 'show_in_header'],
  components: {
    felDropdown
  },
  setup () {
    const felCreateNewTaskDialog = ref(false)
    const api_selected = ref('')
    const val_binding_apis_dropdown = ref({
      options: 'APIs'
    })
    return {
      felCreateNewTaskDialog,
      api_selected,
      val_binding_apis_dropdown,
      create_new_task () {
        felCreateNewTaskDialog.value = true
        // var int = 0
        // console.log(int++)
        // var new_int = setInterval(() => {
        //   console.log(int++)
        // }, 10000)
      }
    }
  }
}
</script>
