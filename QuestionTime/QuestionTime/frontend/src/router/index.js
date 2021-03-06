import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Question from "../views/Question.vue";
import NotFound from "../views/NotFound.vue";
import QuestionEditor from "../views/QuestionEditor.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path:'/question/:slug',
    name: "question",
    component: Question,
    props: true
  },
  {
    path: '/question/ask/:slug?',
    name: 'question-editor',
    component: QuestionEditor

  },
  {
    path: '*',
    name:'page-not-found',
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  //base: process.env.BASE_URL,
  routes
});

export default router;
