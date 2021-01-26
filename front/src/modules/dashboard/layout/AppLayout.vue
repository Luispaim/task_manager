<template>
  <div>
    <!-- Barra de ferramentas topo -->
    <AppToolbar v-model="drawer" />
    <!-- Menu Lateral -->
    <AppMenu v-model="drawer" />
    <!-- Área de conteúdo do dashboard -->
    <!-- grid-list configura a distância entre todos os v-col -->
    <v-container grid-list-md>
      <v-row>
        <!-- xs12 é utilizado para o conteúdo ocupar toda a area -->
        <v-col cols="12">
          <slot />
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>

import AppMenu from './../components/AppMenu.vue'
import AppToolbar from './../components/AppToolbar.vue'

export default {
  name: 'AppLayout',
  components: {
    AppMenu,
    AppToolbar
  },
  data: () => ({
    drawer: false
  })
}
</script>
