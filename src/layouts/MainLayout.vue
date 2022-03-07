<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="background-color: #071013" class="q-pa-sm">
      <q-toolbar>

        <q-avatar rounded style="width: 89px; height: 45px;">
          <img src="fine_exchange_smaller.png" alt="Fine Exchange Small Logo">
        </q-avatar>

        <q-space/>

        <q-btn flat round dense icon="whatshot" />
        <q-btn flat round dense icon="whatshot" />
        <q-btn class="q-mr-xl" flat round dense icon="whatshot" />


      </q-toolbar>
    </q-header>

    <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />

      </q-list>
    </q-drawer> -->


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import EssentialLink from "components/EssentialLink.vue";


// const linksList = [
//   {
//     title: "Docs",
//     caption: "quasar.dev",
//     icon: "school",
//     link: "https://quasar.dev",
//   },
//   {
//     title: "Github",
//     caption: "github.com/quasarframework",
//     icon: "code",
//     link: "https://github.com/quasarframework",
//   },
//   {
//     title: "Discord Chat Channel",
//     caption: "chat.quasar.dev",
//     icon: "chat",
//     link: "https://chat.quasar.dev",
//   },
//   {
//     title: "Forum",
//     caption: "forum.quasar.dev",
//     icon: "record_voice_over",
//     link: "https://forum.quasar.dev",
//   },
//   {
//     title: "Twitter",
//     caption: "@quasarframework",
//     icon: "rss_feed",
//     link: "https://twitter.quasar.dev",
//   },
//   {
//     title: "Facebook",
//     caption: "@QuasarFramework",
//     icon: "public",
//     link: "https://facebook.quasar.dev",
//   },
//   {
//     title: "Quasar Awesome",
//     caption: "Community Quasar projects",
//     icon: "favorite",
//     link: "https://awesome.quasar.dev",
//   },
// ];

// import { defineComponent, ref } from "vue";

// export default defineComponent({
//   name: "MainLayout",

//   components: {
//     EssentialLink
//   },

//   setup() {
//     const leftDrawerOpen = ref(false);

//     return {
//       essentialLinks: linksList,
//       leftDrawerOpen,
//       toggleLeftDrawer() {
//         leftDrawerOpen.value = !leftDrawerOpen.value;
//       },
//     };
//   },
// });
</script>
