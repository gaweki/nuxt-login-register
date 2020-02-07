<template>
  <div class="login-form">
    <template v-if="isLogin">
      <div class="container">
        <form @submit.prevent="login">
          <p v-if="error" class="error-notice">{{ error }}</p>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Username
            </label>
            <input class="input" v-model="formUsername" type="text" placeholder="Username" name="username"/>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input class="input" v-model="formPassword" type="password" placeholder="Password" name="password"/>
          </div>
          
          <div class="login-button text-right">
            <button class="button" type="submit">Login</button>
          </div>
        </form>
      </div>
      <div class="register-button text-center" style="margin: 30px;">
        <button class="button button-page font-bold" type="button" @click="showRegister">Register</button>
      </div>
    </template>

    <template v-if="isRegister">
      <div class="container">
        <form @submit.prevent="register">
          <p v-if="error" class="error-notice">{{ error }}</p>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Username
            </label>
            <input class="input" v-model="formUsername" type="text" placeholder="Username" name="username"/>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input class="input" v-model="formPassword" type="password" placeholder="Password" name="password"/>
          </div>
          
          <div class="login-button text-right">
            <button class="button" type="submit">Register</button>
          </div>
        </form>
      </div>
      <div class="register-button text-center" style="margin: 30px;">
        <button class="button button-page font-bold" type="button" @click="showLogin">Login</button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: true,
      isRegister: false,
      error: null,
      formUsername: '',
      formPassword: ''
    }
  },
  methods: {
    showLogin () {
      this.isLogin = true;
      this.isRegister = false;
    },
    showRegister () { 
      this.isRegister = true;
      this.isLogin = false
    },
    async login() {
      try {
        await this.$store.dispatch("login", {
          username: this.formUsername,
          password: this.formPassword
        })
        this.$router.push("/")
      } catch(e) {
        this.error = e.message
      }
    },
    async register() {
      try {
        await this.$store.dispatch("register", {
          username: this.formUsername,
          password: this.formPassword
        })
        this.$router.push("/")
      } catch(e) {
        this.error = e.message
      }
    }
  }
}
</script>

<style lang="scss">
  .button-page{
    background-color: green;
    width: 448px;
    border-radius: 5px;
    padding: 7px;
    color: white;
  }
  .login-form {
    min-height: 100vh;
    background-color: #f3f3f8;
    @apply py-20;
    .container {
      text-align: left;
      display: block;
      min-height: auto;
      @apply bg-white p-4 mx-auto max-w-md shadow-md rounded;
      .error-notice {
        @apply text-red-500 bg-red-100 p-2 rounded border border-red-400 text-sm font-bold mb-4
      }
      .input {
        @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight;
        &:focus {
          @apply outline-none shadow-outline
        }
      }
      .button {
        @apply bg-blue-500 text-white font-bold py-2 px-4 text-center rounded;
        cursor: pointer;
        transition: 0.2s;
        &:hover {
          @apply bg-blue-600
        }
        &:focus {
          @apply outline-none shadow-outline;
        }
      }
    }
  }
</style>
