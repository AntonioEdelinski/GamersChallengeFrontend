<template>
  <v-container fluid class="homepage-container">
    <v-row class="justify-start align-start" style="min-height: 100vh; margin: 0;">
      <v-col cols="12" sm="10" md="8" lg="6">
        <!-- Tekst dobrodošlice -->
        <div class="text-left">
          <h1>Dobrodošli u Gamer's Challenge</h1>
          <p>
            Ovdje možete pronaći najnovije izazove, pratiti svoj napredak i sudjelovati u gaming zajednici.
          </p>

          <!-- Prikaz više kvizova -->
          <v-row>
            <v-col cols="12" sm="6" md="4" lg="4" v-for="quiz in quizzes" :key="quiz.id" class="mb-4">
              <v-card class="quiz-card" outlined>
                <v-img :src="quiz.image" class="quiz-image"></v-img>
                <v-card-title>{{ quiz.title }}</v-card-title>
                <v-card-text>{{ quiz.description }}</v-card-text>
                <!-- Gumb za start kviza -->
                <v-row class="align-center justify-start">
                  <v-btn color="primary" class="mt-2" @click="startQuiz(quiz.id)">Start</v-btn>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      quizzes: [
        {
          id: 1,
          image: 'https://cdn.tehix.hr/wp-content/uploads/game-awards-tehix.jpg',
          title: 'Kviz 1: Game Awards',
          description: 'Testiraj svoje znanje o Game Awards nagradama',
        },
        {
          id: 2,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGs2O2ZFUqQvyYoKGL5_2hf0LjV4cYnteWug&s',
          title: 'Kviz 2: Playstation',
          description: 'Da li ste sigurni znate li sve o najpopularnijoj konzoli na svijetu? Testirajte svoje znanje ovdje.',
        },
      ],
    };
  },
  methods: {
    startQuiz(id) {
      this.$router.push({ name: 'quiz', params: { id } });
    },
  },
};
</script>

<style scoped>
.homepage-container {
  background-color: #000; /* Crna pozadina */
  padding: 20px;
}

.text-left {
  margin-bottom: 20px;
}

h1 {
  color: #fff;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  color: #ccc;
  margin-bottom: 20px;
}

.quiz-card {
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  max-width: 100%;
}

.quiz-image {
  width: 100%;
  height: 150px; /* Adjusted height for images */
  object-fit: cover;
}

.v-card-title, .v-card-text {
  padding: 16px;
}

.v-btn {
  margin-top: 10px;
}
</style>
