<template>
    <v-container fluid class="quiz-container">
      <v-row justify="center" align="center" style="min-height: 100vh;">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="pa-6 quiz-card" outlined>
            <v-card-title class="text-h4 text-center">Quiz - Playstation</v-card-title>
  
            <!-- Težina kviza -->
            <v-row class="difficulty-row" justify="center" align="center">
              <v-btn
                :color="selectedDifficulty === 'easy' ? 'green' : 'grey'"
                @click="selectDifficulty('easy')"
                class="mr-2"
                :disabled="quizStarted" 
              >
                Easy
              </v-btn>
              <v-btn
                :color="selectedDifficulty === 'hard' ? 'red' : 'grey'"
                @click="selectDifficulty('hard')"
                :disabled="quizStarted" 
              >
                Hard
              </v-btn>
            </v-row>
  
            <!-- Tajmer -->
            <v-row justify="center" class="mt-3" v-if="quizStarted">
              <v-col cols="auto">
                <h3>{{ formattedTime }}</h3> <!-- Prikaz preostalog vremena -->
              </v-col>
            </v-row>
  
            <v-btn @click="startQuiz" color="blue darken-2" class="mt-4" block :disabled="quizStarted">
              Start Quiz
            </v-btn>
  
            <v-form v-if="questions.length && quizStarted" class="mt-4">
              <div v-for="(question, index) in questions" :key="index">
                <v-card class="pa-3 mb-2 quiz-question-card">
                  <v-card-subtitle>{{ question.question }}</v-card-subtitle>
  
                  <!-- Prikaz pitanja s više izbora za "easy" -->
                  <v-radio-group v-if="selectedDifficulty === 'easy'" v-model="userAnswers[index]">
                    <v-radio
                      v-for="option in question.filteredOptions || question.options"
                      :key="option"
                      :label="option"
                      :value="option"
                    ></v-radio>
                  </v-radio-group>
  
                  <!-- Prikaz pitanja za unos odgovora za "hard" -->
                  <v-row v-if="selectedDifficulty === 'hard'" class="align-center">
                    <v-col>
                      <v-text-field
                        v-model="userAnswers[index]"
                        label="Answer"
                        outlined
                      ></v-text-field>
                    </v-col>
    
                    <!-- Ikona za hint s hoverom -->
                    <v-col cols="2">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            v-bind="attrs"
                            v-on="on"
                            color="blue darken-2"
                          >
                            mdi-help-circle-outline
                          </v-icon>
                        </template>
                        <span>{{ question.hint }}</span> <!-- Prikaz hint-a za svako pitanje -->
                      </v-tooltip>
                    </v-col>
                  </v-row>
  
                  <!-- Gumb za 50:50 joker, prikaz samo za easy pitanja -->
                  <v-btn
                    v-if="selectedDifficulty === 'easy' && !usedJokers[index]"
                    @click="use5050Joker(index)"
                    color="orange darken-2"
                    class="mt-2"
                  >
                    50:50 Joker
                  </v-btn>
                </v-card>
              </div>
              <v-btn @click="submitQuiz" color="purple darken-2" class="mt-4" block>
                Submit
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedDifficulty: "easy", // Podrazumevano je "easy"
        questions: [], // Pitanja će biti ovde
        userAnswers: [], // Korisnički odgovori
        usedJokers: [], // Praćenje korištenja jokera za svako pitanje
        quizStarted: false, // Da li je kviz započet
        timeRemaining: 0, // Preostalo vreme
        timerInterval: null, // Interval za tajmer
      };
    },
    computed: {
      // Formatira preostalo vreme u minutama i sekundama
      formattedTime() {
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      },
    },
    methods: {
      // Metoda za promenu težine kviza
      selectDifficulty(difficulty) {
        this.selectedDifficulty = difficulty;
      },
  
      // Asinhrona funkcija za početak kviza
      async startQuiz() {
        try {
          this.quizStarted = true; // Oznacava da je kviz započet
          this.timeRemaining = this.selectedDifficulty === 'easy' ? 180 : 300; // 3 minute za easy, 5 za hard
          this.startTimer(); // Pokreće tajmer
  
          const response = await fetch(`http://localhost:3000/quiz2/questions?difficulty=${this.selectedDifficulty}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this.questions = data.questions; // Popuni pitanja
          this.userAnswers = Array(this.questions.length).fill(""); // Inicijalizuj prazne odgovore
          this.usedJokers = Array(this.questions.length).fill(false); // Inicijaliziraj korištenje jokera
        } catch (error) {
          console.error("Error:", error);
        }
      },
  
      // Funkcija za pokretanje tajmera
      startTimer() {
        this.timerInterval = setInterval(() => {
          if (this.timeRemaining > 0) {
            this.timeRemaining--;
          } else {
            clearInterval(this.timerInterval);
            this.submitQuiz(); // Automatski submit kada vreme istekne
          }
        }, 1000);
      },
  
      // Funkcija za korištenje 50:50 jokera
      use5050Joker(index) {
        const question = this.questions[index];
        if (question.options.length > 2) {
          const incorrectOptions = question.options.filter(option => option !== question.correctAnswer);
          const optionsToRemove = incorrectOptions.slice(0, 2); // Ukloni 2 netačna odgovora
  
          this.questions[index].filteredOptions = question.options.filter(option => !optionsToRemove.includes(option));
          this.usedJokers[index] = true; // Oznaci da je joker korišten za ovo pitanje
        }
      },
  
      // Asinhrona funkcija za slanje odgovora
      async submitQuiz() {
        try {
          clearInterval(this.timerInterval); // Zaustavi tajmer
          const response = await fetch("http://localhost:3000/quiz2/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ answers: this.userAnswers }),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          this.$router.push({ name: "quizresult", params: { score: data.score } });
        } catch (error) {
          console.error("Error:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .quiz-container {
    background-color: #000; /* Crna pozadina */
    padding: 20px;
  }
  
  .quiz-card {
    background-color: #fff; /* Bijela pozadina za kartice */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .v-btn {
    border-radius: 4px;
  }
  
  .difficulty-row {
    margin-bottom: 20px;
  }
  
  .v-card-subtitle {
    color: #000; /* Crna boja za subtitle */
  }
  
  .v-card-title {
    color: #000; /* Crna boja za naslov */
  }
  </style>
  