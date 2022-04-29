<template>
  <div>
  <navbar />
    <!-- Login section -->
  <div id="app1">
    <!-- Login section -->
   <div class="login mt-5" v-if="!name">
    <h3 class="mt-2">Join our Chat</h3>
    <label for="username"></label>
    <br />
    <input class="mb-3;" type="text" v-model="userName" placeholder="Insert your name" style="text-align:center"/>

    <div align="center" style="margin-top:1rem">
    <button class="btn btn-primary" @click="updateUsername">Join Chat</button>
   </div>
      </div>
   
  <!-- <div class="message-body mt-3" v-else>
      <h3>Chat</h3>
      <h5>Welcome {{ name }}!</h5>
     ...........
    </div>
    <div class="login mt-5" v-if="!name">
     ..................
    </div> -->
    <div class="message-body mt-3" v-else>
      <h3>Chat</h3>
      <h5>Welcome {{ name }}!</h5>
      <div class="card">
        <div class="card-body">
          <div
            class="border pl-2 pt-1 ml-2 message-text mb-2"
            v-for="message in messages"
            :key="message"
          >
            <span class="mg-text">{{ message.username }}</span>
            <p class="message pt-1">{{ message.text }}</p>
          </div>
        </div>
      </div>
      <input v-model="showMessage" type="text" class="mt-3 mr-2 pl-2 pr-2" />
      <div align="center" style="margin-top:1rem">
      <button class="btn btn-primary" @click="sendMessage">Send</button>
    </div>
    </div>
  </div>

  </div>
</template>

<script>
import {realtimeDb} from '@/firebase'
import navbar from '@/components/Navbar.vue'
export default {
  name: "RealTimeChat",
  components: {
        navbar
    },
  data() {
    return {
      userName: "",
      name: "",
      showMessage: "",
      messages: []
    };
  },
  methods: {
    updateUsername() {
      this.name = this.userName;
      console.log(this.userName);
      this.userName = "";
    },
    sendMessage() {
      const message = {
        text: this.showMessage,
        username: this.name
      };  
      realtimeDb.ref("messages").push(message);
      this.showMessage = "";
    }
  },
  mounted() {
    let viewMessage = this;
    const itemsRef = realtimeDb.ref("messages");
    itemsRef.on("value", snapshot => {
      let data = snapshot.val();
      let messages = [];
      Object.keys(data).forEach(key => {
        messages.push({
          id: key,
          username: data[key].username,
          text: data[key].text
        });
      });
      viewMessage.messages = messages;
    });
  }
  
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons");
#app1 {
  font-family: "Roboto", sans-serif;
  font-size: 18px;
}
.login {
  background: #fff;
  width: 40%;
  height: 50vh;
  margin: auto;
  padding-left: 20px;
  padding-right: 20px;
}
h3 {
  font-size: 30px;
  text-align: center;
}
input {
  width: 100%;
  border-radius: 4px;
  border: 1px solid rgb(156, 156, 156);
  padding-left: 2px;
  padding-right: 2px;
}
.message-body {
  width: 40%;
  height: 80vh;
  margin: auto;
}
.message-text {
  min-width: 10%;
  border-radius: 4px;
}
.message {
  font-size: 14px;
}
.mg-text {
  color: rgb(0, 195, 255);
  font-weight: bolder;
}
.message-body input {
  width: 100%;
  border-radius: 4px;
  border: 1px solid rgb(156, 156, 156);
  height: 6vh;
  padding-left: 2px;
  padding-right: 2px;
}
</style>