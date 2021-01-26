<template>
  <v-dialog
    v-model="saveTaskDialog"
    width="500"
    persistent
  >
    <v-card>
      <v-card-title>
        <span class="headline">Salvar Tarefa</span>
      </v-card-title>
      <v-card-text>
        <v-form
          @submit.prevent="submit"
          id="save-task-form"
        >
          <v-container>
            <v-row>
              <v-col cols="9">
                <v-text-field
                  label="Título"
                  required
                  v-model="taskLocal.name"
                ></v-text-field>
              </v-col>
              <v-col cols="1">
                <v-checkbox
                  label="Tarefa Concluída?"
                  required
                  v-model="taskLocal.status"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="secondary"
          @click.stop="$emit('hide')"
          type="button"
        >
          Fechar
        </v-btn>
        <v-btn
          color="secondary"
          type="submit"
          @click.stop="$emit('hide')"
          form="save-task-form"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      default: undefined
    },
    saveTaskDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      taskLocal: Object.assign(
        {},
        { name: '', status: false },
        this.task)
    }
  },
  watch: {
    task (newTask, oldTask) {
      this.taskLocal = Object.assign({}, this.task)
    }
  },
  methods: {
    submit (event) {
      console.log('Save')
      const operation = !this.task ? 'add' : 'edit'
      this.$emit(operation, this.taskLocal)
      this.taskLocal = { name: '', status: false }
    }
  }
}
</script>
