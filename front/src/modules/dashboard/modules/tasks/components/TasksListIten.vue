<template>
  <v-list-item>
    <v-row
      align="center"
      no-gutters
    >

      <v-col cols="9">
        <v-list-item-content>

          <v-list-item-title v-text="task.name"></v-list-item-title>

        </v-list-item-content>
      </v-col>

      <v-col cols="3">
        <v-list-item-action class=" mx-auto">
          <v-row justify="center">

            <v-col cols="3">
              <v-btn
                icon
                class="mx-auto"
              >
                <v-checkbox
                  v-model="task.status"
                  @click="doneTask"
                ></v-checkbox>
              </v-btn>
            </v-col>

            <v-col cols="2">
              <v-btn icon>
                <v-icon
                  color="secondary lighten-1"
                  title="Editar"
                  @click="$emit('edit', task)"
                >mdi-pencil</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="2">
              <v-btn icon>
                <v-icon
                  color="error lighten-1"
                  title="Deletar"
                  @click="$emit('delete', task)"
                >mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-list-item-action>
      </v-col>

    </v-row>
  </v-list-item>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  methods: {
    doneTask (event) {
      this.$emit('done', Object.assign({}, this.task, { status: this.task.status }))
    }
  }
}
</script>
