<template>
  <div>
  <navbar />

    <div class="container">
    <br/>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header"  align="center"><h4>Register</h4></div>
          <br/>
          <form action="index.html">
            <div class="input-field" align="center">
              <i class="material-icons prefix">email</i>
              <input type="email" id="email" v-model="email" placeholder="Email Address">
              <label for="email" ></label>
            </div>
            <div class="input-field" align="center">
              <i class="material-icons prefix">lock</i>
              <input type="password" id="password" v-model="password" placeholder="Password">
              <label for="password"></label>
            </div>
            <br/>
            <div align="center">
            <b-button variant="success" v-on:click="register" >Register</b-button>
            </div>
            <br/>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import navbar from '@/components/Navbar.vue'
export default {
  name: 'register',
  components: {
        navbar
    },
  data: function() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    register: function(e) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            // console.log(user);
            alert(`Account Created for ${user.email}`);
            this.$router.go({ path: this.$router.path });
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    }
  }
};
</script>z