<template>
  <div> 
    <q-select 
    standout="bg-grey-10 text-grey-1" 
    :model-value="model" 
    @update:modelValue="$emit('update:model', $event)"
    class="q-pb-sm"
    style="min-width: 300px"
    rounded
    :options="options" 
    label="Select Exchange" />
  </div>
</template>

<script>

export default {
  name: 'felDropdown',
  props: ['model', 'options'],
  emits: ['update:model'],
  setup () {
    return {
    }
  }
}
</script>
