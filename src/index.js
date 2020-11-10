console.log('hello')
const recipeListUl = document.querySelector('#recipe-list')


fetch('https://api.spoonacular.com/recipes/complexSearch?query=italian&number=10&instructionsRequired=true&apiKey=fe134404e07a41228c1404b3d3c18bec')
  .then(response => response.json())
  .then(recipeArray => {
    renderRecipeList(recipeArray.results)
      console.log(recipeArray.results)
    });

// debugger
    
    recipeListUl.innerHTML = ""

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

  const renderBody = (recipeItem) => {
    const recipeLi = document.createElement("li")
    recipeLi.innerText= recipe.title
    recipeLi.dataset.id= recipe.id
    recipeListUl.append(recipeLi)
}


  recipeListUl.addEventListener('click', (event) => {
    console.log(event.target)  
    let id = event.target.dataset.id
    let idNum = parseInt(id)
    console.log(typeof idNum, idNum)  


    fetch(`https://api.spoonacular.com/recipes/648279/information&apiKey=fe134404e07a41228c1404b3d3c18bec`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    });

  })


