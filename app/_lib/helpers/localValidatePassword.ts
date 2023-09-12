const localValidatePassword = (password: string) => {
  const validation = { isValid: true, message: "" };
  if (
    !password ||
    password === "" ||
    password.trim() === "" ||
    password.length < 6 ||
    password.length > 18
  ) {
    validation.isValid = false;
    validation.message = "Password is not valid";
  }
  return validation;
};

export default localValidatePassword;
