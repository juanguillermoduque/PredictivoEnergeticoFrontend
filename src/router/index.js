import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DataStepByStep from '../components/DataStepByStep.vue'
import PredictionForm from '../components/PredictionForm.vue'
import Visualization from '../components/Visualization.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/step-by-step',
      name: 'step-by-step',
      component: DataStepByStep
    },
    {
      path: '/predict',
      name: 'predict',
      component: PredictionForm
    },
    {
      path: '/visualize',
      name: 'visualize',
      component: Visualization
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router 