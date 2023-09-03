let lastEnteredLetter = "";
let lastEnteredWord = "";
export class Search{
    constructor(){}

    selectSearch(){
        $('#search').on('click' ,function(){
            $('#searchContainer').removeClass('d-none');
            $('#home').addClass('d-none');
            // $(".open-close-icon").toggleClass("fa-align-justify fa-xmark");
            $(".side-nav-menu").animate({left: '-240px'});
            
        })
    }
    async searchByLetter(letter){
        const searchLetter = letter || lastEnteredLetter;
        $("#searchContainer .inner-loading-screen").removeClass('d-none');
        const searchByFLetter = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchLetter}`);
        const searchLetterResponse = await searchByFLetter.json();
        this.displaySearchData(searchLetterResponse.meals);
        console.log(searchLetterResponse.meals)
        $("#searchContainer .inner-loading-screen").addClass('d-none');
        lastEnteredLetter = letter;
        } 
    async searchByName(word){
        const searchWord = word || lastEnteredWord;
        $("#searchContainer .inner-loading-screen").removeClass('d-none');
        const searchByName = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`);
        const searchNameResponse = await searchByName.json();
        this.displaySearchData(searchNameResponse.meals);
        $("#searchContainer .inner-loading-screen").addClass('d-none');
        lastEnteredWord = word;
        } 
    
     displaySearchData(meals) {
        let mealBox = ``;
        for (let i = 0; i < meals.length; i++) {
            mealBox += `
            <div class="col-md-3">
                  <div onclick="detailsData('${meals[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                      <img class="w-100" src=${meals[i].strMealThumb} alt="">
                      <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                          <h3>${meals[i].strMeal}</h3>
                      </div>
                  </div>
          </div>
            `       
        };
     document.getElementById('searchData').innerHTML = mealBox;
    }
}