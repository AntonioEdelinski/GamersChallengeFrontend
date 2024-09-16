<template>
    <v-container fluid class="result-container">
      <v-row>
        <!-- Quiz Results -->
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
  
        <!-- Leaderboard -->
        <v-col cols="12" md="6" class="leaderboard-col">
          <v-card class="pa-6" outlined>
            <v-card-title class="text-h4 text-center">Leaderboard</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item-group>
                  <v-list-item v-for="(entry, index) in leaderboard" :key="index">
                    <v-list-item-content>
                      <v-list-item-title>{{ entry.username }}</v-list-item-title>
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
        leaderboard: [],
      };
    },
    created() {
      console.log('Created hook called');
      console.log('Route params:', this.$route.params);
      this.score = this.$route.params.score;
      console.log('Score set to:', this.score);
      this.fetchLeaderboard();
    },
    methods: {
      async fetchLeaderboard() {
        try {
          const response = await fetch('http://localhost:3000/quiz2/leaderboard');
          console.log('Fetching leaderboard...');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this.leaderboard = data.leaderboard;
          console.log('Leaderboard data:', this.leaderboard);
        } catch (error) {
          console.error('Error fetching leaderboard:', error);
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
  