const yup = require('yup');

const userSchema = yup.object().shape({
  email: yup.string().email().required(),
  nickname: yup.string().min(3).max(30).required(),
  password: yup.string().min(8).required()
});

const updateProfileSchema = yup.object().shape({
  email: yup.string().email().required(),
  nickname: yup.string().min(3).max(30).required(),
  oldPassword: yup.string().min(8).required(),
  newPassword: yup.string().min(8).optional()
})

module.exports = {
  userSchema,
  updateProfileSchema
};