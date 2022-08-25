let addToy = false;
const toyCollection = document.getElementById("toy-collection");
let likeBtn,card;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetchRequest();
});

function fetchRequest() {
  fetch("http://localhost:3000/toys")
    .then((resp) => resp.json())
    .then((data) => {
      addNewToy(data);
    });
}

const appendImage = (toy) => {
  let number = toy.likes;
   card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
<h2>${toy.name}</h2>
<img src=${toy.image} class="toy-avatar" />
<p>${number} Likes</p>
<button class="like-btn" id="${toy.id}">Like ❤️</button>
`;
  toyCollection.appendChild(card);
  likeBtn = document.getElementById(`${toy.id}`);
  likeBtn.addEventListener("click", function () {
    updateCount(toy.id,number);
  });
};

function addNewToy(toys) {
  toys.map(appendImage);
}

const form = document.getElementsByClassName("add-toy-form")[0];
form.addEventListener("submit", (event) => {
  event.preventDefault();

  let name = form[0].value;
  let imageSrc = form[1].value;
  console.log(name);
  console.log(imageSrc);

  createToy(name, imageSrc);
});

function createToy(name, url) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: `${name}`,
      image: `${url}`,
      likes: 4,
    }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      appendImage(data);
    });
}

function updateCount(num,likesMade) {
  card.querySelector("p").textContent = `${likesMade++} Likes`;
  fetch(`http://localhost:3000/toys/${num}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    body: JSON.stringify({
      likes: likesMade,
    }),
  })

  .then(resp=>resp.json())
  .then((data)=>{
console.log(data.likes)
  })
}
