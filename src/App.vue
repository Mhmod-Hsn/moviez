<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item
          :key="index"
          :to="{name: link.url}"
          exact
          link
          v-for="(link,index) in sidebarLinks"
        >
          <v-list-item-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{link.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Moviez App</v-toolbar-title>
    </v-app-bar>

    <transition name="fade">
      <router-view/>
    </transition>
    <v-footer app>
      <span>Copyrights reserved &copy; {{new Date().getFullYear()}} </span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    data: () => ({
      drawer: false,
      sidebarLinks: [
        {
          title: 'Discover',
          url: 'Discover',
          icon: 'mdi-view-dashboard'
        },
        {
          title: 'Favourite',
          url: 'Favourite',
          icon: 'mdi-heart'
        }
      ],
      info: null,
    }),
  }
</script>

<style lang="sass">
  @import 'assets/css/styles'

</style>
