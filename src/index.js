console.log('hello')
const recipeListUl = document.querySelector('#recipe-list')
const cuisineNav = document.querySelector('.cuisine-nav')

const renderRecipeList = (recipeArray) => {
    // recipeListUl.innerHTML = ""
    recipeArray.forEach(renderARecipe)
}

const renderARecipe = (recipe) => {
    const recipeLi = document.createElement("li")
    recipeLi.innerText= recipe.title
    recipeLi.dataset.id= recipe.id
    recipeListUl.append(recipeLi)
}

cuisineNav.addEventListener('click', (event) => {
  const cuisine = event.target.innerText
  const cuisineL = cuisine.toLowerCase()
  console.log(cuisineL)
  
  recipeListUl.innerHTML = ""

   fetch(`https://api.spoonacular.com/recipes/random?number=10&tags=${cuisineL}&apiKey=d9fc05856dc740d7a5b96b73e51c40ba`)
   .then(response => response.json())
   .then(recipeArray => {
     renderRecipeList(recipeArray.recipes)
     console.log(recipeArray.recipes)
    });
  })


  const renderBody = (recipeItem) => {
   const recipeImage = document.querySelector('.main-image')
   const recipeTitle= document.querySelector('.recipe-title')
   const recipeDescription = document.querySelector('.recipe-description')
   const recipeIngredientsUl = document.querySelector('.ingredient-list')
   const recipeInstructions = document.querySelector('.recipe-instructions')
   

   recipeImage.src= recipeItem[0].image
    recipeTitle.innerText= recipeItem[0].title
    recipeDescription.innerText= recipeItem[0].summary
    recipeInstructions.innerText= recipeItem[0].instructions

    recipeIngredientsUl.innerHTML = ""

    // console.log(recipeItem[0].ingredients)


    recipeItem[0].extendedIngredients.forEach(ingredient => {
      const ingredientLi = document.createElement('li')
      ingredientLi.innerHTML = `
      <span class= "ingredient.quantity">  ${ingredient.amount}</span>
      </span> <span class= "ingredient.unit"> ${ingredient.unit}</span> 
      <span class= "ingredient.name">${ingredient.name}</span>
      `
      recipeIngredientsUl.append(ingredientLi)
    })
}

  recipeListUl.addEventListener('click', (event) => {
    console.log(event.target)  
    let id = event.target.dataset.id
    let idNum = parseInt(id)
    console.log(typeof idNum, idNum)  


    fetch(`https://api.spoonacular.com/recipes/informationBulk?apiKey=d9fc05856dc740d7a5b96b73e51c40ba&ids=${idNum}`)
    .then(response => response.json())       
    .then(recipeItem => {
      renderBody(recipeItem)
        console.log(recipeItem)
        console.log(recipeItem[0].title)
    });

  })

