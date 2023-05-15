const productCardClass = ["flex", "justify-center", "items-center", "bg-white", "shadow-lg", "hover:shadow-xl", "p-5", "text-gray", "rounded-lg", "cursor-pointer"]
const products = document.querySelector('#products')

//Render Products

fetch('http://localhost:3000/meals') 
    .then(resp => resp.json())
    .then(meals => meals.forEach(meal => renderMeal(meal)))

const renderMeal = (meal) => {
    const productCard = document.createElement('div');
    productCard.className = "product-card";
    productCard.classList.add(...productCardClass);
    
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('product-img');
    const image = document.createElement('img');
    image.src = meal.img;
    imgDiv.append(image);
    productCard.append(imgDiv);

    const nameDiv = document.createElement('div');
    nameDiv.classList.add('product-name');

    const name = document.createElement('h2');
    name.textContent = meal.name;
    nameDiv.append(name);
    productCard.append(nameDiv);

    productCard.addEventListener('click', () => renderSelection(meal))

    products.appendChild(productCard);

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('favorite');
    const favoriteBtn = document.createElement('button');
    favoriteBtn.textContent = "Add to Favorite";
    buttonDiv.append(favoriteBtn);
    productCard.append(buttonDiv);
}

//Selected Products Section
//create 1 div per column, 1st div would contain an image, second div, add this class col-span-2 to the second column 

const selection = document.querySelector('#selection')

function renderSelection(meal) {
    const selectionImg = document.querySelector('.selected-meal-img')
    selectionImg.src = meal.img

    const selectionName = document.querySelector('.selection-name')
    selectionName.textContent = meal.name

    const selectionInstructions = document.querySelector('.selection-instructions')

    for (i = 0; i < meal.instructions.length; i++) {
        const instructions = document.createElement('div')
        instructions.id = 'instructions'

        const heatMethod = document.createElement('h3')
        heatMethod.textContent = meal.instructions[i].heatMethod

        const temperature = document.createElement('p')
        temperature.textContent = `${meal.instructions[i].temperatureF}` + String.fromCharCode(176) + 'F'
        
        const cookTime = document.createElement('p')
        cookTime.textContent = `${meal.instructions[i].frozenTime} minutes from frozen, or ${meal.instructions[i].thawedTime} minutes thawed`
        
        instructions.append(heatMethod, temperature, cookTime)
        selectionInstructions.append(instructions)
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
}