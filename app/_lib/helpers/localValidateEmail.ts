const localValidateEmail = (email: string) => {
  const validation = { isValid: true, message: "" };
  if (!email || email === "" || email.trim() === "" || !email.includes("@")) {
    validation.isValid = false;
    validation.message = "Email is not valid";
  }
  return validation;
};

export default localValidateEmail;
