<template>
  <!-- Fine Exchange Limited (fel) -->
  <q-dialog :model-value="modal_open" @update:modelValue="$emit('update:modal_open', $event)">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Close icon</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
        </q-card-section>
      </q-card>
    </q-dialog>

</template>

<script>
import { defineComponent } from "vue";

export default {
  name: 'felHelpModal',
  props: {
    modal_open: {
      type: Boolean,
      required: true
    }
  },
  emits:['update:modal_open'],
  setup () {
    return {
    }
  }
}
</script>
