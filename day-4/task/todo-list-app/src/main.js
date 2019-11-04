import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";

Vue.config.productionTip = false

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

Vue.use(VueApollo);

new Vue({
  vuetify,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
