<template>
  <div
    class="absolute flex flex-col right-0 border border-gray-900 p-2 rounded-md transition duration-500 ease-in-out bg-transparent overflow-auto w-56"
  >
    <span class="text-sm mb-2">
      {{ user.name }}
    </span>
    <span class="text-xs mb-4">
      {{ user.email }}
    </span>
    <span class="text-xs text-green-500 my-2" v-if="message">{{
      message
    }}</span>
    <span class="text-xs text-red-500 my-2" v-if="error">{{ error }}</span>
    <div class="text-xs">
      <button
        :class="{ 'animate-pulse': isLoading }"
        class="border border-gray-100 p-2 rounded mb-2 hover:bg-gray-800"
        @click="onResetPasswordClick"
      >
        Reset Password
      </button>
      <button
        :class="{ 'animate-pulse': isLoading }"
        class="border border-gray-100 p-2 rounded mb-2 hover:bg-gray-800"
        @click="onDeleteUserClick"
      >
        Delete Account
      </button>
    </div>
    <span
      class="cursor-pointer mr-3 ml-auto flex items-center"
      @click="$emit('sign-out')"
      title="Sign out"
    >
      <span class="text-xs m-2">Sign out</span>
      <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="lg:hidden" />
    </span>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    user: {
      required: true,
      default: () => ({})
    }
  },
  data: () => ({
    message: '',
    error: '',
    isLoading: false
  }),
  methods: {
    ...mapActions({
      resetPassword: 'RESET_PASSWORD',
      deleteUser: 'DELETE_USER'
    }),
    async onResetPasswordClick() {
      try {
        this.isLoading = true
        await this.resetPassword().then(() => {
          this.message =
            'Password reset confirmation sent. Please check your email inbox'
          this.isLoading = false
          setTimeout(() => (this.message = ''), 5000)
        })
      } catch (error) {
        this.error = error.message
        this.isLoading = false
        setTimeout(() => (this.error = ''), 5000)
      }
    },
    async onDeleteUserClick() {
      try {
        if (confirm('Delete user?')) {
          this.isLoading = true
          await this.deleteUser().then(() => {
            this.isLoading = false
          })
        }
      } catch (error) {
        this.error = error.message
        this.isLoading = false
        setTimeout(() => (this.error = ''), 5000)
      }
    }
  }
}
</script>

<style></style>
