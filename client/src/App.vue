<template>
  <div>
    <lable for="input_origin">Origin</lable>
    <input id="input_origin" type="text">
    <lable for="input_dest">Destination</lable>
    <input id="input_dest" type="text">
    <table>
      <tr>
        <td>Type</td>
        <td>Identity</td>
        <td>Air Port Name</td>
        <td>Latitude</td>
        <td>Longitude</td>
        <td>Altitude</td>
      </tr>
      <tr v-for="node in Flight.route.nodes" v-bind:key="node.id">
        <td>{{node.type}}</td>
        <td>{{node.ident}}</td>
        <td>{{node.lat}}</td>
        <td>{{node.lon}}</td>
        <td>{{node.lat}}</td>
        <td>{{node.alt}}</td>
      </tr>
    </table>
    <a href="https://flightplandatabase.com"><img src="https://static.flightplandatabase.com/images/data-banner/light.min.png" alt="Data from the Flight Plan Database"></a>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
export default {
  name: 'App',

  data () {
    return {Flight: null}
  },
  mounted () {
    Vue.axios.get('https://api.flightplandatabase.com/plan/4648179')
      .then((resp) => {
        this.Flight = resp.data
        console.warn(resp.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
