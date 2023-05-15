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

