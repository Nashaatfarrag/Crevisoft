<template>
  <div>
    <div class="brand">
      <router-link to="/">
        <v-img contain height="100" src="../assets/logo.png"></v-img>
      </router-link>
    </div>

    <v-container style="color: white">
      <div class="lower">
        <div class="center hideSmaller">
          <v-img contain height="80" src="../assets/logox.png"></v-img>
        </div>
        <v-row class="text-center">
          <v-col class="hideSmaller"> </v-col>
          <v-col class="hideSmaller"> </v-col>
          <v-col @click="hello" cols="4" md="2" class="myNavbar">
            <router-link
              
              style="color: white; font-family: myFirstFont"
              to="/"
            >
              الرئيسية</router-link
            >
          </v-col>
          <v-col md="2" class="myNavbar">
            <router-link
              style="color: white; font-family: myFirstFont;font-decoration:none"
              to="/about"
              >حول</router-link
            ></v-col
          >
          <v-col class="hideSmaller"> </v-col>
          <v-col class="myNavbar hideSmaller"></v-col>
          <v-col cols="4" md="2" class="myNavbar">
            <router-link
              style="color: white; font-family: myFirstFont;font-decoration:none"
              to="/QandA"
              >الأسئلة الشائعة</router-link
            ></v-col
          >

          <v-col class="hideSmaller"></v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  methods: {
    hello() {
      console.log("hello")
      this.$router.go(this.$router.currentRoute);
    },
  },
};
</script>
<style scoped>
/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (max-width: 600px) {
  .hideSmaller {
    display: none;
  }

  .brand {
    position: absolute;
    top: 100px;
    left: 22%;
    margin-bottom: 10px;
  }
  .lower {
    margin-top: 100px;
  }
}

a:link {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}

.brand {
  top: 10px;

  position: absolute;
}
.center {
  background-color: #96541e;
  position: absolute;
  top: 0;
  left: 35%;
  margin-top: -10px;
  /* margin: auto; */
  width: 15vw;
  min-width: 100px;
  border-left: 1px solid white;
  border-right: 1px solid white;
  border-bottom: 1px solid white;
  border-radius: 10px;
  padding: 20px;
}
.myNavbar {
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  /* max-height: 60px; */
}
</style>
