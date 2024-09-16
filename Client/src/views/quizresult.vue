<template>
  <v-container fluid class="result-container">
    <v-row>
      <!-- Rezultat kviza sa lijeve strane -->
      <v-col cols="12" md="6" class="result-col">
        <v-card class="pa-6" outlined>
          <v-card-title class="text-h4 text-center">Quiz Result</v-card-title>
          <v-card-text class="text-center">
            Your score: {{ score }}
          </v-card-text>
          <v-row class="mt-4">
            <!-- Back to Home Button -->
            <v-col>
              <v-btn color="blue darken-2" class="mt-4" block @click="goToHome">
                Back to Home
              </v-btn>
            </v-col>
            <!-- Add to Leaderboard Button -->
            <v-col>
              <v-btn color="green darken-2" class="mt-4" block @click="addToLeaderboard">
                Add to Leaderboard
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <!-- Leaderboard s desne strane -->
      <v-col cols="12" md="6" class="leaderboard-col">
        <v-card class="pa-6" outlined>
          <v-card-title class="text-h4 text-center">Leaderboard</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item-group>
                <v-list-item v-for="(entry, index) in leaderboard" :key="index">
                  <v-list-item-content>
                    <v-list-item-title>{{ entry.name }}</v-list-item-title>
                    <v-list-item-subtitle>Score: {{ entry.score }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      score: 0,
      leaderboard: [
        { name: 'Player 1', score: 5 },
        { name: 'Player 2', score: 4 },
        { name: 'Player 3', score: 3 },
        // Add more entries as needed
      ],
    };
  },
  created() {
    // Get score from route parameters
    this.score = this.$route.params.score;
    // Here you could fetch the actual leaderboard from an API
  },
  methods: {
    goToHome() {
      const isLoggedIn = !!localStorage.getItem('authToken');
      this.$router.push(isLoggedIn ? '/homeafterlogin' : '/');
    },
    addToLeaderboard() {
      const isLoggedIn = !!localStorage.getItem('authToken');

      if (isLoggedIn) {
        // Add the user to the leaderboard
        const username = localStorage.getItem('username'); // Assuming the username is stored
        this.leaderboard.push({ name: username, score: this.score });
        // Optionally, send a request to update the leaderboard on the server
        console.log('User added to leaderboard:', username, this.score);
      } else {
        // Redirect to login page
        this.$router.push('/login');
      }
    }
  },
};
</script>
<style scoped>
.result-container {
  padding: 20px;
}

.result-col {
  margin-bottom: 20px;
}

.leaderboard-col {
  margin-bottom: 20px;
}

.v-card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.v-btn {
  border-radius: 4px;
}
</style>
