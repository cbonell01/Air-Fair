<template>
  <div>
    <h1>Air-Fair Registration</h1>
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <form>
<!--          <input type="text" id="firstName" class="fadeIn second" name="firstName" v-model="registrationInfo.firstName"
                 placeholder="First Name"
                 maxlength="20">
          <input type="text" id="lastName" class="fadeIn third" name="lastName" v-model="registrationInfo.lastName"
                 placeholder="Last Name" maxlength="20">-->
          <input type="text" id="email" class="fadeIn fourth" name="email" v-model="registrationInfo.email"
                 placeholder="Email" maxlength="50">
          <input type="text" id="emailConfirm" class="fadeIn fourth" name="emailConfirm"
                 v-model="registrationInfo.emailConfirm" placeholder="Confirm Email"
                 maxlength="50">
          <input type="text" id="phoneNumber" class="fadeIn fourth" name="phoneNumber"
                 v-model="registrationInfo.phoneNumber" placeholder="Phone Number"
                 maxlength="50">
          <input type="password" id="password" class="fadeIn fifth" name="password" v-model="registrationInfo.password"
                 placeholder="Password" maxlength="50">
          <input type="password" id="passwordConfirm" class="fadeIn fifth" name="passwordConfirm"
                 v-model="registrationInfo.passwordConfirm"
                 placeholder="Confirm Password"
                 maxlength="50">
          <input type="text" id="company" class="fadeIn fifth" name="passwordConfirm"
                 v-model="registrationInfo.companyName"
                 placeholder="Company Name"
                 maxlength="50">
          <input type="button" class="fadeIn fifth" v-on:click="register()" value="Create your account">
        </form>

        <div class="formFooter">
          <a class="underlineHover" href="#" @click="goToLogin()">Already have an account?</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      registrationInfo: {
        phoneNumber: '',
        email: '',
        emailConfirm: '',
        password: '',
        passwordConfirm: '',
        companyName: ''
      }
    }
  },
  methods: {
    goToLogin() {
      this.$router.push('/Login');
    },
    register() {
      if(this.registrationInfo.email !== this.registrationInfo.emailConfirm) {
        alert('Email must match')
      }

      if(this.registrationInfo.password !== this.registrationInfo.passwordConfirm) {
        alert('Password must match')
      }
      let registrationMessage

      let config = {
        headers: {
          username: this.registrationInfo.email,
          password: this.registrationInfo.password,
          company: this.registrationInfo.companyName,
          phone: this.registrationInfo.phoneNumber
        }
      }
      console.log(this.registrationInfo.phoneNumber)
      axios.get('http://localhost:8081/Register/', config)
        .then((response) => {
          registrationMessage = response.data

          if (registrationMessage === 'match') {

          } else {
            console.log((registrationMessage))
          }
        })
        .catch((error) => {
          console.log(error)
        })

      this.goToLogin()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../assets/style/main.css';
</style>


