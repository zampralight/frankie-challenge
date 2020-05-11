export const isEmail = email => /(.+)@(.+){2,}\.(.+){2,}/.test(email) || 'This is not valid email'
export const isValid = value => !!value || 'This field is required'
