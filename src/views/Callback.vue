<template>
  <div class="auth">
    Loading...
  </div>
</template>
<script>
export default {
  async mounted() {
    try {
      await this.$auth.handleAuthentication();
      this.$router.push({ name: 'home' }).catch()
    } catch (err) {
      console.log(err)
    }
  }
}
</script>
