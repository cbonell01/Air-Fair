<template>
  <div>
    <img v-bind:src="logo" alt="">
    <h1>Air-Fair Login</h1>

    <div class="wrapper fadeInDown">
      <div id="formContent">
        <form>
          <input type="text" id="login" class="fadeIn second" name="email" v-model="loginInfo.email"
                 placeholder="Username">
          <input type="password" id="password" class="fadeIn third" name="pass" v-model="loginInfo.pass"
                 placeholder="Password">
          <input type="button" class="fadeIn fourth" v-on:click="login()" value="Log In">
        </form>

        <div class="formFooter">
          <a class="underlineHover" href="#">Forgot Password?</a>
        </div>
        <div class="formFooter">
          <a class="underlineHover" href="#" @click="goToRegister()">Need an Account?</a>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      loginInfo: {
        email: '',
        pass: ''
      }
    }
  },
  methods: {
    goToRegister() {
      this.$router.push('/Register');
    },
    goToMainpage() {
      this.$router.push('/Mainpage');
    },
    login() {
      if (this.loginInfo.email !== '' || this.loginInfo.pass !== '') {
        let config = {
          headers: {
            username: this.loginInfo.email,
            password: this.loginInfo.pass
          }
        }

        let returnedData = null
        axios.get('http://localhost:8081/GetLogin/', config)
          .then((response) => {
            returnedData = response.data

            if (returnedData === 'match') {
              this.goToMainpage()
            } else {
              console.log((returnedData))
            }
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        alert('Username or password is empty');
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
  @import '../assets/style/main.css';
</style>

