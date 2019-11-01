import Vue from 'vue'
import App from './App.vue'
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";
import VueRouter from 'vue-router'
import router from './router'

Vue.config.productionTip = false

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

Vue.use(VueApollo);
Vue.use(VueRouter)

new Vue({
  apolloProvider,
  router,
  render: h => h(App)
}).$mount('#app')
