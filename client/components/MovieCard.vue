<template>
  <img :src="posterUrl" alt="" />
</template>

<script>
export default {
  props: {
    posterUrl: {
      type: String,
      default: () => ''
    },
    title: {
      type: String,
      default: () => ''
    }
  }
}
</script>

<style></style>
