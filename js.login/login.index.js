var inputEmailLogin = document.getElementById("inputEmailLogin");
var inputPasswordLogin = document.getElementById("inputPassLogin");
var btnLogin = document.getElementById("btnLogin");
var btnSignUp = document.getElementById("btnSignUp");
var messRequird = document.getElementById("messRequird");
var messNotSucces = document.getElementById("messNotSucces");
var messSucces = document.getElementById("messSucces");

var emailsCreate = [];

function onPageReLoad() {
  if (localStorage.getItem("EmailUser") != null) {
    emailsCreate = JSON.parse(localStorage.getItem("EmailUser"));
  }

  showMessage("messNotSucces", "add", "d-none");
}
onPageReLoad();

btnLogin.addEventListener("click", function () {
  if ((inputEmailLogin.value == "") | (inputPasswordLogin.value == "")) {
    showMessage("messRequird", "remove", "d-none");
    return;
  }

  for (var i = 0; i < emailsCreate.length; i++) {
    if (
      inputEmailLogin.value == emailsCreate[i].email &&
      inputPasswordLogin.value == emailsCreate[i].password
    ) {
      localStorage.setItem("nameUser", emailsCreate[i].name);
      window.location = "./index.html";
      showMessage("messRequird", "add", "d-none");
      showMessage("inputEmailLogin", "remove", "is-invalid");
      showMessage("messSucces", "remove", "d-none");

      clearInput();
      return;
    }
  }
  showMessage("messSucces", "add", "d-none");
  showMessage("inputEmailLogin", "add", "is-invalid");
  showMessage("messNotSucces", "remove", "d-none");
});

function showMessage(inputId, method, className) {
  document.getElementById(inputId).classList[method](className);
}

inputEmailLogin.addEventListener("click", function () {
  showMessage("messRequird", "add", "d-none");
  showMessage("messNotSucces", "add", "d-none");
  showMessage("inputEmailLogin", "remove", "is-invalid");
});

function clearInput() {
  inputEmailLogin.value = "";
  inputPasswordLogin.value = "";
}

btnSignUp.addEventListener("click", function () {
  window.location = "./signUp.html";
});
