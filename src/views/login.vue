<template>
    <v-container fluid class="blue darken-3 white--text">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="pa-8" color="transparent" outlined>
            <v-card-title class="text-h6">Login</v-card-title>
            <v-form @submit.prevent="login">
              <v-text-field v-model="email" label="Email" outlined></v-text-field>
              <v-text-field v-model="password" label="Password" type="password" outlined></v-text-field>
              <v-btn type="submit" color="green darken-2">Login</v-btn>
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
        password: ''
      };
    },
    methods: {
      login() {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
  
          if (user.email === this.email && user.password === this.password) {
            console.log('Login successful:', user);
          } else {
            console.error('Invalid credentials');
          }
        } else {
          console.error('User not found');
        }
      }
    }
  };
  </script>
  
  <style>
  </style>
  