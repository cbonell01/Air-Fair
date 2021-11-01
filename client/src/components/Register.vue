<template>
  <div>
  <h1>Air-Fair Registration</h1>
    <div class="container">
      <div class="row">
        <div class="panel panel-primary">
          <div class="panel-body">
            <form method="POST" action="#" role="form">
               First Name:<br /><input type="text" id="first" maxlength="50" class="form-control"><br /><br />
               Last Name:<br /><input type="text" id="last" maxlength="50" class="form-control"><br /><br />
               Email Name:<br /><input type="text" id="email" maxlength="50" class="form-control"><br /><br />
               Re-enter Email:<br /><input type="text" id="email2" maxlength="50" class="form-control"><br /><br />
               Password:<br /><input type="text" id="password" maxlength="50" class="form-control"><br /><br />
               Re-enter Password:<br /><input type="password2" id="first" maxlength="50" class="form-control"><br /><br />
            </form>

              <div class="form-group">
                <button id="signupSubmit" type="submit" class="btn btn-info btn-block">Create your account</button>
              </div>
              <p class="form-group">By creating an account, you agree to our <a href="#">Terms of Use</a> and our <a href="#">Privacy Policy</a>.</p>
              <hr>
              <p></p>Already have an account? <a href="#" @click="goToLogin()">Sign in</a><p></p>
              <p></p><a href="#" @click="goToHome()">Home</a><p></p>
            
          </div>
        </div>
      </div>
    </div>
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

div {
  background-color: #c3e7fd;
  padding: 10px;
}

button {
  background-color: rgb(83, 83, 114);
  border: 1px solid #CCF;
  border-radius: 10px;
  color: #FFFFFF
}

input {
  width: 25%;
  height: 25px;
  padding: 5px 20px;
  display: inline-block;
  border: 1px solid #CCF;
  border-radius: 10px;
  box-sizing: border-box;
}

label+input {
  width: 30%;
  margin: 0 30% 0 4%;
}

input+input {
  float: right;
}

</style>


