<template>
  <div
    class="flex items-center justify-between mt-2 text-center text-sm border border-gray-900"
  >
    <div class="flex-1 cursor-pointer">
      <div
        @click="$emit('prev')"
        class="p-2 hover:bg-gray-800"
        :class="{ hidden: page === 1 }"
      >
        Prev
      </div>
    </div>
    <div class="flex-1">
      <span>Page {{ page }} of {{ total_pages }}</span>
    </div>
    <div class="flex-1 cursor-pointer">
      <div
        @click="$emit('next')"
        class="p-2 hover:bg-gray-800"
        :class="{ hidden: page >= total_pages }"
      >
        Next
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      default: () => 1
    },
    total_pages: {
      type: Number,
      default: () => null
    }
  }
}
</script>

<style></style>
