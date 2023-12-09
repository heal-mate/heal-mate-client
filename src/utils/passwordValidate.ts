const passwordValidate = (password: string) => {
  const pwRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return pwRegex.test(password);
};

export default passwordValidate;
