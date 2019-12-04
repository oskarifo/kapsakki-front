<template>
  <md-dialog :md-active.sync="isShown">
    <form novalidate autocomplete="off" @submit.prevent="validateList">
      <md-dialog-title>Uusi lista</md-dialog-title>
      <md-dialog-content>
        <md-field :class="getValidationClass('name')">
          <label>Listan nimi</label>
          <md-input v-model="form.name" name="name" id="name"></md-input>
          <span class="md-error" v-if="!$v.form.name.required">Listan nimi on pakollinen</span>
          <span class="md-error" v-else-if="!$v.form.name.maxLength">Nimen pituus täytyy olla enintään 20 merkkiä</span>
          <span class="md-error" v-else-if="!$v.form.name.minLength">Nimen tulee olla vähintään 3 merkkiä pitkä</span>
        </md-field>
        <md-field :class="getValidationClass('description')">
          <label>Listan kuvaus</label>
          <md-input v-model="form.description" name="description" id="description"></md-input>
          <span class="md-error" v-if="!$v.form.description.maxLength">Kuvauksen tulee olla enintään 20 merkkiä pitkä</span>
        </md-field>
          <md-field>
          <label for="template">Pohja</label>
          <md-select v-model="form.template" name="template" id="template">
            <md-option value="none">Ei pohjaa</md-option>
            <md-option :value="template.id" v-for="template of templates" :key="template.id">{{ template.name }}</md-option>
          </md-select>
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
    maxLength
} from 'vuelidate/lib/validators'
export default {
  name: 'NewListDialog',
  props: {
    isShown: Boolean
  },
  data: () => ({
    templates: [],
    form: {
      name: '',
      description: '',
      template: 'none',
    },
  }),
  mixins: [validationMixin],
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20)
      },
      description: {
        maxLength: maxLength(20)
      },
    }
  },
  mounted() {
    this.$rest.fetchTemplates()
    .then((templates) => {
      this.templates = templates
    })
    .catch((err) => console.log(err))
  },
  methods: {
    onClose() {
      this.$emit('onClose', false);
      this.clearForm();
    },
    validateList() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$emit('onSave', { ...this.form });
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
      this.form.name = '';
      this.form.description = '';
      this.form.template = 'none';
    },
  }
}
</script>

<style lang="scss" scoped>
  .md-dialog {
    z-index: 10;
    form {
      padding: 20px 10px 20px 10px; 
    }
  }

</style>