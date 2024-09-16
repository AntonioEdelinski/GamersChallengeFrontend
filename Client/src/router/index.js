import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Login from '../views/login.vue';
import register from '@/views/register.vue';
import HomeAfterLogin from '../views/Homeafterlogin.vue';
import Quiz from '../views/quiz.vue';
import QuizResult from '../views/quizresult.vue';
import Profile from '../views/Profile.vue'; // Uvezi novu stranicu profila
import Quiz2 from '@/views/quiz2.vue';
import quizresult2 from '@/views/quizresult2.vue';
import Quizresult2 from '@/views/quizresult2.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: register,
  },
  {
    path: '/homeafterlogin',
    name: 'homeafterlogin',
    component: HomeAfterLogin,
  },
  {
    path: '/quiz1',
    name: 'quiz',
    component: Quiz,
  },
  {
    path: '/quiz2',
    name: 'quiz2',
    component: Quiz2,
  },
  {
    path: '/quizresult',
    name: 'quizresult',
    component: QuizResult,
  },
  {
    path: '/quizresult2',
    name: 'quizresult2',
    componen: Quizresult2
  },
  {
    path: '/profile', // Nova ruta za profil
    name: 'profile',
    component: Profile,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
