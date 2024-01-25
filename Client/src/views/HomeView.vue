<template>
  <div>
    <h1>Dobrodošli u Gamers Challenge</h1>
    <p>
      Ovdje možete pronaći najnovije izazove, pratiti svoj napredak i sudjelovati u gaming zajednici.
    </p>

    <v-row>
      <v-col v-for="quiz in quizzes" :key="quiz.id" cols="12" sm="6" md="4" class="quiz-col">
        <!-- Ovdje možete prilagoditi putanju (to) prema vašim potrebama -->
        <router-link :to="{ name: 'quiz', params: { id: quiz.id } }">
          <v-img :src="quiz.image" aspect-ratio="1" class="quiz-image"></v-img>
        </router-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quizzes: [
        { id: 1, image: '/path/to/quiz1.jpg' },
        { id: 2, image: '/path/to/quiz2.jpg' },
        // Dodajte druge kvizove prema potrebi
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

.quiz-image {
  border: 2px solid #000; /* Crni okvir */
  max-width: 45%; /* Smanji širinu na maksimalnu dostupnu širinu */
}

.quiz-col {
  margin-bottom: 50px; /* Prilagodite razmak između sličica prema potrebi */
}
</style>
