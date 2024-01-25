<template>
  <div class="register-container">
    <h2>Register</h2>
    <form @submit.prevent="submitForm">
      <div class="input-field">
        <label for="name">Ime</label>
        <input type="text" id="name" v-model="name" />
      </div>
      <div class="input-field">
        <label for="surname">Prezime</label>
        <input type="text" id="surname" v-model="surname" />
      </div>
      <div class="input-field">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="input-field">
        <label for="username">Korisničko ime</label>
        <input type="text" id="username" v-model="username" />
      </div>
      <div class="input-field">
        <label for="password">Lozinka</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button type="submit">Registriraj se</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      username: '',
      password: ''
    };
  },
  methods: {
    submitForm() {
      // Implementirajte logiku za slanje forme

      // Nakon uspješnog slanja forme, navigirajte na početnu stranicu
      this.$router.push({ name: 'home' }); // 'home' je ime rute definirano u Vue Routeru
      this.$router.push({ name: 'login' });
    }
  }
};
</script>

<style scoped>
.register-container {
  background-color: purple;
  padding: 20px;
  color: white;
}

h2 {
  text-align: left;
}

.input-field {
  margin-bottom: 10px;
}

.input-field input {
  background-color: white;
  margin-top: 5px;
  padding: 5px;
}
</style>
