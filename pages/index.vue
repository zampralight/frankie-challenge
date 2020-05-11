<template lang="pug">
  v-btn(color="primary" @click="logout") Logout
</template>

<script>
export default {
  layout: 'use-auth',
  setup (props, ctx) {
    const logout = () => {
      ctx.root.$auth.logout()
      ctx.root.$router.push('/login')
    }

    return {
      logout
    }
  }
}
</script>
