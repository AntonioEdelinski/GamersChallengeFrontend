<template>
  <v-container fluid class="register-container">
    <v-row justify="center" align="center" style="min-height: 100vh;">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-6 register-card" outlined>
          <v-card-title class="text-h5 text-center">Register</v-card-title>
          <v-form @submit.prevent="register">
            <v-text-field
              v-model="username"
              label="Username"
              outlined
              :rules="usernameRules"
              required
              autofocus
            ></v-text-field>
            <v-text-field
              v-model="email"
              label="Email"
              outlined
              :rules="emailRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              outlined
              :rules="passwordRules"
              :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="togglePasswordVisibility"
              required
            ></v-text-field>
            <v-btn type="submit" color="primary" class="mt-4" block>
              Register
            </v-btn>
            <v-alert v-if="errorMessage" type="error" class="mt-4">
              {{ errorMessage }}
            </v-alert>
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
      username: '',
      email: '',
      password: '',
      showPassword: false,
      errorMessage: '',
      usernameRules: [
        v => !!v || 'Username is required',
        v => v.length >= 3 || 'Username must be at least 3 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be at least 6 characters',
      ],
    };
  },
  methods: {
    async register() {
      try {
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Registration successful", data);
          this.errorMessage = '';
          // Redirect to login page
          this.$router.push('/login');
        } else {
          const error = await response.json();
          this.errorMessage = error.error || 'Registration failed';
          console.error("Registration failed", error);
        }
      } catch (err) {
        this.errorMessage = 'An error occurred. Please try again.';
        console.error("Error during registration", err);
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style scoped>
/* Stilizovanje */
.register-container {
  background-color: #000000; /* Crna pozadina za cijelu stranicu */
  color: #ffffff; /* Bijela boja teksta za kontrast */
}

.register-card {
  background-color: #ffffff; /* Bijela pozadina za karticu */
  border: 1px solid #ddd; /* Svijetlosivi okvir oko kartice */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Blaga senka */
  border-radius: 8px; /* Zaobljeni uglovi */
}

.v-btn {
  border-radius: 4px;
  background-color: #6200ea; /* Violetna boja dugmeta */
  color: #ffffff; /* Svetla boja teksta na dugmetu */
}

.v-btn:hover {
  background-color: #3700b3; /* Tamnija boja pri prelazu miša */
}

.v-alert {
  background-color: #ffebee; /* Svetlo crvena pozadina za alert */
  color: #d32f2f; /* Crvena boja teksta u alertu */
  border-radius: 4px;
}
</style>
