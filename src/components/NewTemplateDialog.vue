<template>
  <md-dialog :md-active.sync="isShown">
    <form novalidate autocomplete="off" @submit.prevent="validateTemplate">
      <md-dialog-title>Tallenna pohjaksi</md-dialog-title>
      <md-dialog-content>
        <md-field :class="getValidationClass('name')">
          <label for="item-name">Nimi</label>
          <md-input name="item-name" id="item-name" v-model="form.name" />
          <span class="md-error" v-if="!$v.form.name.required">Nimi on pakollinen</span>
          <span class="md-error" v-else-if="!$v.form.name.maxLength">Nimen pituus täytyy olla enintään 20 merkkiä</span>
          <span class="md-error" v-else-if="!$v.form.name.minLength">Nimen pituus täytyy olla vähintään 3 merkkiä</span>
        </md-field>
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
    maxLength,
} from 'vuelidate/lib/validators'
export default {
  name: 'NewTemplateDialog',
  props: {
    isShown: Boolean
  },
  methods: {
    clearForm() {
      this.$v.$reset();
      this.form.name = null;
    },
    onClose() {
      this.$emit('onClose', false);
      this.clearForm();
    },
    onConfirm() {
      this.clearForm();
    },
    validateTemplate() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        let template = {
          name: this.form.name
        }
        this.$emit('onSave', { ...template })
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
    }
  },
  data:() => ({
    showAddDialog: false,
    form: {
      name: ''
    }
  }),
  mixins: [validationMixin],
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20)
      },
    }    
  },
}
</script>

<style lang="scss" scoped>
  .md-dialog {
    z-index: 20;
    form {
      padding: 20px 10px 20px 10px; 
    }
  }

</style>