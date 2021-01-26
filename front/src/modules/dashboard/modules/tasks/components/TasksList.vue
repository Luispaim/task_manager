<template>

  <v-card
    max-width="600"
    class="mx-auto"
  >
    <v-toolbar
      color="secondary"
      dark
      dense
    >

      <v-toolbar-title>Tarefas (CRUD)</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          icon
          @click="showSaveTaskDialog"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-list
      min-height="570px"
      subheader
      two-line
      v-if="tasks.length > 0"
    >
      <div class="text-center mt-3">
        <v-pagination
          circle
          v-model="pagination.current"
          :length="pagination.total"
          :total-visible="7"
          @input="changePage(pagination.current)"
          @next="changePage(pagination.current)"
          @previous="changePage(pagination.current)"
        ></v-pagination>

      </div>

      <TasksListIten
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @edit="selectTaskEdit"
        @delete="deleteTask"
        @done="editTask"
      />

    </v-list>

    <p v-else-if="!errorMessage">Nenhuma tarefa criada.</p>

    <div
      class="alert alert-danger"
      v-else
    >{{ errorMessage }}
    </div>

    <TasksSave
      :saveTaskDialog="saveTaskDialog"
      :task="taskSelect"
      @hide="saveTaskDialog = false"
      @add="addTask"
      @edit="editTask"
    />

  </v-card>

</template>

<script>

import axios from '@/axios'

import TasksListIten from './TasksListIten.vue'
import TasksSave from './TasksSave.vue'

export default {
  components: {
    TasksListIten,
    TasksSave
  },
  data () {
    return {
      pagination: {
        current: 1,
        total: 0
      },
      name: 'TasksList',
      saveTaskDialog: false,
      taskSelect: undefined,
      errorMessage: undefined,
      tasks: []
    }
  },
  async created () {
    try {
      const response = await axios.get(`api/v1/tasks/`)
      console.log('GET tasks/ ', response)
      this.tasks = response.data.results
      // Calculando o número de páginas por resultados para fazer a paginação
      // Atribuir o valor inteiro do resultado da divisão: count/results.lenth
      let totalPage = Math.trunc(response.data.count / response.data.results.length)
      // Atribuir o resto do resultado da divisão: count/results.lenth
      const rest = response.data.count % response.data.results.length
      // Se há resto, eu adicionar mais uma página
      if (rest) {
        totalPage = totalPage + 1
      }
      this.pagination.total = totalPage
    } catch (error) {
      console.log('Erro ao listar tarefas: ', error)
      if (error.response) {
        this.errorMessage = `Servidor retornou um erro: ${error.message} ${error.response.statusText}`
        console.log('Erro [resposta]: ', error.response)
      } else if (error.request) {
        this.errorMessage = `Erro ao tentar comunicar com o servidor: ${error.message}`
        console.log('Erro [requisição]: ', error.request)
      } else {
        this.errorMessage = `Erro ao fazer requisição ao servidor: ${error.message}`
      }
    } finally {
      console.log('Sempre executado!')
    }
  },
  methods: {
    async addTask (task) {
      console.log('Criar Tarefa')
      try {
        const response = await axios.post(`api/v1/tasks/`, task)
        console.log('POST tasks/create', response)
        this.tasks.push(response.data)
        this.reset()
      } catch (error) {
        console.log('Erro ao criar tarefa: ', error)
      } finally {
        console.log('Sempre executado!')
      }
    },
    async editTask (task) {
      console.log('Editar Tarefa')
      try {
        const response = await axios.put(`api/v1/tasks/${task.id}`, task)
        console.log(`PUT tasks/${task.id}`, response)
        const index = this.tasks.findIndex(t => t.id === task.id)
        this.tasks.splice(index, 1, task)
        this.reset()
      } catch (error) {
        console.log('Erro ao atualizar tarefa: ', error)
      } finally {
        console.log('Sempre executado!')
      }
    },
    selectTaskEdit (task) {
      console.log('Select Task', task)
      this.taskSelect = task
      this.saveTaskDialog = true
    },
    async deleteTask (task) {
      const confirm = window.confirm(`Deseja deletar a tarefa "${task.name}"?`)
      if (confirm) {
        try {
          const response = await axios.delete(`api/v1/tasks/${task.id}`)
          console.log(`DELETE tasks/${task.id}`, response)
          const index = this.tasks.findIndex(t => t.id === task.id)
          this.tasks.splice(index, 1)
        } catch (error) {
          console.log('Erro ao deletar tarefa: ', error)
        } finally {
          console.log('Sempre executado!')
        }
      }
    },
    showSaveTaskDialog (event) {
      if (this.taskSelect) {
        this.taskSelect = undefined
        return
      }
      this.saveTaskDialog = !this.saveTaskDialog
    },
    reset () {
      console.log('Reset')
      this.taskSelect = undefined
      this.saveTaskDialog = false
    },
    async changePage (page) {
      try {
        const response = await axios.get(`api/v1/tasks/?page=` + page)
        this.tasks = response.data.results
      } catch (error) {
        console.log('Erro Paginação: ', error)
      }
    }
  }
}
</script>
