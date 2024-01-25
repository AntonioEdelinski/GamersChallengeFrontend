<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-8" outlined>
          <v-card-title class="text-h6">Register</v-card-title>
          <v-form @submit.prevent="submitForm">
            <v-text-field v-model="name" label="Ime" dense outlined></v-text-field>
            <v-text-field v-model="surname" label="Prezime" dense outlined></v-text-field>
            <v-text-field v-model="email" label="Email" dense :rules="[rules.required, rules.email]" outlined></v-text-field>
            <v-text-field v-model="username" label="Korisničko ime" dense outlined></v-text-field>
            <v-text-field
              v-model="password"
              label="Lozinka"
              dense
              :append-icon="showIcon ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="showIcon ? 'text' : 'password'"
              outlined
            ></v-text-field>
            <v-btn :disabled="isButtonDisabled" color="green darken-2" outlined @click="registerUser">REGISTER</v-btn>
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
      name: '',
      surname: '',
      email: '',
      username: '',
      password: '',
      showIcon: false,
      rules: {
        required: value => !!value || 'Required.',
        email: value => /.+@.+\..+/.test(value) || 'E-mail must be valid',
        min: v => v.length >= 8 || 'Min 8 characters',
      },
    };
  },
  methods: {
    submitForm() {
      // Implementirajte logiku za slanje forme

      // Nakon uspješnog slanja forme, navigirajte na početnu stranicu
      this.$router.push({ name: 'home' }); // 'home' je ime rute definirano u Vue Routeru
      this.$router.push({ name: 'login' });
    },
    registerUser() {
      // Logika za registraciju korisnika
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: black;
  border: 1px solid black; /* Dodan okvir oko cijelog bloka */
}

.text-h6 {
  text-align: left;
}

.v-text-field {
  margin-bottom: 10px;
}
</style>
