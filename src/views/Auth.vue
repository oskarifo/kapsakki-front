<template>
  <div id="auth">
    <div class="bg"></div>
    <div class="login-form">
      <img class="logo" src="../assets/logo.png" />
      <span class="md-display-3">Kapsäkki</span>
      <md-button class="md-primary" @click="login()">Kirjaudu sisään</md-button>
    </div>
    <img class="author" src="../assets/default.svg">
  </div> 
</template>

<script>
export default {
  methods: {
    login() {
      this.$auth.login();
    }
  }
}
</script>

<style lang="scss" scoped>
  #auth {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 50px;
    img.author {
      position: fixed;
      bottom: -50px;
      right: 0;
      width: 150px;
      z-index: 10;
    }
    div.bg {
      position: fixed;
      width: 100%;
      height: 100%;
      background-image: url('../assets/background.png');
      background-position: center;
      filter: blur(8px);
    }
    div.login-form {
      background-color: rgba(0,0,0,0.5);
      border-radius: 2px;
      padding: 50px 15px 50px 15px;
      filter: blur(0px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span.md-display-3 {
        font-family: 'Montserrat Subrayada', sans-serif;
        margin-bottom: 0;
        padding-bottom: 0;
      }
      img.logo {
        width: 150px;
        margin: 15px;
        box-sizing: border-box;
      }
    }
  }
</style>
