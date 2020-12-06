<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  created() {
    const loading = document.getElementById('preloader')
    if (loading !== null) {
      document.body.removeChild(loading)
    }
  }
}
</script>
