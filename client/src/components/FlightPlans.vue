<template>
   <div>
    <ul>
        <li><img v-bind:src="logo" width = "200" height = "50" align = "left" @click="goToHome()"></li>
        <li><a href="#" @click="goToHome()" id="Home">Home</a></li>
        <li><a href="#" @click="goToLogin()" id="Login">Login</a></li>
        <li><a href="#" @click="goToRegister()" id="Register">Register</a></li>
        <li><a href="#" @click="goToFlightPlans()" id="Flightplans">Flight Plans</a></li>
        <li><a href="#" @click="goToReports()" id="Reports">Reports</a></li>
        <li><a href="#" @click="goToAbout()" id="About">About</a></li>
        <input type="text" placeholder="Search..">
    </ul>
    <body>Flight Plans</body>
    <br>
    <p>
        Here is where flight plan information will be displayed.
    </p>
    </div>
</template>

<script>
export default {
  data () {
    return {
        logo: require('../assets/mainLogo.jpg'),
    }
  },
  methods: {
    goToLogin(){
      this.$router.push('/Login');
    },
    goToHome(){
      this.$router.push('/mainpage');
    },
    goToRegister() {
      this.$router.push('/Register');
    },
    goToFlightPlans() {
      this.$router.push('/flightplans');
    },
    goToReports() {
      this.$router.push('/reports');
    },
    goToAbout() {
      this.$router.push('/About');
    }
  }
}
</script>

<style scoped>

ul {
    position: relative;
    top: 110px;
    list-style-type: none;
    margin: 0;
    padding: 0;
    text-align: left;
    margin: 25px 0px;
    background-color: #66a2ba;
    overflow: hidden;
}

li {
    float: left;
}

a {
    display: block;
    padding: 10px;
    background-color: #66a2ba;
    color: #273945;
    font-size: 20px;
    position: relative;
    top: 3px;
    font-family: Verdana, Helvetica, sans-serif;
}

a:link {
    text-decoration: none;
}

a:visited {
    text-decoration: none;
}

a:hover {
    background-color: #243a47;
    color: #FFFFFF;
}

input {
  position: relative;
  top: 9px;
  right: 10px;
  width: 25%;
  height: 25px;
  padding: 15px 20px;
  display: inline-block;
  border: 1px solid #CCF;
  box-sizing: border-box;
  float: right;
}

p {
    position: relative;
    padding: 15px 20px;
    display: inline-block;
    float: none;
    margin: 20px;
    padding: 70px;
    font-size: 24px;
}

body {
    position: relative;
    font-size: 24px;
}

</style>