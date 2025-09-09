const categorieContainer = document.getElementById('categorie-container');
const cardContainer = document.getElementById('card-container');
const plantsContainer = document.getElementById('plants-container')
const cartContainer = document.getElementById('cart-container') 

const chosecontainer = document.getElementById('chose-container')


const totalCount = document.getElementById('totalCount')
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
    console.log(status)
    if(status == true) {
        document.getElementById('spainer').style.display ='block'
        document.getElementById('card-container').style.display='none'
    }else{
        document.getElementById('card-container').style.display ='block'
        document.getElementById('spainer').style.display='none'

    }
}
// const hiddenbtn = (status)=>{
//     if(status == true) {
//         document.getElementById('hidden').classList.remove('hidden')
//         document.getElementById('plants-container').classList.add('hidden')
//     }else{
//         document.getElementById('plants-container').classList.remove('hidden')
//         document.getElementById('hidden').classList.add('hidden')

//     }
// }



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
    hiddenbtn(true)
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
    hiddenbtn(false)
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
         
           <div class="bg-white rounded-xl  p-5 rounded-lg">
            <div>
            <img src="${plant.image}" class="rounded-xl w-full h-80" alt="">
            <h1 class=" text-sm font-bold my-2 ">${plant.name}</h1>
            <p class="text-sm ">${plant.description}</p>
            <div class="flex my-3 justify-between">
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
     hiddenbtn(true)
    const url="https://openapi.programming-hero.com/api/plants"
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
    displayAllPlants(data.plants)
  })
   hiddenbtn(false)
}

const displayAllPlants = (trees)=>{
    
    trees.forEach(tree=>{
        console.log(tree)
        
        plantsContainer.innerHTML+=`
         <div class="bg-white rounded-xl  p-5 rounded-lg ">
            <div class="" id='${tree.id}'>
            <img src="${tree.image}" class="rounded-xl w-full h-80" alt="">
            <h1 onclick="loadmodal(${tree.id})" class=" text-sm font-bold my-2 ">${tree.name}</h1>
            <p class="text-sm ">${tree.description}</p>
            <div class="flex my-3 justify-between ">
                <button class="btn bg-[#DCFCE7] text-[#15803D] rounded-4xl ">Fruit Tree</button>
                <div id='${tree.id}' >
                <p><i class="fa-solid fa-bangladeshi-taka-sign"></i><span class="treeprice">${tree.price}</span></p>
                </div>
            </div>
            <button class="btn rounded-3xl w-full text-white bg-[#15803D]">Add to Cart</button>

            </div>
        </div>
        
        `
    
    })

}






// modal
const loadmodal =(id)=>{
    const url =`https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(url)
    // console.log(url)
    .then(res=>res.json())
    .then(data =>displayloadmodal(data.plants))
}
const displayloadmodal = (modals)=>{
    console.log(modals)

// category:"Fruit Tree"
// description:"A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals."
// id: 1
// image: "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg"
// name: "Mango Tree"
// price: 500
    const modalcontainer = document.getElementById('modal-container')
    modalcontainer.innerHTML = `
     <div class='space-y-3'>
      <h1 class="text-xl font-bold">${modals.name}</h1>
      <img src="${modals.image}" class="rounded-xl w-full h-80" alt="">
      <p class="text-lg font-bold">Categorie:${modals.category}</p>
      <p class="text-lg font-bold">Price:${modals.price}</p>
      <p class="text-lg font-bold">Description:${modals.description}</p>
    </div>
    `
    document.getElementById('world_modal').showModal()
}



plantsContainer.addEventListener('click',(e)=>{

    // console.log(e.target.innerHTML)
    if(e.target.innerText === 'Add to Cart'){
        loadCart(e)
        
        // console.log('lakds')
         alert('added tree your cart........')
       
    }
    
   
    

})

const loadCart=(e)=>{
     const name=e.target.parentNode.children[1].innerText
        const price = e.target.parentNode.children[3].children[1].children[0].children[1].innerText
        console.log(price)
        const id = e.target.parentNode.id
        console.log(id)
        
        arr.push({
        name:name,
        price:parseInt(price),
        id:id
        })
        console.log(arr)
        showCart(arr)
        let totalPrice = 0;
        arr.forEach(c=>{
        totalPrice=totalPrice+c.price
        })
        total = totalPrice;
        document.getElementById('totalCount').innerText=total
        console.log(total)

}




const showCart = (arrs)=>{
    // console.log(arrs)
    cartContainer.innerHTML="";
    for(const arr of arrs){
        console.log(arr)
        cartContainer.innerHTML+=`
       
       <div class="">
        <div>
        <div class="bg-[#F0FDF4] rounded-xl mx-2  p-2">
        <h1 class="text-xl font-bold">${arr.name}</h1>
        <div class='flex gap-25' ><p class="text-sm"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${arr.price}</p>
        <span onclick="loadDeletebtn('${arr.id}')" class=" rounded-2xl bg-whit-300 hover:bg-green-700" "> <i class="fa-solid fa-xmark"></i></span>
        </div>
        </div>
       
       </div>
        `
       
    }
    // totalCount.innerText = arr.length
     
}

const loadDeletebtn = (deleteId)=>{
    const filterId = arr.filter(arr=>arr.id !== deleteId)
     arr = filterId 
     showCart(arr)
    
}


// const hiddenbtn = ()=>{
//     categorieContainer.innerHTML=`
//     <span  class="loading loading-dots loading-xl ml-150 mt-50"></span>
//     `

// }




loadAllPlants()

loadcategorie()