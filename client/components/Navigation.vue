<template>
  <div
    :class="isScrolled"
    class="container fixed left-0 mx-auto pb-5 px-6 right-0 top-0 z-20 pt-5 bg-black"
  >
    <nuxt-link to="/">Home</nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      view: {
        isAtTopOfPage: true
      }
    }
  },
  computed: {
    isScrolled() {
      return !this.view.isAtTopOfPage && 'border-b border-gray-900'
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    // the function to call when the user scrolls, added as a method
    handleScroll() {
      // when the user scrolls, check the pageYOffset
      if (window.pageYOffset > 0) {
        // user is scrolled
        if (this.view.isAtTopOfPage) this.view.isAtTopOfPage = false
      } else if (!this.view.isAtTopOfPage) this.view.isAtTopOfPage = true
      // user is at top of page
    }
  }
}
</script>

<style></style>
