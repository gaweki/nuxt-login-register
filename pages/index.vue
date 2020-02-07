<template>
  <div>
    <template v-if="!$store.state.authUser">
      <login></login>
    </template>
    <template v-else>
      <nav>
        <button @click="logout" class="font-bold nav--btn">Logout</button>
      </nav>
      <div class="page-body--container">
        <div class="w-50 p-120">
          <h1 class="text-big">Hello</h1>
          <h1 class="text-big">{{$store.state.authUser.username}}</h1>
        </div>
        <div class="w-50">

        </div>
        
      </div>
    </template>
  </div>
</template>


<script>
import login from '@/components/login'

export default {
  components: {
    login
  },
  data() {
    return {
      error: null,
      formUsername: '',
      formPassword: ''
    }
  },
  methods: {
    async logout () {
      try {
        await this.$store.dispatch('logout')
      } catch (e) {
        this.error = e.message
      }
    }
  }
}
</script>

<style lang="scss">
  .text-big{
    font-size: 73px;
  }
  .p-120{
    padding: 120px;
  }
  .w-50{
    width: 50%
  }
  .nav--btn{
    color: black;
  }
  .page-body--container{
    height: 100vh;
    background-color: #f3f3f8;
    text-shadow: 4px 2px rgba(0,0,0,.1);
  }
  nav{
    padding: 11px;
    background-color: white;
    color: white;
    text-align: right;
    position: fixed;
    width: 100%;
    top: 0;
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
