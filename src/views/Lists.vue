<template>
  <div id="lists">

    <NavBar :showMenu="true">
      <h3 class="md-title" style="flex: 1">Listat</h3>
      <template v-slot:menu>
        <md-menu-item @click="logout()">
          <span>Kirjaudu ulos</span>
          <md-icon>exit_to_app</md-icon>
        </md-menu-item>
      </template>
    </NavBar>

    <div id="lists-fetching" v-if="fetching">
      <md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
    </div>
    
    <div id="lists-notfound" v-else-if="!fetching && lists.length === 0">
      <md-empty-state
        md-icon="post_add"
        md-label="Lisää uusia listoja"
        @click="showNewListDialog = true">
      </md-empty-state>
    </div>

    <div id="lists-content" v-else>
      <md-list class="md-double-line md-dense" v-if="lists.length > 0">
        <md-subheader>Listat</md-subheader>
        <md-list-item @click="navigate(list)" exact v-for="(list, index) in lists" :key="index">
          <div class="md-list-item-text">
          <h3>{{ list.name }}</h3>
          <span>{{ list.description }}</span>
          </div>
        </md-list-item>
      </md-list>
    </div>
    <md-button @click="showNewListDialog = true" class="md-fab md-accent md-fab-bottom-right md-fixed">
      <md-icon>add</md-icon>
    </md-button>
    <NewListDialog 
    :isShown="showNewListDialog" 
    @onClose="showNewListDialog = false" 
    @onSave="saveList" />

  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar';
import NewListDialog from '@/components/NewListDialog';

export default {
  components: {
    NavBar,
    NewListDialog
  },
  methods: {
    fetchLists() {
      this.$rest.fetchLists()
      .then((lists) => {
        this.lists = lists;
        this.fetching = false;
      })
      .catch((err) => {
        this.fetching = false;
        console.log(err);
      })
    },
    saveList(list) {
      if (list.template !== 'none') {
        this.$rest.fetchTemplate(list.template)
        .then((template) => {
          list.listItems = template.listItems
          this.$rest.addList(list)
          .then((addedList) => {
            this.lists.push(addedList);
            this.showNewListDialog = false;
          })
          .catch(() => {
            this.showNewListDialog = false;
          })
        })
        .catch((err) => console.log(err))
      } else {
        this.$rest.addList(list)
        .then((addedList) => {
          this.lists.push(addedList);
          this.showNewListDialog = false;
        })
        .catch(() => {
          this.showNewListDialog = false;
        })
      }
    },
    logout() {
      this.$auth.logout();
    },
    navigate(list) {
      this.$router.push({ name: 'list', params: { listId: list.id } })
    },
  },
  data() {
    return {
      fetching: true,
      showNewListDialog: false,
      lists: []
    }
  },
  mounted() {
    this.fetchLists();
  }
}
</script>

<style lang="scss" scoped>
  #lists {
    margin-top: 50px;
    .md-fab {
      z-index: 10;
    }
    #lists-content {
      margin: 5px;
      .md-card {
        box-sizing: border-box;
        margin: 5px;
        padding: 2px;
      }
      .md-badge {
        margin: 5px 2px 5px 0;
      }
    }
    #lists-fetching {
      padding: 24px;
      display: flex;
      justify-content: center;
    }
  }
  
</style>