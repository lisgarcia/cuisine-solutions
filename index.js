const productCardClass = ["flex", "justify-center", "items-center", "bg-white", "shadow-lg", "hover:shadow-xl", "p-5", "text-gray", "rounded-lg", "cursor-pointer"]
const products = document.querySelector('#products')
const topnav = document.querySelector('.topnav')

//Render Products

const url = 'http://localhost:3000/meals'


fetch('http://localhost:3000/meals') 
    .then(resp => resp.json())
    .then(meals => {
        meals.forEach(meal => renderMeal(meal));
        filterProduct(meals);
        // searchProduct(meals);
    })


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

    favoriteBtn.addEventListener('click', (e) => addFavorite(e, meal))

    buttonDiv.append(favoriteBtn);
    productCard.append(buttonDiv);
}
//add to favorite button
    const dropDown = document.querySelector('.dropdown-content')
    const favoriteList = document.createElement('ul')
    const empty = document.querySelector('#empty')

    function addFavorite(e, meal) {
        e.stopPropagation()
        empty.style.display="none";
        let newFavorite = document.createElement('p')  
        newFavorite.setAttribute('class', 'newFavorite')
        newFavorite.textContent = meal.name 
        
        const delBtn = document.createElement('button');
        delBtn.textContent = "X";
        delBtn.className = "del";
        
        console.log(newFavorite)
        newFavorite.addEventListener('click', () => {
            return renderSelection(meal)
        })

        favoriteList.append(newFavorite)
        
        newFavorite.append(delBtn)
        dropDown.append(favoriteList)

        delBtn.addEventListener('click', (e) =>{
            e.stopPropagation()
            newFavorite.remove();
            if (!document.querySelector('.newFavorite')) {
                empty.style.display = "inline-block";
            }
        })
    }

///=======================favorite heart
    let heartBtn = document.querySelector('#favorite')
    const dropdownDiv = document.querySelector('#dropdown')

    heartBtn.addEventListener('mouseover', () =>{
        dropdownDiv.style.display = "inline-block";
    })
    dropDown.addEventListener('mouseleave', () => {
        dropdownDiv.style.display = "none";
    })
// heartBtn.append(dropDown)
// console.log(e)
// })


function renderFavorites(meal) {

}

//target 

//What are you cooking today section

const productDropDown = document.querySelector('#product-type');
const form = document.querySelector('#product-filter')

const filterProduct = (meals) => {
    productDropDown.addEventListener('change', (event) => {
        const productType = event.target.value;
        const filteredProducts = meals.filter(meal => meal.type === productType);
        console.log(filteredProducts)
        renderFilteredProducts(filteredProducts);
        if (productType === "all") {
            meals.forEach(meal => renderMeal(meal))
        }
    })

    form.addEventListener('submit', (e) => handleSubmit(e))

    function handleSubmit(e) {
        e.preventDefault();
        const input = e.target.name.value.toLowerCase();
        function searchProducts(input) {
            const term = input.toLowerCase();
            const filteredProducts = meals.filter(meal => {
                return meal.name.toLowerCase().includes(term)
                }
            );
            return filteredProducts;
            }

        const filteredProducts = searchProducts(input);
        console.log(filteredProducts);

        if (filteredProducts.length > 0) {
            renderFilteredProducts(filteredProducts);
            
        } else {
            products.innerHTML = "";
            const result = document.createElement('h2');
            result.textContent = "No Products Found";
            result.id = "result"
            products.appendChild(result);
        }
        form.reset();
        if (!document.getElementById("clear")) {
            const div = document.querySelector('#product-filter');
            const clearBtn = document.createElement('button');
            clearBtn.textContent = "Clear Search"
            div.appendChild(clearBtn);
            clearBtn.id = "clear";
            // clearBtn.style.marginTop = "30px"
            clearBtn.addEventListener('click', () => {
                meals.forEach(meal => renderMeal(meal));
                clearBtn.remove();
                // const result = document.querySelector('#result');
                // result.remove();
            })
        }
      
    }       
}

const renderFilteredProducts = (meals) => {
    products.innerHTML = '';
    meals.forEach(meal => renderMeal(meal))
}


//Selected Products Section
//create 1 div per column, 1st div would contain an image, second div, add this class col-span-2 to the second column 

const selection = document.querySelector('#selection')

function renderSelection(meal) {
    selection.style.display = 'block'

    const selectionImg = document.querySelector('.selected-meal-img')
    selectionImg.src = meal.instructionImg

    selectionImg.addEventListener('click', () => openModal(meal))

    const selectionName = document.querySelector('.selection-name')
    selectionName.textContent = meal.name

    const selectionInstructions = document.querySelector('.selection-instructions')

    selectionInstructions.textContent="";

    for (i = 0; i < meal.instructions.length; i++) {
        const instructions = document.createElement('div')
        instructions.id = 'instructions'

        const heatMethod = document.createElement('h3')
        heatMethod.textContent = meal.instructions[i].heatMethod

        const temperature = document.createElement('p')
        if (meal.instructions[i].temperatureF === undefined) {
            temperature.textContent = ''
        } else {
            temperature.textContent = `${meal.instructions[i].temperatureF}` + String.fromCharCode(176) + 'F'
        }
        
        const cookTime = document.createElement('p')
        cookTime.textContent = `${meal.instructions[i].frozenTime} minutes from frozen, or ${meal.instructions[i].thawedTime} minutes thawed`
        
        instructions.append(heatMethod, temperature, cookTime)
        selectionInstructions.append(instructions)
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
}

function openModal() {
    const modal = document.querySelector('#modal-image')
    const modalImg = document.querySelector('.modal-content')
    const selectionImg = document.querySelector('.selected-meal-img')
    modal.style.display = "block";
    modalImg.src = selectionImg.src;
    
    const close = document.querySelector('.close-modal')
    close.addEventListener('click', closeModal)
}

function closeModal() {
    const modal = document.querySelector('#modal-image')
    modal.style.display = "none";
}