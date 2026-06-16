let recipes = [
  {
    id: 1,
    name: "Fluffy Pancake",
    category: "Breakfast",
    ingredients: ["Flour", "Egg", "Milk", "Butter"],
    cookingTime: 20,
    instructions: [
      "1. Place 1 cup of flour in a mixing bowl.",
      "2. Add 1 egg, 3/4 cup of milk, and 2 tablespoons of melted butter to the flour.",
      "3. Mix the ingredients until a smooth batter is formed.",
      "4. Heat a pan over medium heat and lightly grease it with butter.",
      "5. Pour an appropriate amount of batter into the pan to form a pancake.",
      "6. Cook the pancake until bubbles appear on the surface, then flip it over.",
      "7. Cook the other side until it turns golden brown.",
      "8. Repeat the process until all the batter has been used.",
      "9. Serve the pancakes while warm",
    ],
  },
];

const categoryEmoji = {
  Breakfast: "🍳",
  Lunch: "🥗",
  Dinner: "🍝",
  Dessert: "🍰",
  Drinks: "🥤",
};

let editingId = null;

const cardsContainer = document.querySelector(".cards-container");

// Render ng Recipes
function renderRecipes(list) {
  const saveText = document.querySelector(".save-text");

  saveText.textContent = recipes.length + " recipes saved!";

  cardsContainer.innerHTML = "";

  list.forEach((recipe) => {
    const card = document.createElement("article");
    card.classList.add("recipe-card-container");
    card.dataset.id = recipe.id;
    card.innerHTML = `
         <h1 class="emoji-display">${categoryEmoji[recipe.category]}</h1>
         <h2 class="dish-title">${recipe.name.charAt(0).toUpperCase() + recipe.name.slice(1)}</h2>
          <p class="details-text">${recipe.ingredients.length} ingredients · ${recipe.cookingTime} mins</p>
          <p class="ingredients-text">${recipe.ingredients.join(", ")}</p>
          <div class="card-footer">
          <p class="dish-type-text">${recipe.category}</p>
          <div class="btn-container">
                <button class="edit-btn" data-id="${recipe.id}">✏️</button>
                <button class="delete-btn" data-id=${recipe.id}>🗑️</button>
              </div>
          </div>
        `;
    cardsContainer.appendChild(card);
  });

  const editBtns = document.querySelectorAll(".edit-btn");

  editBtns.forEach((edit) => {
    edit.addEventListener("click", (e) => {
      e.stopPropagation();
      const selectedEditBtn = Number(edit.dataset.id);

      const match = recipes.find((recipe) => {
        return recipe.id === selectedEditBtn;
      });

      recipeName.value = match.name;
      recipeCategory.value = match.category;
      recipeTime.value = match.cookingTime;
      recipeIngredients.value = match.ingredients.join("\n");
      recipeInstructions.value = match.instructions.join("\n");

      editingId = match.id;
      modalOverlay.style.display = "flex";
    });
  });

  const deleteBtns = document.querySelectorAll(".delete-btn");

  deleteBtns.forEach((del) => {
    del.addEventListener("click", (e) => {
      e.stopPropagation();
      const selectedDelBtn = Number(del.dataset.id);

      const match = recipes.filter((recipe) => {
        return recipe.id !== selectedDelBtn;
      });

      recipes = match;
      renderRecipes(match);
    });
  });

  const detailName = document.getElementById("detail-name");
  const detailCategory = document.getElementById("detail-category");
  const detailTime = document.getElementById("detail-time");
  const detailIngredients = document.getElementById("detail-ingredients");
  const detailInstructions = document.getElementById("detail-instructions");

  const cardClick = document.querySelectorAll(".recipe-card-container");

  cardClick.forEach((card) => {
    card.addEventListener("click", () => {
      const selectedCard = Number(card.dataset.id);

      const match = recipes.find((recipe) => {
        return recipe.id === selectedCard;
      });

      detailName.textContent = match.name.charAt(0).toUpperCase() + match.name.slice(1);
      detailCategory.textContent = match.category;
      detailTime.textContent = match.cookingTime;
      detailIngredients.textContent = match.ingredients.join(", ");
      detailInstructions.innerHTML = `<ol>${match.instructions.map((step) => `<li>${step}</li>`).join("")}</ol>`;
      cardOverlay.style.display = "flex";
    });
  });
}

renderRecipes(recipes);

// Open and Close ng buttons
const addBtn = document.getElementById("add-recipe-btn");
const closeBtn = document.getElementById("close-btn");
const cancelBtn = document.getElementById("cancel-btn");
const modalOverlay = document.getElementById("modal-overlay");
const saveBtn = document.getElementById("save-recipe-btn");
const recipeName = document.getElementById("recipe-name-text");
const recipeCategory = document.getElementById("recipe-category-text");
const recipeTime = document.getElementById("recipe-time-text");
const recipeIngredients = document.getElementById("recipe-ingredients-text");
const recipeInstructions = document.getElementById("recipe-instructions-text");
const errorMessage = document.querySelector(".error-message");
const cardOverlay = document.getElementById("detail-modal-overlay");
const detailCloseBtn = document.getElementById("close-detail-btn");

addBtn.addEventListener("click", () => {
  modalOverlay.style.display = "flex";
  editingId = null;
  clearInputs();
});

closeBtn.addEventListener("click", () => {
  modalOverlay.style.display = "none";
  editingId = null;
  clearInputs();
});

cancelBtn.addEventListener("click", () => {
  modalOverlay.style.display = "none";
  editingId = null;
  clearInputs();
});

detailCloseBtn.addEventListener("click", () => {
  cardOverlay.style.display = "none";
  editingId = null;
  clearInputs();
});

// Save Button dito
saveBtn.addEventListener("click", () => {
  const name = recipeName.value.trim();
  const category = recipeCategory.value.trim();
  const time = recipeTime.value.trim();
  const ingredients = recipeIngredients.value.trim();
  const instructions = recipeInstructions.value.trim();

  if (!name || !category || !time || !ingredients || !instructions) {
    alert("Please input all fields!");
    return;
  }

  if (editingId !== null) {
    const recipeToEdit = recipes.find((recipe) => {
      return recipe.id === editingId;
    });
    recipeToEdit.name = name;
    recipeToEdit.category = category;
    recipeToEdit.cookingTime = time;
    recipeToEdit.ingredients = ingredients.split("\n");
    recipeToEdit.instructions = instructions.split("\n");
  } else {
    const newRecipe = {
      id: Date.now(),
      name: name,
      category: category,
      ingredients: ingredients.split("\n"),
      cookingTime: time,
      instructions: instructions.split("\n"),
    };
    recipes.push(newRecipe);
  }

  renderRecipes(recipes);
  modalOverlay.style.display = "none";
  recipeName.value = "";
  recipeCategory.value = "";
  recipeTime.value = "";
  recipeIngredients.value = "";
  recipeInstructions.value = "";

  editingId = null;
});

// Filter dito
const filterBtn = document.querySelectorAll(".filter-button");

filterBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selected = btn.textContent;

    const filtered = recipes.filter((recipe) => {
      return recipe.category === selected;
    });

    filterBtn.forEach((b) => {
      b.classList.remove("active");
    });

    btn.classList.add("active");

    if (selected === "All") {
      renderRecipes(recipes);
    } else if (filtered.length === 0) {
      cardsContainer.innerHTML = `<p class="no-recipes">No recipes available!</p>`;
    } else {
      renderRecipes(filtered);
    }
  });
});

// Search dito
const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", () => {
  const search = searchInput.value.toLowerCase().trim();

  const match = recipes.filter((recipe) => {
    return recipe.name.toLowerCase().includes(search);
  });

  if (match.length === 0) {
    cardsContainer.innerHTML = `<p class="no-recipes">No recipes available!</p>`;
    return;
  }
  renderRecipes(match);
});

function clearInputs() {
  recipeName.value = "";
  recipeCategory.value = "";
  recipeTime.value = "";
  recipeIngredients.value = "";
  recipeInstructions.value = "";
}
