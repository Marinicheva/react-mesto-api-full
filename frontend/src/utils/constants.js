// const API_URL = 'http://api.marinich.students.nomoredomains.icu/';
const API_URL = 'http://localhost:3000/';
// const TOKEN ='8c85438e-65cc-450c-bee8-2c152a950866';
const initialValues = {email: '', password: ''};

const loginMessages = {
  400: "Не заполнено одно из полей ",
  401: "Введен неверный e-mail или пароль. Проверьте правильность вводимых данных"
}

const registrationMessages = {
  400: "Некорректно заполнено одно из полей"
}

export {API_URL, initialValues, loginMessages, registrationMessages};