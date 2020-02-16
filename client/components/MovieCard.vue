<template>
  <div class="group relative">
    <img
      :data-src="posterUrl"
      alt=""
      class="lazyload opacity-75 hover:opacity-100 transition duration-500 ease-in-out"
    />
    <div
      class="opacity-0 group-hover:opacity-100 absolute bottom-0 text-white bg-transparent w-full h-16 z-10 transition duration-500 ease-in-out"
    >
      <p>{{ title }}</p>
    </div>
  </div>
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
