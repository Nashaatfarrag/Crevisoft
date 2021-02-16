<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>
<style>
@font-face {
  font-family: myFirstFont;
  src: url("./font/Tajawal-Regular.ttf");
}

* {
  font-family: myFirstFont;
}
</style>
