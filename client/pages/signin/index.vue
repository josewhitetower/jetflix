<template>
  <div class="flex justify-center mb-40">
    <form
      @submit.prevent="signInWithEmailAndPassword"
      class="border border-gray-100 rounded py-4 px-8 flex flex-col"
    >
      <div class="my-4 flex items-center justify-between">
        <label class="mr-3" for="email">Email</label>
        <input
          type="email"
          name="email"
          required
          placeholder="john@doe.com"
          v-model="email"
          class="text-gray-800 rounded p-2"
        />
      </div>
      <div class="my-4 flex items-center justify-between">
        <label class="mr-3" for="password">Password</label>
        <input
          type="password"
          name="password"
          required
          autocomplete="current-password"
          placeholder="********"
          v-model="password"
          class="text-gray-800 rounded p-2"
        />
      </div>
      <button
        class="mt-4 px-2 py-3 border border-gray-100 rounded hover:bg-gray-900"
      >
        Sign in
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    signInWithEmailAndPassword() {
      this.$store
        .dispatch('signInWithEmailAndPassword', {
          email: this.email,
          password: this.password
        })
        .then(() => this.$router.push('/'))
        .catch((e) => console.log(e))
    }
  }
}
</script>

<style></style>
