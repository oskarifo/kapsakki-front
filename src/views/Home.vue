<template>
  <div id="home">
    <router-view class="content"/>
    <BottomBar>
      <md-bottom-bar-item to="/lists" id="bottom-bar-item-home" md-label="Listat" md-icon="list"></md-bottom-bar-item>
      <md-bottom-bar-item to="/profile" id="bottom-bar-item-pages" md-label="Käyttäjä" md-icon="face"></md-bottom-bar-item>
    </BottomBar>
  </div>
</template>

<script>
import BottomBar from '@/components/common/BottomBar';

export default {
  name: 'home',
  components: {
    BottomBar
  },
  data() {
    return {
      showSnackbar: false,
    }
  },
  mounted() {
    this.$rest.register()
    .then(() => {})
    .catch((err) => console.log(err))
  }
}
</script>

<style lang="scss" scoped>
  #home {
    max-height: 100vh;
    margin-bottom: 100px;
    display: flex;
    flex-direction: column;
    .content {
      flex: 1;
    }
  }
  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    #home {
      align-items: center;
      .content {
          width: 600px;
      }
    }
  }
  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    #home {  
      align-items: center;
      .content {
        width: 992px;
      }
    }  
  }
</style>
