
export function register(email, password, passwordConfirmation) {

  let data = {
    email: email,
    password: password,
    password_confirmation: passwordConfirmation
  }

let requestOptions = {
  method: 'POST',
  body: JSON.stringify(data),
  redirect: 'follow',
  headers: {
    'Content-Type': 'Application/json'
}
};

fetch("http://206.189.91.54//api/v1/auth/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

export function login(email, password) {
  let data = {
    email: email,
    password: password
}

let requestOptions = {
    method: 'POST',
    body: JSON.stringify(data),
    redirect: 'follow',
    headers: {
        'Content-Type': 'Application/json'
    }

  };
  
  fetch("http://206.189.91.54//api/v1/auth/sign_in", requestOptions)
  .then(response => response.text())
  .then(result => {
    console.log(result.headers)
    console.log(result)})
  .catch(error => console.log('error', error));

}
