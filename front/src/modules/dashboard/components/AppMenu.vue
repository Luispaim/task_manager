<template>
  <v-navigation-drawer
    :value="value"
    @input="$emit('input', $event)"
    :mini-variant.sync="mini"
    absolute
    temporary
  >
    <v-list-item class="px-2">
      <v-btn
        v-if="mini"
        icon
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>

      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-title> Olá {{ user.username }} !</v-list-item-title>

      <v-btn
        icon
        @click.stop="mini = !mini"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.url"
        :exact="item.exact"
        @click.stop="$emit('input', false)"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

    </v-list>

  </v-navigation-drawer>
</template>

<script>

export default {
  name: 'AppMenu',
  props: {
    value: Boolean
  },
  data: () => ({
    items: [
      // { title: 'Meu Perfil', icon: 'person', url: '/dashboard/profile', exact: true },
      { title: 'Lista de Tarefas', icon: 'dashboard', url: '/dashboard/tasks', exact: true }
      // { title: 'Tabela', icon: 'mdi-table', url: '/dashboard/records/table', exact: true }
    ],
    mini: false,
    user: {}
  })
}
</script>
