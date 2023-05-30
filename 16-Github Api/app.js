//Elemnetleri seçme

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUser = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();
const storage = new Storage();
eventListener();

function eventListener() {
  githubForm.addEventListener("submit", getData);
  clearLastUser.addEventListener("click", clearAllSearch);
  document.addEventListener("DOMContentLoaded", getAllSearch);
}

function getData(e) {
  let username = nameInput.value.trim();

  if (username === "") {
    alert("Geçerli bir kullanıcı adı giriniz. ");
  } else {
    github
      .getGithubData(username)
      .then(function (response) {
        if (response.user.message === "Not Found") {
          ui.showError("Kullanıcı bulunamadı.");
        } else {
          ui.addSearchedUserToUI(username);
          Storage.addSearchedUserToStorage(username);
          ui.showUserInfo(response.user);
          ui.showRepoInfo(response.repo);
        }
      })
      .catch(function (err) {
        ui.showError(err);
      });
  }
  ui.clearInput();

  e.preventDefault();
}

function clearAllSearch() {
  //Tüm arananları temizle
  if(confirm("Emin misiniz?")){
    Storage.clearAllSearchedUsersFromStorage();
    ui.clearAllSearchFromUI();
  }
}

function getAllSearch() {
  //Arananları Storageden al

  let users = Storage.getSearchedUsersFromStorage();

  let result = "";
  users.forEach(user => {
    result += `<li class="list-group-item">${user}</li>`;
  });

  lastUsers.innerHTML = result;
}
