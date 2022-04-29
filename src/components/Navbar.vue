<template>
	<div>
		<b-navbar toggleable="lg" type="dark" variant="success">
			<b-navbar-brand @click="goHome" href="#">
				<!-- <b-icon-brightness-fill-high></b-icon-brightness-fill-high> -->
				READ:ME</b-navbar-brand>
			
			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
			
			<b-collapse id="nav-collapse" is-nav>
				
				<!--Right alligned nav items-->
				<b-navbar-nav class="ml-auto">
					<b-nav-item v-if="isLoggedIn" id="usr"><span class="email black-text">{{currentUser}}</span></b-nav-item>
					<b-nav-item v-if="isLoggedIn" @click="gotocart" active>Cart</b-nav-item>
					<b-nav-item v-if="!isLoggedIn" @click="gotologin" active>Login</b-nav-item>
					<b-nav-item v-if="!isLoggedIn" @click="gotoregister" active>Register</b-nav-item>
					<b-nav-item v-if="isLoggedIn" @click="gotochat" active>Chat</b-nav-item>
					<b-nav-item @click="flashlightFunc" active>Flashlight</b-nav-item>
					<button v-if="isLoggedIn" v-on:click="logout" class="btn black">Logout</button>
					<b-nav-item-dropdown right>
						<!--Using 'button-content' slot-->
						<template v-slot:button-content>
							<em>Admin</em>
						</template>
						<b-dropdown-item v-b-modal.modal-1>Sign in</b-dropdown-item>
						
					</b-nav-item-dropdown>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
		
		 
		
		<div>
		
		
			<b-modal hide-footer ref="my-modal" id="modal-1" title="Admin">
				<b-form @submit="onSubmit">
				<b-form-group
					id="input-group-1"
					label="User:"
					label-for="input-1"
					
				>
					<b-form-input
						id="input-1"
						v-model="form.user"
						type="text"
						required
						placeholder="Enter User"
					></b-form-input>
				</b-form-group>
				
				<b-form-group id="input-group-2" label="Password:" label-for="input-2">
					<b-form-input
						id="input-2"
						v-model="form.pass"
						type="password"
						required
						placeholder="Enter Password"
						></b-form-input>
				</b-form-group>
				
				
				
				<b-button type="submit" block variant="primary">Submit</b-button>
				
				</b-form>
			
			
			</b-modal>
		</div>
	</div>
</template>


<script>
import firebase from 'firebase/compat/app';
export default {
	data() {
		return {
			isLoggedIn: false,
      		currentUser: false,
			cart:'',
			form: {
				user:'',
				pass:''
			}
		}
	},
	created(){
		if (firebase.auth().currentUser) {
      		this.isLoggedIn = true;
      		this.currentUser = firebase.auth().currentUser.email;
    	};
		if(JSON.parse(localStorage.getItem('products'))) {
			this.cart = JSON.parse(localStorage.getItem('products'))
		} else {
				return
		}
	},
	methods:{
		logout: function() {
      	firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
		},
		gotocart(){
			this.$router.push('/cart')
		},
		gotologin(){
			this.$router.push('/login')
		},
		gotoregister(){
			this.$router.push('/register')
		},
		goHome(){
			this.$router.push('/')
		},
		gotochat(){
			this.$router.push('/RealTimeChat')
		},
		flashlightFunc(){
			//have a console on mobile
const consoleOutput = document.getElementById("console");
const log = function (msg) {
  consoleOutput.innerText = `${consoleOutput.innerText}\n${msg}`;
  console.log(msg);
}

//Test browser support
const SUPPORTS_MEDIA_DEVICES = 'mediaDevices' in navigator;

if (SUPPORTS_MEDIA_DEVICES) {
  //Get the environment camera (usually the second one)
  navigator.mediaDevices.enumerateDevices().then(devices => {

    const cameras = devices.filter((device) => device.kind === 'videoinput');

    if (cameras.length === 0) {
      log('No camera found on this device.');
    }
    // Create stream and get video track
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',
      }
    }).then(stream => {
      const track = stream.getVideoTracks()[0];

      //Create image capture object and get camera capabilities
      const imageCapture = new ImageCapture(track)
      imageCapture.getPhotoCapabilities().then(capabilities => {
        //let there be light!
        const btn = document.querySelector('.switch');
        const torchSupported = !!capabilities.torch || (
          'fillLightMode' in capabilities &&
          capabilities.fillLightMode.length != 0 &&
          capabilities.fillLightMode != 'none'
        );

        if (torchSupported) {
          let torch = false;
          btn.addEventListener('click', function (e) {
            try {
              track.applyConstraints({
                advanced: [{
                  torch: (torch = !torch)
                }]
              });
            } catch (err) {
              log(err);
            }
          });
        } else {
          log("No torch found");
        }
      }).catch(log);
    }).catch(log);
  }).catch(log);

  //The light will be on as long the track exists
}
					},
		onSubmit(e){
			e.preventDefault();
			if(this.form.user=='admin' && this.form.pass=='456789'){
				this.$refs['my-modal'].hide()
				this.$router.push('/admin')
				localStorage.setItem('admin', JSON.stringify('true'))
			} else {
				return false;
			}
		}
	}
}
</script>


<style>

</style>