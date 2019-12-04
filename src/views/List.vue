<template>
  <div id="list">
    <NavBar :showMenu="true">

      <h3 class="md-title" style="flex: 1">{{ list.name }}</h3>
      <template v-slot:menu>
        <md-menu-item @click="showEditDialog = true">
          <span>Muokkaa</span>
          <md-icon>edit</md-icon>
        </md-menu-item>
        <md-menu-item @click="showClearDialog = true">
          <span>Tyhjennä merkinnät</span>
          <md-icon>done</md-icon>  
        </md-menu-item>
        <md-menu-item @click="showDeleteDialog = true">
          <span>Poista lista</span>
          <md-icon>clear</md-icon>  
        </md-menu-item>
        <md-menu-item @click="showTemplateDialog = true">
          <span>Tallenna pohjaksi</span>
          <md-icon>playlist_add</md-icon>
        </md-menu-item>
      </template>
    </NavBar>
    
    <div id="list-fetching" v-if="fetching">
      <md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
    </div>
    
    <div id="list-notfound" v-else-if="!fetching && list.id === ''">
      <md-empty-state
        md-icon="error_outline"
        md-label="Listaa ei löydy">
      </md-empty-state>
    </div>

    <div id="list-content" v-else>

      <md-card id="list-header">
        <md-card-content>
          <div class="md-headline">{{ list.name }}</div>
          <div class="md-subheading">{{ list.description }}</div>
        </md-card-content>
      </md-card>

      <md-card id="list-items" v-if="list.listItems.length > 0">
        <md-card-content>
          <md-list class="md-dense">
            <md-subheader>Listan sisältö</md-subheader>
            <md-list-item v-for="(item, index) in list.listItems" :key="index">
              <span class="md-list-item-text">{{ item.name }}</span>
              <md-badge v-if="item.priority" class="md-accent md-square" :md-content="item.priority" />
              <md-badge v-if="item.quantity > 0" class="md-primary" :md-content="item.quantity" />
              <md-checkbox v-model="item.checked" @change="toggleChecked(item, index)"/>
            </md-list-item>
          </md-list>
        </md-card-content>
      </md-card>

      <md-empty-state
        v-if="list.listItems.length === 0"
        md-icon="post_add"
        md-label="Lisää asioita listalle"
        @click="showAddDialog = true">
      </md-empty-state>
      
      <md-button class="md-fab md-accent md-fab-bottom-right md-fixed" @click="showAddDialog = true">
        <md-icon>add</md-icon>
      </md-button>

    </div>
    
    <md-snackbar md-position="left" :md-duration="Infinity" :md-active.sync="showErrorSnack" md-persistent>
      <span>{{ errorMessage }}</span>
      <md-button class="md-primary" @click="closeError">Sulje</md-button>
    </md-snackbar>
    
    <NewItemDialog 
      :isShown="showAddDialog"
      @onClose="showAddDialog = false"
      @onSave="addListItem" />
    <EditListDialog
      :isShown="showEditDialog"
      :list="list"
      @onClose="showEditDialog = false"
      @onSave="editList" />
    <NewTemplateDialog
      :isShown="showTemplateDialog"
      @onClose="showTemplateDialog = false"
      @onSave="saveTemplate" />
    <md-dialog-confirm
     :md-active.sync="showDeleteDialog"
      md-title="Poista lista"
      md-content="Haluatko varmasti poistaa listan? <br> Poistettua listaa <strong>ei pysty</strong> palauttamaan."
      md-confirm-text="Poista"
      md-cancel-text="Hylkää"
      @md-cancel="showDeleteDialog = false"
      @md-confirm="deleteList" />
    <md-dialog-confirm
     :md-active.sync="showClearDialog"
      md-title="Tyhjennä lista"
      md-content="Haluatko varmasti tyhjentää listan merkinnät?"
      md-confirm-text="Tyhjennä"
      md-cancel-text="Hylkää"
      @md-cancel="showClearDialog = false"
      @md-confirm="clearList" />
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar';
import NewItemDialog from '@/components/NewItemDialog';
import EditListDialog from '@/components/EditListDialog';
import NewTemplateDialog from '@/components/NewTemplateDialog';

export default {
  components: {
    NavBar,
    NewItemDialog,
    EditListDialog,
    NewTemplateDialog
  },
  mounted() {
    this.$rest.fetchList(this.$route.params.listId)
    .then((list) => {
      this.list = list;
      this.fetching = false;
    })
    .catch((err) => {
      this.fetching = false;
      this.showError(err)
    })
  },
  methods: {
    showError(error) {
      this.errorMessage = error;
      this.showErrorSnack = true;
    },
    closeError() {
      this.errorMessage = '';
      this.showErrorSnack = false;
    },
    toggleChecked(item) {
      this.$rest.updateListItem(this.$route.params.listId, item)
      .then(() => {})
      .catch((err) => this.showError(err))
    },
    addListItem(listItem) {
      this.$rest.addListItem(this.$route.params.listId, listItem)
      .then((addedListItem) => this.list.listItems.push(addedListItem))
      .catch((err) => this.showError(err))
      .finally(() => this.showAddDialog = false)
    },
    saveTemplate(template) {
      template.listItems = this.list.listItems
      this.$rest.addTemplate(template)
      .then(() => this.showTemplateDialog = false)
      .catch((err) => this.showError(err))
    },
    deleteList() {
      this.$rest.deleteList(this.$route.params.listId)
      .then(() => this.$router.back())
      .catch((err) => this.showError(err))
      .finally(() => this.showDeleteDialog = false)
    },
    clearList() {
      this.list.listItems.map(listItem => listItem.checked = false) 
      this.$rest.patchListItems(this.$route.params.listId, this.list.listItems)
      .then((listItems) => this.list.listItems = listItems)
      .catch((err) => this.showError(err))
      .finally(() => this.showDeleteDialog = false)
    },
    editList(list) {
      let difference = this.list.listItems.filter(x => !list.listItems.includes(x));
      list.listItems = difference;      
      this.$rest.updateList(list)
      .then((updatedList) => this.list = updatedList)
      .catch((err) => this.showError(err))
      .finally(() => this.showEditDialog = false)
    }
  },
  data() {
    return {
      fetching: true,
      showAddDialog: false,
      showEditDialog: false,
      showTemplateDialog: false,
      showDeleteDialog: false,
      showClearDialog: false,
      showErrorSnack: false,
      errorMessage: '',

      list: {
        id: '',
        name: '',
        description: '',
        owner: {
          id: '',
          firstName: '',
          lastName: '',
          email: '',
          profilePicture: ''
        },
        listItems: []
      }
    }
  }
}

</script>
<style lang="scss" scoped>
  #list {
    margin-top: 50px;
    .md-snackbar {
      z-index: 200;
    }
    #list-fetching {
      padding: 24px;
      display: flex;
      justify-content: center;
    }
    
    #list-content {
      margin: 5px;
      #list-header.md-card {
        box-sizing: border-box;
        padding: 5px;
        margin-bottom: 10px;
      }
      #list-items.md-card {
        box-sizing: border-box;
      }
      .md-fab {
        z-index: 10;
      }
      .md-dialog {
        z-index: 20;
        .md-dialog-content {
          padding: 0 24px 0 24px;
        }
      }
      .md-badge {
        margin: 0 10px 0 0;
      }
    }
  }
  
</style>