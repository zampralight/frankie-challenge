<template lang="pug">
  v-content(fluid).login
    v-row(no-gutters)
      v-col(cols="12" md="6").d-flex.align-center.justify-center
        v-card(min-width="350" max-width="450").flex-grow-1.elevation-0.mx-auto.px-6.px-md-0
          v-form(ref="form" v-model="validForm" onSubmit="return false;" @submit="login")
            div.display-3.mb-12 Sign In
            div.subtitle-1.font-weight-bold Email:
            v-text-field(v-model="email" :rules="[!errorMsg || errorMsg, isValid(email), isEmail(email)]").mb-6
            div.subtitle-1.font-weight-bold Password:
            v-text-field(v-model="password" :rules="[isValid(password)]" append-icon="mdi-key-variant" type="password").mb-6
            div.tapable.mb-12
              a(@click="$router.push('/register')") Want to reset password?
            v-btn(color="primary" :disabled="!(isValid(email) && isEmail(email) && isValid(password))" type="submit")
              span Login
              v-icon.ml-12 mdi-dots-horizontal
              v-icon.ml-n3 mdi-chevron-right
      v-col(cols="12" md="6").d-none.d-md-block.poster
</template>

<script>
import { ref } from '@vue/composition-api'
import { isEmail, isValid } from '@/utils/helpers'

export default {
  layout: 'no-auth',
  setup (props, ctx) {
    const email = ref('')
    const password = ref('')

    const errorMsg = ref('')
    const validForm = ref(false)
    const form = ref(null)

    const login = async () => {
      form.value.validate()
      if (!validForm.value) { return }
      try {
        await ctx.root.$auth.login({
          data: {
            email: email.value,
            password: password.value
          }
        })
        ctx.root.$router.push('/')
      } catch (err) {
        errorMsg.value = 'The email or password wrong'
      }
    }

    return {
      email,
      password,

      errorMsg,
      validForm,
      form,

      login,
      isEmail,
      isValid
    }
  }
}
</script>

<style lang="scss">
.login {
  .poster {
    background-image: url(/images/login.png);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style>
