<template>
  <v-app>
    <v-app-bar app color="purple" dark>
      <div class="d-flex align-center">
        Gamers Challenge
      </div>
      <v-spacer></v-spacer>
      <v-btn text to="/">HOME</v-btn>
      <v-btn v-show="!isAuthenticated" text :to="{ name: 'login' }" class="colored-button">Login</v-btn>
      <v-btn v-show="!isAuthenticated" text :to="{ name: 'register' }" class="colored-button">Register</v-btn>
      <v-btn v-show="isAuthenticated" @click="signOut" text>Sign Out</v-btn>
    </v-app-bar>

    <v-main>
      <div v-if="selectedSuggestion">
        <router-view :selectedSuggestion="selectedSuggestion" />
      </div>
      <router-view v-else />
    </v-main>

  </v-app>
</template>

<script>
import Homepage from '@/views/HomeView.vue';
import Register from '@/views/register.vue';
import Login from '@/views/login.vue';

export default {
  components: {
    Homepage,
    Register,
    Login
  },
  data() {
    return {
      isAuthenticated: false,
      selectedSuggestion: null,
    };
  },
  methods: {
    signOut() {
      // Implementacija odjave
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
}
</style>
