<template>
  <div class="mb-40">
    <div class="flex justify-center">
      <form
        @submit.prevent="signInWithEmailAndPassword"
        class="border border-gray-100 flex flex-col md:px-8 px-2 py-4 rounded"
      >
        <div class="my-4 flex items-center justify-between">
          <label class="mr-3" for="email">Email</label>
          <input
            type="email"
            name="email"
            autocomplete="username"
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
    <p v-if="error" class="text-red-600 mt-4 flex-grow-0 text-center">
      {{ error }}
    </p>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: '',
    password: '',
    error: ''
  }),
  methods: {
    signInWithEmailAndPassword() {
      this.$store
        .dispatch('SIGN_IN_WITH_EMAIL_AND_PASSWORD', {
          email: this.email,
          password: this.password
        })
        .then(() => this.$router.push('/'))
        .catch((e) => (this.error = e.message))
    }
  }
}
</script>

<style></style>
