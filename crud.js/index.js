var UserNameLogin = document.getElementById("UserNameLogin");
var logOut = document.getElementById("logOut");
var userName = localStorage.getItem("nameUser");
var productName = document.getElementById("productNameInput");
var productPrice = document.getElementById("productPriceInput");
var productCategory = document.getElementById("productCategoryInput");
var productDescription = document.getElementById("productDescriptionInput");
var searchInput = document.getElementById("searchInput");
var indexUpdate = 0;
var updateBtn = document.getElementById("updateBtn");
var addBtn = document.getElementById("addBtn");

var productList = [];

if (localStorage.getItem("product") != null) {
  productList = JSON.parse(localStorage.getItem("product"));

  displayData();
}

function addProduct() {
  if (productName.value == "") {
    return;
  }
  var product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value,
  };
  
  productList.push(product);

  localStorage.setItem("product", JSON.stringify(productList));

  displayData();
  clearForm();
}

function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDescription.value = "";
}

function displayData() {
  var tableData = "";

  for (var i = 0; i < productList.length; i++) {
    tableData += `<tr>
        <td>${i + 1}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].description}</td>
        <td>
        <button class="btn btn-warning btn-sm" onclick = "setData(${i})" >Update</button>
        <button onclick="deleteItem(${i})" class="btn btn-danger btn-sm">delete</button>
        </td>
      </tr>`;
  }

  document.getElementById("tableBody").innerHTML = tableData;
}

function deleteItem(index) {
  productList.splice(index, 1);
  localStorage.setItem("product", JSON.stringify(productList));
  displayData();
}

function searchData() {
  var term = searchInput.value;

  var tableData = "";

  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
      tableData += `<tr>
    <td>${i + 1}</td>
    <td>${productList[i].name}</td>
    <td>${productList[i].price}</td>
    <td>${productList[i].category}</td>
    <td>${productList[i].description}</td>
    <td>
    <button class="btn btn-warning btn-sm">update</button>
    <button onclick="deleteItem(${i})" class="btn btn-danger btn-sm">delete</button>
    </td>
  </tr>`;
    }

    document.getElementById("tableBody").innerHTML = tableData;
  }
}

function setData(iData) {
  indexUpdate = iData;

  var curentProduct = productList[iData];

  productName.value = curentProduct.name;
  productPrice.value = curentProduct.price;
  productCategory.value = curentProduct.category;
  productDescription.value = curentProduct.description;

  updateBtn.classList.remove("d-none");
  addBtn.classList.add("d-none");
}

function updateProduct() {
  var product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value,
  };

  productList.splice(indexUpdate, 1, product);

  localStorage.setItem("product", JSON.stringify(productList));

  displayData();
  clearForm();

  updateBtn.classList.add("d-none");
  addBtn.classList.remove("d-none");
}

function loginUser() {
  UserNameLogin.innerHTML = "Mr: " + userName;
}
loginUser();

logOut.addEventListener("click", function () {
  localStorage.removeItem("nameUser");
  window.location = "login.html";
});
