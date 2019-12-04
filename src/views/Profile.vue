<template>
  <div id="profile">
    <NavBar :showMenu="true">
      <h3 class="md-title" style="flex: 1">Profile</h3>
      <template v-slot:menu>
        <md-menu-item @click="logout()">
          <span>Kirjaudu ulos</span>
          <md-icon>exit_to_app</md-icon>
        </md-menu-item>
      </template>
    </NavBar>

    <div id="profile-fetching" v-if="fetching">
      <md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
    </div>

    <div id="profile-content" v-else>
      <md-card>
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">{{ user.firstName }} {{ user.lastName }}</div>
            <div class="md-subhead">{{ user.email }}</div>
          </md-card-header-text>
          <md-card-media>
            <img :src="user.profilePicture" alt="Avatar">
          </md-card-media>
        </md-card-header>
      </md-card>
      <md-button class="md-raised md-accent" @click="showDeleteDialog = true">Poista käyttäjätiedot</md-button>
    </div>
    
    <md-dialog-confirm
     :md-active.sync="showDeleteDialog"
      md-title="Poista käyttäjätiedot"
      md-content="Haluatko varmasti poistaa käyttäjätiedot? <br> Poistettua käyttäjää <strong>ei pysty</strong> palauttamaan."
      md-confirm-text="Poista"
      md-cancel-text="Hylkää"
      @md-cancel="showDeleteDialog = false"
      @md-confirm="deleteUser" />
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar';

export default {
  components: {
    NavBar
  },
  data: () => ({
    showDeleteDialog: false,
    fetching: true,
    user: {
      profilePicture: '',
      email: '',
      firstName: '',
      lastName: ''
    }
  }),
  mounted() {
    this.$rest.fetchUserInfo()
    .then(user => {
      this.user = user;
      this.fetching = false;
    })
    .catch(err => {
      console.log(err)
      this.fetching = false;
    })
  },
  methods: {
    deleteUser() {
      this.$rest.deleteUser()
      .then(() => {
        this.logout()
      })
      .catch(err => {
        console.log(err)
      })
      this.showDeleteDialog = false;
    },
    logout() {
      this.$auth.logout();
    },
  }
}
</script>

<style lang="scss" scoped>
  #profile {
    margin-top: 50px;
    #profile-content {
      display: flex;
      flex-direction: column;
      align-items: stretch;

      .md-card {
        box-sizing: border-box;
        margin: 10px;
        padding: 5px;
      }
    }
    #profile-fetching {
      display:flex;
      justify-content: center;
    }
  }

</style>