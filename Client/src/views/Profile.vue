<template>
  <v-container fluid class="profile-container">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-6 white-card">
          <v-card-title class="text-h4 text-center">Moj Profil</v-card-title>

          <!-- Display profile information -->
          <v-row justify="center" class="mt-4">
            <v-avatar size="100">
              <v-img :src="profilePicture" />
            </v-avatar>
          </v-row>

          <v-text-field
            label="Korisničko ime"
            v-model="username"
            readonly
            class="mt-4"
          ></v-text-field>

          <v-text-field
            label="Email"
            v-model="email"
            readonly
            class="mt-4"
          ></v-text-field>

          <!-- Remove password fields since they are not needed -->
          
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      profilePicture: "https://via.placeholder.com/100", // Default profile picture
      username: "", // Username fetched from backend
      email: "", // Email fetched from backend
    };
  },
  methods: {
    async fetchProfile() {
      const token = localStorage.getItem('token'); // Get JWT token from localStorage

      if (!token) {
        alert("Niste prijavljeni.");
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/user/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include JWT token in header
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        this.username = data.username;
        this.profilePicture = data.profilePicture || "https://via.placeholder.com/100";
        this.email = data.email;
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert('Došlo je do greške prilikom preuzimanja profila.');
      }
    },
  },

  created() {
    this.fetchProfile();
  },
};
</script>

<style scoped>
.profile-container {
  background-color: #1e1e1e;
  min-height: 100vh;
  padding-top: 20px;
  color: white;
}

.white-card {
  background-color: #ffffff;
  color: #000000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.v-avatar {
  border: 2px solid #673ab7;
}

.v-text-field input {
  color: black;
}
</style>
