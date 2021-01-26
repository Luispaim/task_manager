<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script>

import AppLayout from './../layout/AppLayout.vue'

export default {
  name: 'Dashboard',
  components: {
    AppLayout
  }
}
</script>
