export class Area {
    constructor() {
        this.areaContainer = $('#areaContainer');
    }

    selectArea() {
        $('#area').on('click', () => {
            $('#areaContainer').removeClass('d-none');
            $('#home').addClass('d-none');
            $(".side-nav-menu").animate({ left: '-240px' });

            // Select all area items and add click event listener
            const areaItems = document.querySelectorAll('.rounded-2.cursor-pointer');
            areaItems.forEach(item => {
                item.addEventListener('click', () => {
                    const areaName = item.querySelector('h3').textContent;
                    this.getAreaMeals(areaName);
                    document.getElementById('areaData').style.display = 'none';
                });
            });
        });
    }

    async areaData() {
        this.areaContainer.find('.inner-loading-screen').removeClass('d-none');
        const areaApi = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        const areaResponse = await areaApi.json();
        this.displayAreaData(areaResponse.meals)
        this.areaContainer.find('.inner-loading-screen').addClass('d-none');
    }

    displayAreaData(meals) {
        let mealBox = ``;
        for (let i = 0; i < meals.length; i++) {
            const meal = meals[i];
            mealBox += `
            <div class="col-md-3">
            <div  class="rounded-2 text-center cursor-pointer">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3>${meals[i].strArea}</h3>
            </div>
            </div>
            `;
        }
        document.getElementById('areaData').innerHTML = mealBox;
    }

    async getAreaMeals(area) {
        const areaMealApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        const areaMealResponse = await areaMealApi.json();
        console.log(areaMealResponse.meals);
        this.areaMealsData(areaMealResponse.meals);
    }

    areaMealsData(meals) {
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
        document.getElementById('areaMealData').innerHTML = mealBox;
    }
}
