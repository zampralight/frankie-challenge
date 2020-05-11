<template lang="pug">
  v-content(fluid).register
    v-row(no-gutters)
      v-col(cols="12" md="6").d-flex.align-center.justify-center
        v-card(min-width="350" max-width="450").flex-grow-1.elevation-0.mx-auto.px-6.px-md-0
          v-form(ref="form" v-model="validForm" onSubmit="return false;" @submit="register")
            div.display-3.mb-12 New Password
            div.subtitle-1.font-weight-bold New Password:
            v-text-field(v-model="password" :rules="[isValid(password)]" type="password").mb-6
            div.subtitle-1.font-weight-bold Confirm Password:
            v-text-field(v-model="confirm" :rules="[isValid(confirm), isPasswordEqual()]" type="password").mb-6
            div.tapable.mb-12
              a Want to reset password?
            v-btn(color="primary" :disabled="!validForm" type="submit")
              span Save
              v-icon.ml-12 mdi-dots-horizontal
              v-icon.ml-n3 mdi-chevron-right
      v-col(cols="12" md="6").d-none.d-md-block.poster
</template>

<script>
import { ref } from '@vue/composition-api'
import { isValid } from '@/utils/helpers'

export default {
  layout: 'no-auth',
  setup (props, ctx) {
    const password = ref('')
    const confirm = ref('')

    const validForm = ref(false)
    const form = ref(null)

    const register = async () => {
      form.value.validate()
      if (!validForm.value) { return }
      try {
        await ctx.root.$axios.$post({
          url: '/register',
          data: {
            email: 'eve.holt@reqres.in',
            password: password.value
          }
        })
      } catch (err) { }
    }

    const isPasswordEqual = () => {
      return password.value === confirm.value || 'Confirmation Password should equal to New Password'
    }

    return {
      password,
      confirm,

      validForm,
      form,

      register,
      isPasswordEqual,
      isValid
    }
  }
}
</script>

<style lang="scss">
.register {
  .poster {
    background-image: url(/images/register.png);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style>
