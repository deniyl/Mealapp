// meal.js (Combined for Search Page and Meal Detail Page)

const searchInput = document.getElementById("search-input");
const mealList = document.getElementById("meal-list");
const favoritesList = document.getElementById("favorites-list");
const mealDetail = document.querySelector(".meal-detail");
const backButton = document.getElementById("back-button");
const mealImage = document.getElementById("meal-image");
const mealName = document.getElementById("meal-name");
const mealInstructions = document.getElementById("meal-instructions");

const favorites = []; // Array to store favorite meals

// Function to fetch and display meal data
async function searchMeals(query) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();

        // Clear previous results
        mealList.innerHTML = '';

        if (data.meals) {
            data.meals.forEach((meal) => {
                const li = document.createElement("li");

                // Create an <img> element for the meal's image
                const img = document.createElement("img");
                img.src = meal.strMealThumb;
                img.alt = meal.strMeal;
                img.style.width = "80px"; // Make the searched meal picture smaller

                // Create a "Favorite" button for each meal
                const favoriteBtn = document.createElement("button");
                favoriteBtn.textContent = "Favorite";
                favoriteBtn.addEventListener("click", () => addToFavorites(meal));

                // Append the image, meal name, and button to the list item
                li.appendChild(img);
                li.appendChild(document.createTextNode(meal.strMeal));
                li.appendChild(favoriteBtn);

                // Add a click event listener to display meal details
                li.addEventListener("click", () => displayMealDetail(meal));

                mealList.appendChild(li);
            });
        } else {
            mealList.innerHTML = '<li>No results found</li>';
        }

        // Hide the meal detail section
        mealDetail.style.display = "none";
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

// Function to add a meal to favorites
function addToFavorites(meal) {
    favorites.push(meal);
    updateFavoritesList();
}

// Function to update the favorites list
function updateFavoritesList() {
    favoritesList.innerHTML = '';
    favorites.forEach((meal) => {
        const li = document.createElement("li");
        li.textContent = meal.strMeal;

        // Create a "Remove" button for each favorite meal
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => removeFromFavorites(meal));

        li.appendChild(removeBtn);
        favoritesList.appendChild(li);
    });
}

// Function to remove a meal from favorites
function removeFromFavorites(meal) {
    const index = favorites.indexOf(meal);
    if (index !== -1) {
        favorites.splice(index, 1);
        updateFavoritesList();
    }
}

// Event listener for search input
searchInput.addEventListener("input", (event) => {
    const query = event.target.value;
    if (query.length >= 3) {
        searchMeals(query);
    }
});

// Event listener for back button in meal detail
backButton.addEventListener("click", () => {
    // Hide the meal detail section and show the search results
    mealDetail.style.display = "none";
    mealList.style.display = "block";
});

// Function to display meal detail
function displayMealDetail(meal) {
    mealImage.src = meal.strMealThumb;
    mealImage.alt = meal.strMeal;
    mealName.textContent = meal.strMeal;
    mealInstructions.textContent = meal.strInstructions;

    // Hide the search results and show the meal detail
    mealList.style.display = "none";
    mealDetail.style.display = "block";
}
