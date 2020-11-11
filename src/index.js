//console.log('hello')
const recipeListUl = document.querySelector('#recipe-list')
const cuisineNav = document.querySelector('.cuisine-nav')


fetch('http://localhost:3000/api/v1/recipes')
  .then(response => response.json())
  .then(myRecipeListArray => {
    mRList(myRecipeListArray)
  })



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
  if (event.target.matches('span')){
  const cuisine = event.target.innerText
  const cuisineL = cuisine.toLowerCase()
  // console.log(cuisineL)
  
  recipeListUl.innerHTML = ""

   fetch(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisineL}&instructionsRequired=true&number=10&apiKey=b0d50cace88e4214aab6bf3c2bc47dac`)
   .then(response => response.json())
   .then(recipeArray => {
     renderRecipeList(recipeArray.results)
    //  console.log(recipeArray)
    });
  }
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

    const mainBody =document.querySelector('main')

    const addToRecipeBtn = document.createElement('button')
    addToRecipeBtn.innerText = "Add to Recipe List"
    addToRecipeBtn.id = "add-to-recipe-list-btn"

    mainBody.append(addToRecipeBtn)

    // console.log(recipeItem[0].ingredients)


    recipeItem[0].extendedIngredients.forEach(ingredient => {
      const ingredientLi = document.createElement('li')
      ingredientLi.innerHTML = `
      <span class= "ingredient.quantity">  ${ingredient.amount}</span>
      </span> <span class= "ingredient.unit"> ${ingredient.unit}</span> 
      <span class= "ingredient.name">${ingredient.name}</span>
      `
      const currentIngredientObj = {
        name: ingredient.name, 
        unit: ingredient.unit,
        quantity: ingredient.amount
      }
      ingredientHash.push(currentIngredientObj)

      
      recipeIngredientsUl.append(ingredientLi)
    })
    // console.log(ingredientHash)
  }
  
  let ingredientHash = []
  
  recipeListUl.addEventListener('click', (event) => {

    // console.log(event.target)  
    let id = event.target.dataset.id
    let idNum = parseInt(id)
    // console.log(typeof idNum, idNum)  


    fetch(`https://api.spoonacular.com/recipes/informationBulk?apiKey=b0d50cace88e4214aab6bf3c2bc47dac&ids=${idNum}`)
    .then(response => response.json())       
    .then(recipeItem => {
      renderBody(recipeItem)
        // console.log(recipeItem)
        // console.log(recipeItem[0].title)
    });
   
    const addButton = document.querySelector('#add-to-recipe-list-btn')
    
    addButton.addEventListener('click', (event) => {
      const rImage = document.querySelector('.main-image').src
      const rTitle= document.querySelector('.recipe-title').innerText
      const rDescription = document.querySelector('.recipe-description').innerText
      //const rIngredientsUl = document.querySelector('.ingredient-list').innerText
      const rInstructions = document.querySelector('.recipe-instructions').innerText
    
    
      // console.log(rImage)
    
      const recipeObj = {
        name: rTitle, 
        description: rDescription, 
        image: rImage, 
        instructions: rInstructions, 
        comment: ""
      }
    
          fetch('http://localhost:3000/api/v1/recipes', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recipeObj),
        })
        .then(response => response.json())
        .then(newRecipeObject => {
          renderMyRecipeList(newRecipeObject)
          // console.log('Success:', newRecipeObject);
        })
    
       const myRecipeUl = document.querySelector('.my-recipe-list')
      //  const ulInnerText = myRecipeUl.innerText 
       const ulLastChild = myRecipeUl.lastElementChild.dataset.id
       const recipeId = parseInt(ulLastChild) + 1
      //  console.log(ulLastChild)
        // debugger
        ingredientHash.forEach((ingredient)  => {
          const ingredientObj= {
            name: ingredient.name, 
            quantity: ingredient.quantity, 
            unit: ingredient.unit, 
            recipe_id: recipeId
          }
    
          console.log(ingredientObj)
    
          //  debugger
          fetch('http://localhost:3000/api/v1/ingredients', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingredientObj)
          })
        
          .then(response => response.json())
          .then(newIngredientObj => {
            console.log('Success:', newIngredientObj);
          })
    
        })
    
    })
  })
  



const myRecipeList =document.querySelector('.my-recipe-list')

const mRList = (myRecipeArray) => {
  myRecipeArray.forEach(renderMyRecipeList)
}

const renderMyRecipeList = (newRecipeObject) => {
  const myRecipeLi = document.createElement("li")
  myRecipeLi.innerText= newRecipeObject.name
  myRecipeLi.dataset.id= newRecipeObject.id
  myRecipeList.append(myRecipeLi)
}

