import Vue from 'vue'
import Router from 'vue-router'
import tableInput from './../components/table.vue'
import textArea from './../components/textarea.vue'

Vue.use(Router)
const route = new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect:'/table'
    },
    {
      path:'/table',
      component:tableInput
    },
    {
      path:'/textarea',
      component:textArea
    }
  ]
});
export default route;
