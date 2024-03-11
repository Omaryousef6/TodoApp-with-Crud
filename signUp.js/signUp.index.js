var inputNameSignUp = document.getElementById("inputNameSignUp");
var inputEmailSignUp = document.getElementById("inputEmailSignUp");
var inputPassSignUp = document.getElementById("inputPassSignUp");
var btnCreat = document.getElementById("btnCreat");
var btnSignIn = document.getElementById("btnSignIn");
var TextValidEmail = document.getElementById("TextValidEmail");
var textExistEmail = document.getElementById("textExistEmail");
var regexNameSignUp = /\w{4,20}/;
var regexEmailSignUp =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
var regexPasswordSignUp = /^[a-zA-Z0-9]{7,20}$/;
var emailsSuccess = [];

if (localStorage.getItem("EmailUser") != null) {
  emailsSuccess = JSON.parse(localStorage.getItem("EmailUser"));
}

btnCreat.addEventListener("click", function () {
  if (
    inputNameSignUp.value == "" ||
    inputEmailSignUp.value == "" ||
    inputPassSignUp == ""
  ) {
    document.getElementById("messRequird").classList.remove("d-none");
  } else if (validatSchema(inputEmailSignUp.value)) {
    if (isExist(inputEmailSignUp.value, emailsSuccess, "email")) {
      textExistEmail.classList.remove("d-none");
      return;
    }
    textExistEmail.classList.add("d-none");
    var dateUser = {
      name: inputNameSignUp.value,
      email: inputEmailSignUp.value,
      password: inputPassSignUp.value,
    };

    emailsSuccess.push(dateUser);

    localStorage.setItem("EmailUser", JSON.stringify(emailsSuccess));
    document.getElementById("messRequird").classList.add("d-none");
    clearForm();
    
  }
});

function validatSchema(regexemail) {
  return regexEmailSignUp.test(regexemail);
}

inputNameSignUp.addEventListener("input", function () {
  var name = inputNameSignUp.value;

  if (regexNameSignUp.test(name)) {
    inputNameSignUp.classList.add("is-valid");
    inputNameSignUp.classList.remove("is-invalid");
  } else {
    inputNameSignUp.classList.add("is-invalid");
    inputNameSignUp.classList.remove("is-valid");
  }
});

inputEmailSignUp.addEventListener("input", function () {
  var email = inputEmailSignUp.value;

  if (regexEmailSignUp.test(email)) {
    inputEmailSignUp.classList.add("is-valid");
    inputEmailSignUp.classList.remove("is-invalid");
    TextValidEmail.classList.add("d-none");
  } else {
    inputEmailSignUp.classList.add("is-invalid");
    inputEmailSignUp.classList.remove("is-valid");
    TextValidEmail.classList.remove("d-none");
  }
});

inputPassSignUp.addEventListener("input", function () {
  var password = inputPassSignUp.value;

  if (regexPasswordSignUp.test(password)) {
    inputPassSignUp.classList.add("is-valid");
    inputPassSignUp.classList.remove("is-invalid");
  } else {
    inputPassSignUp.classList.add("is-invalid");
    inputPassSignUp.classList.remove("is-valid");
  }
});

function clearForm() {
  inputNameSignUp.value = "";
  inputEmailSignUp.value = "";
  inputPassSignUp.value = "";
}

btnSignIn.addEventListener("click", function () {
  window.location = "login.html";
});

function isExist(emailInp, dbArr, checker) {
  // for(var i =0; i< dbArr.length; i++){
  //   dbArr[i][checker]
  // }
  for (var item of dbArr) {
    if (item[checker] === emailInp) {
      return true;
    }
  }
  return false;
}
