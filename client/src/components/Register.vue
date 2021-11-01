<template>
  <div>
  <h1>Air-Fair Registration</h1>
    <div class="container">
      <div class="row">
        <div class="panel panel-primary">
          <div class="panel-body">
            <form method="POST" action="#" role="form">
              <div class="form-group">
                <h2>Create account</h2>
              </div>
              <div class="form-group">
                <label class="control-label" for="signupName">Your name</label>
                <input id="signupName" type="text" maxlength="50" class="form-control">
              </div>
              <div class="form-group">
                <label class="control-label" for="signupEmail">Email</label>
                <input id="signupEmail" type="email" maxlength="50" class="form-control">
              </div>
              <div class="form-group">
                <label class="control-label" for="signupEmailagain">Email again</label>
                <input id="signupEmailagain" type="email" maxlength="50" class="form-control">
              </div>
              <div class="form-group">
                <label class="control-label" for="signupPassword">Password</label>
                <input id="signupPassword" type="password" maxlength="25" class="form-control" placeholder="at least 6 characters" length="40">
              </div>
              <div class="form-group">
                <label class="control-label" for="signupPasswordagain">Password again</label>
                <input id="signupPasswordagain" type="password" maxlength="25" class="form-control">
              </div>
              <div class="form-group">
                <button id="signupSubmit" type="submit" class="btn btn-info btn-block">Create your account</button>
              </div>
              <p class="form-group">By creating an account, you agree to our <a href="#">Terms of Use</a> and our <a href="#">Privacy Policy</a>.</p>
              <hr>
              <p></p>Already have an account? <a href="#" @click="goToLogin()">Sign in</a><p></p>
            </form>
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
