<template>
  <div class="container text-center h-64">
    <h1 v-if="error.statusCode === 404">Ups! Looks like you're lost 👻</h1>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blog' // you can set a custom layout for the error page
}
</script>
