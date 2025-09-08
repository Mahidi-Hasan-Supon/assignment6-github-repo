// const loadByCardCategorie = (catorieId)=>{
//     console.log(catorieId)
//     fetch('https://openapi.programming-hero.com/api/plants')
//     .then(res=>res.json())
//     .then(data=>{
//         showByCardCategorie(data.plants)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// }

// const showByCardCategorie = (plants)=>{
//     cardContainer.innerHTML='';
//     console.log(plants)
//     for(let plant of plants){
//         console.log(plant)
//         cardContainer.innerHTML +=`
         
//            <div class="bg-white rounded-xl py-5 px-5 ">
//             <div >
//             <img src="${plant.image}" class="h-[250px] w-[350px]" alt="">
//             <h1 class="text-sm font-semibold">Mango Tree</h1>
//             <p class="text-sm">A fast-growing tropical tree that produces delicious,<br> juicy mangoes during summer. Its dense green</p>
//             <div class="flex justify-between">
//                 <button class="btn">Fruit Tree</button>
//                 <p><span>500</span></p>
//             </div>
//             <button class="btn rounded-3xl">Add to Cart</button>

//             </div>
//             <div class="">
//                <div>
//                 <h1></h1>
//                </div>
//             </div>
//         </div>
        
//         `
//     }
// }
