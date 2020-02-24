<template>
  <div
    class="flex items-center justify-between mt-2 text-center text-sm border border-gray-900"
  >
    <div class="flex-1 cursor-pointer">
      <div
        :class="{ hidden: page === 1 }"
        class="p-2 hover:bg-gray-800"
        @click="$emit('prev')"
      >
        Prev
      </div>
    </div>
    <div class="flex-1">
      <span>Page {{ page }} of {{ totalPages }}</span>
    </div>
    <div class="flex-1 cursor-pointer">
      <div
        :class="{ hidden: page >= totalPages }"
        class="p-2 hover:bg-gray-800"
        @click="$emit('next')"
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
    totalPages: {
      type: Number,
      default: () => null
    }
  }
}
</script>

<style></style>
