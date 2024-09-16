<template>
  <v-container fluid class="login-container">
    <v-row justify="center" align="center" style="min-height: 100vh;">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-6 login-card" outlined>
          <v-card-title class="text-h5 text-center">Login</v-card-title>
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="email"
              label="Email"
              outlined
              prepend-icon="mdi-email"
              :rules="emailRules"
              autofocus
              class="text-field"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              outlined
              prepend-icon="mdi-lock"
              :rules="passwordRules"
              :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="togglePasswordVisibility"
              class="text-field"
            ></v-text-field>

            <!-- New Registration link below password field -->
            <p class="text-center mt-4">
              Nemaš račun? 
              <v-btn text color="white" @click="$router.push('/register')" class="register-link">
                Registriraj se
              </v-btn>
            </p>

            <v-btn type="submit" color="primary" class="mt-4" block>
              Login
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
      email: '',
      password: '',
      showPassword: false,
      errorMessage: '',
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
    async login() {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Login successful", data.token);

          // Save JWT token in localStorage
          localStorage.setItem('authToken', data.token);

          this.errorMessage = '';

          // Redirect user to Homeafterlogin
          this.$router.push({ name: 'homeafterlogin' });
        } else {
          const error = await response.json();
          this.errorMessage = error.error || 'Login failed';
          console.error("Login failed", error);
        }
      } catch (err) {
        this.errorMessage = 'An error occurred. Please try again.';
        console.error("Error during login", err);
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
.login-container {
  background-color: #000000; /* Crna pozadina za cijelu stranicu */
  color: #ffffff; /* Bijela boja teksta za kontrast */
}

.login-card {
  background-color: #ffffff; /* Bijela pozadina za karticu */
  border: 1px solid #ddd; /* Svijetlosivi okvir oko kartice */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Blaga senka */
  border-radius: 8px; /* Zaobljeni uglovi */
}

.text-field .v-input__control .v-input__slot {
  border-radius: 4px;
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

/* Styling for Registriraj se button */
.register-link {
  background-color: #ffffff !important; /* White background */
  color: #000000 !important; /* Black text */
  text-transform: none; /* Removes uppercase styling */
  font-weight: bold;
  border-radius: 4px;
  padding: 0 8px; /* Adds some padding around the text */
}

.register-link:hover {
  background-color: #f0f0f0 !important; /* Lighter shade on hover */
}
</style>
