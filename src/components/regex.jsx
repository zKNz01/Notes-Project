export const validEmail = new RegExp(
  /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/,
);

export const validSenha = new RegExp(
  /^(?=.*[a-z][A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
);
