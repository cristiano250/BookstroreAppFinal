<template>
  <div>
<navbar />
    <div class="container">
    <br/>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header"  align="center"><h4>Login</h4></div>
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
            <b-button variant="success" v-on:click="login" >Login</b-button>
            </div>
            <br/>
          </form>
          <br/>

          <b-container>
          <b-row>
          
          <b-col>
            <p align="center">
            <img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/google_original_logo_icon_146496.png" class="img-fluid" alt="Responsive image" style="width:20%">
            <br>
            <b-button type="button" @click="socialLoginGmail" variant="success">
            Login via Gmail Account
            </b-button>
            </p>
          </b-col>

          <b-col>
            <p align="center">
            <img src="http://fabrykapalet.com/wp-content/uploads/2017/02/logo-facebook.png" class="img-fluid" alt="Responsive image" style="width:20%">
            <br/>
            <b-button type="button" @click="socialLoginFacebook" variant="success">
            Login via Facebook
            </b-button>
            </p>
          </b-col>
          </b-row>
          </b-container>

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
  name: 'login',
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
    login: function(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`You are logged in as ${user.email}`);
            this.$router.go({ path: this.$router.path });
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    },
    socialLoginGmail(){
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider).then((result)  => {
          alert('successfully logged in with google account !')
          this.$router.push('/')
      })
      .catch(err => {
          alert('Error logging ..'+ err.message)
          });
    },
    socialLoginFacebook(){
      const provider = new firebase.auth.FacebookAuthProvider();
      provider.setCustomParameters({
      'display': 'popup'
      });
      
      firebase.auth().signInWithPopup(provider).then((result)  => {
          const user = result.user;
          const credential = FacebookAuthProvider.credentialFromResult(result);
          const accessToken = credential.accessToken;
          alert('Użytkownik zalogowany poprzez konto facebook !')
          this.$router.push('/')
      })
      .catch(err => {
          alert('Błąd logowania ..'+ err.message)
          });
    }
    
  }
};
</script>

<style scoped>
</style>