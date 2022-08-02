import axios from "axios";
const ENV = process.env;

function register(
  name: string,
  lastname: string,
  email: string,
  password: string
) {
  return axios.post(ENV.REACT_APP_API_URL + "users", {
    name,
    lastname,
    email,
    password,
  });
}

async function login(email: string, password: string) {
  const response = await axios.post(ENV.REACT_APP_API_URL + "users/login", {
    email,
    password,
  });

  if (response.data.token) {
    localStorage.setItem("auth", JSON.stringify(response.data.token));
  }

  return response;
}

function logout() {
  localStorage.removeItem("auth");
}

function passwordRecovery(email: string) {
  return axios.post(ENV.REACT_APP_API_URL + "mailer/password-recovery", {
    email,
  });
}

const auth = {
  register,
  login,
  logout,
  passwordRecovery,
};

export default auth;
