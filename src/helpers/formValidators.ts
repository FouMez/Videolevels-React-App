export default {
  email: {
    message: "Please provide a valid email address.",
    type: "email",
  },
  passwordMatch: ({ getFieldValue }: any) => ({
    validator(_: any, value: any) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject("Passwords dosen't match");
    },
  }),
  passwordMinLength: {
    validator: (_: any, value: string) =>
      value && value.length > 5
        ? Promise.resolve()
        : Promise.reject("Password minimum length is 6"),
  },
  required: {
    message: "This field is requried.",
    required: true,
  },
};
