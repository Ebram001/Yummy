export class Ingredients {
    constructor() {
        this.ingredientContainer = $('#ingredientContainer');
    }

    async ingredientsData() {
        this.ingredientContainer.find('.inner-loading-screen').removeClass('d-none');
        const ingredientsApi = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        const ingredientsResponse = await ingredientsApi.json();
        this.displayIngredientsData(ingredientsResponse.meals);
        this.ingredientContainer.find('.inner-loading-screen').addClass('d-none');
    }

    displayIngredientsData(meals) {
        let mealBox = ``;
        for (let i = 0; i < 20; i++) {
            const meal = meals[i];
            const description = this.truncateDescription(meal.strDescription, 20);
            const ingredientName = meal.strIngredient.toLowerCase().replace(/ /g, '_');
            mealBox += `
            <div class="col-md-3">
            <div onclick="ingredient.getIngredientMeals('${ingredientName}')" class="rounded-2 text-center cursor-pointer">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${meal.strIngredient}</h3>
                    <p>${description}</p>
            </div>
            </div>
            `;
        }
        document.getElementById('ingredientsData').innerHTML = mealBox;
    }
    
    truncateDescription(description, maxWords) {
        const words = description.split(' ');
        if (words.length > maxWords) {
            return words.slice(0, maxWords).join(' ') + '...';
        }
        return description;
    }

    async getIngredientMeals(ingredient) {
        this.ingredientContainer.find('.inner-loading-screen').removeClass('d-none');
        const ingredientMealApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const ingredientMealResponse = await ingredientMealApi.json();
        console.log(ingredientMealResponse.meals);
        this.ingredientMealsData(ingredientMealResponse.meals);
        this.ingredientContainer.find('.inner-loading-screen').addClass('d-none');
    }

    ingredientMealsData(meals) {
        let mealBox = ``;
        for (let i = 0; i < meals.length; i++) {
            const meal = meals[i];
            mealBox += `
                <div class="col-md-3">
                    <div onclick="detailsData('${meal.idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src=${meal.strMealThumb} alt="" srcset="">
                        <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                </div>
            `;
        }
        document.getElementById('ingredientsData').innerHTML = mealBox;
    }
}

