<template>
  <img :data-src="posterUrl" alt="" class="lazyload" />
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
