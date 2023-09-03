export class Categories {
    constructor() {
        this.categoryContainer = $('#categoryContainer');
    }

    selectCategories() {
        $('#categories').on('click', () => {
            $('#categoryContainer').removeClass('d-none');
            $('#home').addClass('d-none');
            $(".side-nav-menu").animate({ left: '-240px' });

            const categoryItems = document.querySelectorAll('.meal');

            // Add click event listener to each category element
            categoryItems.forEach(item => {
                item.addEventListener('click', () => {
                    const categoryName = item.querySelector('h3').textContent;
                    this.getCategoryMeals(categoryName);
                    document.getElementById('categoryData').style.display = 'none';
                });
            });
        });
    }

    async categoryData() {
        this.categoryContainer.find('.inner-loading-screen').removeClass('d-none');
        const categoryApi = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        const categoryResponse = await categoryApi.json();
        this.displayCategoryData(categoryResponse.categories);
        this.categoryContainer.find('.inner-loading-screen').addClass('d-none');
    }

    displayCategoryData(categories) {
        let mealBox = ``;
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            mealBox += `
                <div class="col-md-3">
                    <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src=${category.strCategoryThumb}  alt="" srcset="">
                        <div class="meal-layer position-absolute text-center text-black p-2">
                            <h3>${category.strCategory}</h3>
                            <p>${category.strCategoryDescription}</p>
                        </div>
                    </div>
                </div>
            `;
        }
        document.getElementById('categoryData').innerHTML = mealBox;
    }

    async getCategoryMeals(category) {
        const categoryMealApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        const categoryMealResponse = await categoryMealApi.json();
        console.log(categoryMealResponse.meals);
        this.categoryMealsData(categoryMealResponse.meals);
    }

    categoryMealsData(meals) {
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
        document.getElementById('categoryMealData').innerHTML = mealBox;
    }
}
