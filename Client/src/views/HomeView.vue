<template>
  <div>
    <h1>Dobrodošli u Gamers Challenge</h1>
    <p>
      Ovdje možete pronaći najnovije izazove, pratiti svoj napredak i sudjelovati u gaming zajednici.
    </p>

    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-card class="quiz-card">
          <router-link :to="{ name: 'quiz', params: { id: 3 } }">
            <v-img :src="require('@/assets/Geralt_of_Rivia-ezgif.com-crop.jpg')" aspect-ratio="1" class="quiz-image"></v-img>
          </router-link>
          <v-card-actions class="quiz-actions">
            <v-btn :to="{ name: 'quiz', params: { id: 3 } }" color="primary">Start</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-card class="quiz-card">
          <router-link :to="{ name: 'quiz', params: { id: 3 } }">
            <v-img :src="require('@/assets/animal-crossing-new-horizons-i162881.jpg')" aspect-ratio="1" class="quiz-image"></v-img>
          </router-link>
          <v-card-actions class="quiz-actions">
            <v-btn :to="{ name: 'quiz', params: { id: 3 } }" color="primary">Start</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-card class="leaderboard-card">
          <h2>Leaderboard</h2>
          <v-list>
            <v-list-item-group>
              <v-list-item v-for="(player, index) in leaderboard" :key="index">
                <v-list-item-content>
                  <v-list-item-title>{{ player.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ player.score }} bodova</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quizzes: [
        { id: 1, image: 'Geralt_of_Rivia-ezgif.com-crop.jpg' },
        { id: 2, image: 'druga_slika.jpg' }, // Nova putanja za drugu sličicu
      ],
      leaderboard: [
        { name: 'Igrač 1', score: 1200 },
        { name: 'Igrač 2', score: 950 },
        { name: 'Igrač 3', score: 800 },
      ],
    };
  },
};
</script>

<style scoped>
h1 {
  color: #673ab7;
}

p {
  font-size: 16px;
}

.quiz-card {
  margin-bottom: 50px;
}

.quiz-image {
  border: 2px solid #000;
  max-width: 100%;
}

.quiz-actions {
  justify-content: center;
  align-items: center;
}

.leaderboard-card {
  margin-top: 50px;
  padding: 20px;
  border: 2px solid #000;
}
</style>
