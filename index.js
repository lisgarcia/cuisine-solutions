const productCardClass = ["flex", "justify-center", "items-center", "bg-white", "shadow-lg", "hover:shadow-xl", "p-5", "text-gray", "rounded-lg", "cursor-pointer"]
const products = document.querySelector('#products')

fetch('http://localhost:3000/meals') 
    .then(resp => resp.json())
    .then(meals => meals.forEach(meal => renderMeal(meal)))

const renderMeal = (meal) => {
    const productCard = document.createElement('div');
    productCard.id = "product-card";
    productCard.classList.add(...productCardClass);
    
    const name = document.createElement('h2');
    name.textContent = meal.name;
    productCard.append(name);

    products.appendChild(productCard);
}