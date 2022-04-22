<template>
  <div>
    <q-list class="rounded-borders" style="max-width: 600px">
      <q-item-label header>Saved API Credentials</q-item-label>
      <q-item clickable style="border-radius: 20px">
        <q-item-section top>
          <q-item-label lines="1">
            <span class="text-weight-medium">Api Name</span>
          </q-item-label>
          <q-item-label caption lines="1">
            <span class="text-grey-8">Last Updated: </span>
          </q-item-label>
        </q-item-section>
        <q-tem-section top side>
          <q-btn icon="delete" round size="0.7rem" flat/>
        </q-tem-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: 'felListItem',
  setup () {
    return {}
  }
}
</script>
