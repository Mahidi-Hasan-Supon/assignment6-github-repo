const categorieContainer = document.getElementById('categorie-container');
const cardContainer = document.getElementById('card-container');
const plantsContainer = document.getElementById('plants-container')
const cartContainer = document.getElementById('cart-container') 

let arr = []
let total = 0;

const loadcategorie = ()=>{
    
    fetch('https://openapi.programming-hero.com/api/categories')
    .then(res=>res.json())
    .then(data=>{
       
        displayloadcategorie(data.categories)
    })
    .catch((err)=>{
        console.log(err)
    })
}

// hidean click 

const hiddenbtn = (status)=>{
    if(status == true) {
        document.getElementById('hidden').classList.remove('hidden')
        document.getElementById('plants-container').classList.add('hidden')
    }else{
        document.getElementById('plants-container').classList.remove('hidden')
        document.getElementById('hidden').classList.add('hidden')

    }
}



// li all display
const displayloadcategorie=(categories)=>{
    for(let categorie of categories){
        // console.log(categorie)
        categorieContainer.innerHTML +=`
        <div>    
        <li class="hover:bg-[#15803D] hover:text-white hover:rounded-md" id="${categorie.id}">${categorie.category_name}</li>
        </div>
        `
    }

}

    categorieContainer.addEventListener('click',(e)=>{
       

        const allLi = document.querySelectorAll('li')
        allLi.forEach(li=>{
            li.classList.remove('bg-[#15803D]')
        })
        if(e.target.localName==='li'){
            // console.log(e.target.innerText)
            e.target.classList.add('bg-[#15803D],text-white')
            loadByCardCategorie(e.target.id)
            
        }
    })


const loadByCardCategorie = (id)=>{
    
    // console.log(plantsId)
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        // loadAllPlants()

        showByCardCategorie(data.plants)
    })
    .catch((err)=>{
        console.log(err)
    })
}

const showByCardCategorie = (plants)=>{
    cardContainer.innerHTML='';
    console.log(plants)

// category: "Flowering Tree"
// description: "A fragrant flowering tree that adorns gardens with its delicate white blossoms. Widely cherished in traditional rituals and perfumery."
// id: 5
//image: "https://i.ibb.co.com/qY8qS7YN/champa-min.jpg"
// name: "Champa"
// price: 300

 plantsContainer.innerHTML=''

    for(let plant of plants){
        console.log(plant)
       
        plantsContainer.innerHTML +=`
         
           <div  class="bg-white rounded-xl  p-5 rounded-lg">
            <div >
            <img src="${plant.image}" class="rounded-xl w-full h-80" alt="">
            <h1 class=" text-sm font-bold my-2 ">${plant.name}</h1>
            <p class="text-sm ">${plant.description}</p>
            <div class="flex my-3 justify-between ">
                <button class="btn bg-[#DCFCE7] text-[#15803D] rounded-4xl ">Fruit Tree</button>
                <p><i class="fa-solid fa-bangladeshi-taka-sign"></i><span>${plant.price}</span></p>
            </div>
            <button class="btn rounded-3xl w-full text-white bg-[#15803D]">Add to Cart</button>

            </div>
        </div>
        
        `
    }
}

const loadAllPlants =()=>{
    const url="https://openapi.programming-hero.com/api/plants"
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
    displayAllPlants(data.plants)
  })
}

const displayAllPlants = (trees)=>{
    
    trees.forEach(tree=>{
        console.log(tree)
        
        plantsContainer.innerHTML+=`
         <div class="bg-white rounded-xl  p-5 rounded-lg ">
            <div class="">
            <img src="${tree.image}" class="rounded-xl w-full h-80" alt="">
            <h1 class=" text-sm font-bold my-2 ">${tree.name}</h1>
            <p class="text-sm ">${tree.description}</p>
            <div class="flex my-3 justify-between ">
                <button class="btn bg-[#DCFCE7] text-[#15803D] rounded-4xl ">Fruit Tree</button>
                <div id='${tree.id}' >
                <p><i class="fa-solid fa-bangladeshi-taka-sign"></i><span>${tree.price}</span></p>
                </div>
            </div>
            <button class="btn rounded-3xl w-full text-white bg-[#15803D]">Add to Cart</button>

            </div>
        </div>
        
        `
    
    })

}

plantsContainer.addEventListener('click',(e)=>{
    // console.log(e.target.innerHTML)
    if(e.target.innerText === 'Add to Cart'){
        // console.log('lakds')
       
    }
    loadCart(e)

})

const loadCart=(e)=>{
     const name=e.target.parentNode.children[1].innerText
        const price = e.target.parentNode.children[3].innerText
        console.log(price)
        arr.push({
        name:name,
        price:price
        })
        showCart(arr)
        let totalPrice = 0;
        arr.forEach(c=>{
        totalPrice=totalPrice+c.price
        })
        total = totalPrice;

        console.log(total)

}


const showCart = (arrs)=>{
    // console.log(arrs)
    cartContainer.innerHTML="";
    for(const arr of arrs){
        console.log(arr)
        cartContainer.innerHTML+=`
       
        <div>
        <div class="bg-[#F0FDF4] rounded-xl mx-2 space-y-3 p-2">
        <h1 class="text-xl font-bold">${arr.name}</h1>
        <div class='flex gap-10' ><p class="text-sm"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${arr.price}</p>
        <span onclick=""> <i class="fa-solid fa-xmark"></i></span>
        </div>
        </div>
        <div class="mb-20 ml-30">
            <h1 id="">total:0</h1>
        </div>
        `
       
    }
     
}




loadAllPlants()

loadcategorie()