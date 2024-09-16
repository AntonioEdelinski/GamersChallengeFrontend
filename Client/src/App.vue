<template>
  <v-app>
    <v-app-bar app color="purple" dark>
      <div class="d-flex align-center">
        Gamers Challenge
      </div>
      <v-spacer></v-spacer>
      
      <!-- Dugme za početnu stranicu -->
      <v-btn icon :to="{ name: isAuthenticated ? 'homeafterlogin' : 'home' }">
        <v-icon>mdi-home</v-icon> <!-- Ikona kućice -->
      </v-btn>

      <!-- Dugmad za Login i Register kada korisnik nije prijavljen -->
      <v-btn v-show="!isAuthenticated" text :to="{ name: 'login' }" class="colored-button">Login</v-btn>
      <v-btn v-show="!isAuthenticated" text :to="{ name: 'register' }" class="colored-button">Register</v-btn>

      <!-- Profilna slika s padajućim izbornikom kada je korisnik prijavljen -->
      <v-menu v-if="isAuthenticated" bottom right>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar v-bind="attrs" v-on="on" size="40" class="ma-2">
            <v-img src="https://via.placeholder.com/40" />
          </v-avatar>
        </template>
        <v-list>
          <v-list-item :to="{ name: 'profile' }">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon> <!-- Ikona profila -->
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>View Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="signOut">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon> <!-- Ikona odjave -->
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
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
      isAuthenticated: !!localStorage.getItem('authToken'), // Proverava da li postoji token
      selectedSuggestion: null,
    };
  },
  methods: {
    signOut() {
      localStorage.removeItem('authToken'); // Uklanjanje JWT tokena iz localStorage
      this.isAuthenticated = false; // Postavljanje isAuthenticated na false
      this.$router.push('/'); // Preusmeravanje na početnu stranicu
    },
  },
  watch: {
    // Osvježavanje stanja prijave kada se ruta promeni
    '$route'(to, from) {
      this.isAuthenticated = !!localStorage.getItem('authToken');
    }
  }
};
</script>

<style scoped>
body {
  margin: 0;
}
</style>
