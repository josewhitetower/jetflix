<template>
  <div class="mb-40">
    <div class="flex justify-center">
      <form
        @submit.prevent="createUserWithEmailAndPassword"
        class="border border-gray-100 flex flex-col md:px-8 px-2 py-4 rounded"
      >
        <div class="my-4 flex items-center justify-between">
          <label class="mr-3" for="displayName">Name</label>
          <input
            type="text"
            name="displayName"
            required
            placeholder="John Doe"
            v-model="displayName"
            class="text-gray-800 rounded p-2"
          />
        </div>
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
            autocomplete
            placeholder="********"
            v-model="password"
            class="text-gray-800 rounded p-2"
          />
        </div>
        <button
          class="mt-4 px-2 py-3 border border-gray-100 rounded hover:bg-gray-900"
        >
          Sign up
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
    displayName: '',
    error: ''
  }),
  methods: {
    createUserWithEmailAndPassword() {
      this.$store
        .dispatch('CREATE_USER_WITH_EMAIL_AND_PASSWORD', {
          email: this.email,
          password: this.password,
          displayName: this.displayName
        })
        .then(() => this.$router.push('/'))
        .catch((e) => (this.error = e.message))
    }
  }
}
</script>

<style></style>
