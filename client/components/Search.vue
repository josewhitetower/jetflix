<template>
  <form @submit.prevent="handleSubmit">
      <input type="text" v-model="query">
  </form>
</template>

<script>
export default {
    data: ({
        query: "",
        results: []
    }),
    methods: {
        handleSubmit() {

        }
    }

}
</script>

<style>

</style>