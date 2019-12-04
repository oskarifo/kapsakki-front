<template>
  <md-dialog :md-active.sync="isShown" @md-opened="opened">
    <form novalidate autocomplete="off" @submit.prevent="validateList">
      <md-dialog-title>Muokkaa lista</md-dialog-title>
      <md-dialog-content>
        <md-field :class="getValidationClass('name')">
          <label>Listan nimi</label>
          <md-input v-model="form.name" name="name" id="name"></md-input>
          <span class="md-error" v-if="!$v.form.name.required">Listan nimi on pakollinen</span>
          <span class="md-error" v-else-if="!$v.form.name.minLength">Nimen tulee olla vähintään 3 merkkiä pitkä</span>
        </md-field>
        <md-field :class="getValidationClass('description')">
          <label>Listan kuvaus</label>
          <md-input v-model="form.description" name="description" id="description"></md-input>
          <span class="md-error" v-if="!$v.form.description.maxLength">Kuvauksen tulee olla enintään 20 merkkiä pitkä</span>
        </md-field>
        <md-list class="md-dense">
          <md-subheader>Listan sisältö</md-subheader>
          <md-list-item v-for="(item, index) in tempList.listItems" :key="index">
            <span class="md-list-item-text">{{ item.name }}</span>
            <md-badge v-if="item.priority" class="md-accent md-square" :md-content="item.priority" />
            <md-badge v-if="item.quantity > 0" class="md-primary" :md-content="item.quantity" />
            <md-button class="md-icon-button md-list-action md-accent" @click="removeListItem(index)">
              <md-icon>clear</md-icon>
            </md-button>
          </md-list-item>
        </md-list>
      </md-dialog-content> 
      <md-dialog-actions>
        <md-button class="md-accent" @click="onClose">Sulje</md-button>
        <md-button class="md-primary" type="submit">Tallenna</md-button>
      </md-dialog-actions>
    </form>
  </md-dialog>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'
export default {
  name: 'EditListDialog',
  props: {
    list: Object,
    isShown: Boolean
  },
  data() {
    return {
      tempList: {
        id: '',
        name: '',
        description: '',
        owner: {
          firstName: '',
          lastName: '',
          email: '',
          profilePicture: ''
        },
        listItems: []
      },
      form: {
        name: '',
        description: '',
      }
    }
  },
  mixins: [validationMixin],
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3)
      },
      description: {
        maxLength: maxLength(20)
      },
    }    
  },
  /*
  * Watch list property changes
  */
  watch: { 
    list (newVal) {
      this.tempList = { ...newVal };
      this.form.name = this.tempList.name;
      this.form.description = this.tempList.description;
    }
  },
  methods: {
    opened() {
      this.tempList = { ...this.list  };
      this.form.name = this.tempList.name;
      this.form.description = this.tempList.description;
    },
    removeListItem(index) {
      let listItems = [...this.tempList.listItems]
      listItems.splice(index, 1)
      this.tempList.listItems = listItems
    },
    onClose() {
      this.$emit('onClose', false);
      this.clearForm();
    },
    validateList() { 
      this.$v.$touch()
      if (!this.$v.$invalid) {

        this.tempList.name = this.form.name;
        this.tempList.description = this.form.description;
        this.$emit('onSave', Object.assign({}, this.tempList));
        this.clearForm();
      }
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm () {
      this.$v.$reset()
    },
  }
}
</script>

<style lang="scss" scoped>
  .md-dialog {
    z-index: 20;
    .md-badge {
      margin: 0 10px 0 0;
    }
    form {
      padding: 20px 10px 20px 10px; 
    }
  }

</style>