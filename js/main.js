import { Area } from "./area.module.js";
import { Categories } from "./categories.module.js";
import { Contact } from "./contact.module.js";
import { Ingredients } from "./ingredients.module.js";
import { Search } from "./search.module.js";
const loading = document.querySelector('.loading-screen')
const innerLoading = document.querySelector('.inner-loading-screen')

$(document).ready(function () {
    $(".open-close-icon").click(function () {
      $(".open-close-icon").toggleClass("fa-align-justify fa-xmark");
      if (parseInt($(".side-nav-menu").css("left")) < 0) {
        $(".side-nav-menu").animate({ left: "0" });
        $("ul.list-unstyled.position-absolute").animate({ top: "0" }, 500);
      } else {
        $(".side-nav-menu").animate({ left: "-240px" });
        $("ul.list-unstyled.position-absolute").animate({ top: "200px" }, 500);

      }
    });
  
    function showContainer(containerId) {
        $("#searchContainer, #categoryContainer, #areaContainer, #ingredientContainer, #contactContainer").addClass("d-none");
        $(containerId).removeClass("d-none");
      }
      
      showContainer("#home");
      
      $(".side-nav-menu li").click(function () {
        $(".open-close-icon").toggleClass("fa-align-justify fa-xmark");
        $(".side-nav-menu").animate({ left: "-240px" });
        var menuItemId = $(this).attr("id");
        
        $("#searchContainer, #categoryContainer, #areaContainer, #ingredientContainer, #contactContainer").addClass("d-none");
        
        if (menuItemId === "search") {
          showContainer("#searchContainer");
        } else if (menuItemId === "categories") {
          showContainer("#categoryContainer");
        } else if (menuItemId === "area") {
          showContainer("#areaContainer");
        } else if (menuItemId === "ingredients") {
          showContainer("#ingredientContainer");
          $('#home').addClass('d-none');
        } else if (menuItemId === "contact") {
          showContainer("#contactContainer");
          $('#home').addClass('d-none');
        }
      });
      
  });
  

/* === Show Home Data ===*/
async function homeData(){
    loading.classList.replace('d-none', 'd-flex')
    const homeApi = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const homeResponse = await homeApi.json();
    displayHomeData(homeResponse.meals);
    loading.classList.replace('d-flex', 'd-none')
    
    console.log(homeResponse);
} 

function displayHomeData(meals) {
    let mealBox = ``;
    for (let i = 0; i < meals.length; i++) {
        mealBox += `
        <div class="col-md-3">
        <div onclick="detailsData('${meals[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
        <img class="w-100" src=${meals[i].strMealThumb} alt="" srcset="">
        <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
        <h3>${meals[i].strMeal}</h3>
        </div>
        </div>
        </div>
        `       
    };
    document.getElementById('rowData').innerHTML = mealBox;
}
homeData()


/* === Meal Details ===*/
window.detailsData = async function(mealId){
    innerLoading.classList.replace('d-none', 'd-flex')
    const detailsApi = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const detailsResponse = await detailsApi.json();
    displayDetailsData(detailsResponse.meals);
    $(".meal").addClass("hide");
    $("#detailsBox").show();
    innerLoading.classList.replace('d-flex', 'd-none') 
    $('#searchDetails').addClass('d-none');
    console.log(detailsResponse);
} 

function displayDetailsData(meals) {
    let detailsBox = `
    <div class="col-md-4">
    <img class="w-100 rounded-3" src="${meals[0].strMealThumb}" alt="">
    <h2>${meals[0].strMeal}</h2>
    </div>
    <div class="col-md-8">
    <h2>Instructions</h2>
    <p>${meals[0].strInstructions}</p>
    <h3><span class="fw-bolder">Area : </span>${meals[0].strArea}</h3>
    <h3><span class="fw-bolder">Category : </span>${meals[0].strCategory}</h3>
    <h3>Recipes :</h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">`;
    for (let i = 1; i <= 20; i++) { 
        if (meals[0][`strIngredient${i}`]) {
            detailsBox += `
            <li class="alert alert-info m-2 p-1">${meals[0][`strMeasure${i}`]}  ${meals[0][`strIngredient${i}`]}</li>
            `;
        }
    }
                detailsBox +=` </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">`
                if (meals[0].strTags) {    
                    const tagsArray = meals[0].strTags.split(',');
                    for (let i = 0; i < tagsArray.length; i++) {
                        detailsBox += `
                        <li class="alert alert-danger m-2 p-1">${tagsArray[i]}</li>
                        `;
                    }
                }
                
                detailsBox += `</ul>
                
                <a target="_blank" href=${meals[0].strSource} class="btn btn-success">Source</a>
                <a target="_blank" href=${meals[0].strYoutube} class="btn btn-danger">Youtube</a>
                </div>
                `;
                
                document.getElementById('rowData').innerHTML = detailsBox;
                document.getElementById('searchData').innerHTML = detailsBox;
                document.getElementById('categoryMealData').innerHTML = detailsBox;
                document.getElementById('areaMealData').innerHTML = detailsBox;
                document.getElementById('ingredientMealData').innerHTML = detailsBox;
}

const search = new Search()
search.selectSearch()
$(document).ready(function () {
    $("#searchByLetterInput").on("input", function () {
        innerLoading.classList.replace('d-none', 'd-flex')
        const letter = $(this).val().toLowerCase(); 
        search.searchByLetter(letter); 
        innerLoading.classList.replace('d-flex', 'd-none') 
    });
});
$(document).ready(function () {
    $("#searchByNameInput").on("input", function () {
        const word = $(this).val().toLowerCase(); 
      search.searchByName(word);
      
    });
});


const category = new Categories
category.selectCategories()
category.categoryData()

const area = new Area
area.selectArea()
area.areaData()


const ingredient = new Ingredients
ingredient.ingredientsData()
window.ingredient = ingredient;

const contact = new Contact()
