<template>
  <div>
    <q-input
      outlined
      rounded
      :model-value="_input_val"
      :style="_style"
      :label="_label"
      :mask="_mask"
      @update:modelValue="$emit('update:_input_val', $event)"
      bottom-slots
      :hint="_hint"
      :error="_show_error"
      :rules='_rules'
    >
    <template v-slot:error>{{_error_msg}}</template>

  </q-input>
  </div>

</template>

<script>
import { ref, defineComponent } from "vue"
export default defineComponent({
  name: 'felInput',
  props: ["_input_val", "_style", "_label", "_mask", "_hint", "_show_error", "_rules", "_error_msg"],
  emits: ['update:_input_val'],
  setup () {
    return {}
  }
})
</script>
