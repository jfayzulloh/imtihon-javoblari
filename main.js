const apiUrl = "https://jsonplaceholder.typicode.com/users";
const usersContainer = document.getElementById("usersContainer");
const searchInput = document.getElementById("searchInput");

let users = [];

fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    users = data;
    displayUsers(users);
  })
  .catch((error) => {
    console.error("Fetch error:", error);
    usersContainer.innerHTML = "<p>Could not load users.</p>";
  });

function displayUsers(userList) {
  usersContainer.innerHTML = "";
  userList.forEach((user) => {
    const card = document.createElement("div");
    card.classList.add("user-card");
    card.innerHTML = `
      <h2>${user.name}</h2>
      <p><strong>Username:</strong> ${user.username}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>City:</strong> ${user.address.city}</p>
    `;
    usersContainer.appendChild(card);
  });
}

searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filtered = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm)
  );
  displayUsers(filtered);
});
