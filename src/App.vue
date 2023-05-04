<template>
  <v-app>
    <v-card>
      <v-layout>
        <v-navigation-drawer floating permanent color="primary">
          <v-list density="compact" nav>
            <v-list-item
              color="white"
              prepend-icon="mdi-view-dashboard"
              title="Home"
              value="home"
              to="/"
            ></v-list-item>
            <v-list-item
              color="white"
              prepend-icon="mdi-account"
              title="candidates"
              value="candidates"
              to="/candidates"
            ></v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main style="height: 100vh">
          <router-view />
        </v-main>
      </v-layout>
    </v-card>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",

  data() {
    return {};
  },
});
</script>
