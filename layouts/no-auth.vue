<template lang="pug">
  v-app.no-auth
    v-app-bar(app).white.elevation-0
      h1.font-weight-bold.tapable Frankie.
      v-spacer
      span.subtitle-1.tapable.mx-4 About Frankie
      v-menu(offset-y)
        template(v-slot:activator="{on}")
          a(v-ripple v-on="on")
            v-avatar
              v-icon(large) mdi-account-circle
            v-icon.ml-n3 mdi-chevron-down
        v-list
          v-list-item(to="/login" router)
            v-list-item-title Login
    nuxt
</template>

<script>
export default {
  middleware: 'no-auth'
}
</script>

<style lang="scss">
#app.v-application.no-auth {
  .v-content {
    &__wrap {
      display: flex;
      flex-direction: row;
    }
  }
}
</style>
