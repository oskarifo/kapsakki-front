<template>
  <div id="nav">
    <md-toolbar class="md-dense">

      <md-button class="md-icon-button" @click="back()">
        <md-icon>navigate_before</md-icon>
      </md-button>

      <slot></slot>

      <md-menu md-size="big" md-align-trigger v-if="showMenu === true">
        <md-button class="md-icon-button" md-menu-trigger>
          <md-icon>menu</md-icon>
        </md-button>

        <md-menu-content>
          <slot name="menu"></slot>
        </md-menu-content>
      </md-menu>

      <md-button class="md-icon-button" v-if="showClose === true" @click="back()">
        <md-icon>close</md-icon>
      </md-button>

    </md-toolbar>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    showClose: Boolean,
    showMenu: Boolean
  },
  methods: {
    back() {
      this.$router.back();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  #nav {
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    right: 0;
    text-align: left;
  }
</style>
