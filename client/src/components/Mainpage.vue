<template>
    <div>
        <h1>Air-Fair</h1>
    
    <ul>
        <li><a href="#" @click="goToHome()" id="Home">Home</a></li>
        <li><a href="#" @click="goToLogin()">Login</a></li>
        <li><a href="#" @click="goToRegister()">Register</a></li>
        <li><a href="#">Flight Plans</a></li>
        <li><a href="#">Reports</a></li>
        <li><a href="#" @click="goToHome()">About</a></li>
        <input type="text" placeholder="Search..">
    </ul>
    </div>
</template>

<script>
export default {
  data () {
    return {
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
  }
}
</script>

<style scoped>

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    text-align: left;
    margin: 25px 10px;
    background-color: #c3e7fd;
    overflow: hidden;
}

li {
    float: left;
}

a {
    display: block;
    padding: 10px;
    background-color: #c3e7fd;
    color: #000000;
}

a:link {
    text-decoration: none;
}

a:visited {
    text-decoration: none;
}

a:hover {
    background-color: #0066CC;
    color: #FFFFFF;
}

input {
  position: relative;
  top: 3px;
  right: 10px;
  width: 25%;
  height: 25px;
  padding: 15px 20px;
  display: inline-block;
  border: 1px solid #CCF;
  box-sizing: border-box;
  float: right;
}



</style>