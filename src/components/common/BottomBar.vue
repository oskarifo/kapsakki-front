<template>
  <div id="bottom-bar">
    <md-bottom-bar md-sync-route md-type="shift">
      <slot></slot>
    </md-bottom-bar>
  </div>
</template>

<script>
export default {
  name: 'BottomBar',
}
</script>

<style lang="scss">
  #bottom-bar {
    position: fixed;
    z-index: 5;
    bottom: 0;
    left: 0;
    right: 0;
    div.md-bottom-bar {
      div.md-ripple {
        display: flex;
        justify-content: space-evenly;
      }
    }
  }
  
</style>
