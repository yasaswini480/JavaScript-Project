let label = document.getElementById("label");
let shoppingca = document.getElementById("shopping-cart");
// let basket=[];
let basket= JSON.parse(localStorage.getItem("data")) || [];
let calculation = ()=>{
    let carticon = document.getElementById("cartamount");
    carticon.innerHTML= basket.map((x)=> x.item).reduce((x,y) => x + y, 0);
};
calculation();

let generateitems= ()=>{
    if(basket.length !== 0)
    {
     return (shoppingca.innerHTML = basket.map((x)=>
     {
            let {id, item} = x;
            let search = shopitemsdata.find((y)=> y.id === id) || [];
        return `
        <div class = "cart-item">
            <img width = 100 src = ${search.img} />
            <div class = "details-1">
                <div class = "title-price">
                    <h4 class = "title-price-1">  
                        <p>${search.name}</p> 
                        <p class = "price-box"> $ ${search.price}</p> 
                    </h4>             
                </div>
                
                <div class="buttons">
                    <i onClick="decrement(${id})" class="bi bi-dash"></i>
                    <div id= ${id} class="quantity">${item}</div>
                    <i onClick="increment(${id})" class="bi bi-plus"></i>
                </div>
                <h3 class= "pri">$ ${item * search.price}</h3>              
            </div>
        </div>        
        `;
     }).join(""));
    }
    else
    {
        shoppingca.innerHTML = ``;
        label.innerHTML = ` 
        <h2> Cart is empty</h2>
        <a href="index.html">
            <button class="Homebtn"> Back to home</button>
        </a>
        `;        
    }
};
generateitems();

let increment = (id)=>{
    let selecteditem = id;
    let search = basket.find((x)=>x.id === selecteditem.id);
    if(search === undefined)
    {
        basket.push({
            id: selecteditem.id,
            item: 1,    
        });
    }
    else
    {
        search.item += 1; 
    } 
    // console.log(basket); 
    update(selecteditem.id); 
    generateitems(); 
    localStorage.setItem("data", JSON.stringify(basket));
    
};
let decrement = (id)=>
{
    let selecteditem = id;
    let search = basket.find((x)=>x.id === selecteditem.id);
    if(search === undefined)
    {
        return;
    }
    else if(search.item === 0)
    {
        return;
    }
    else
    {
        search.item -= 1; 
    } 
    update(selecteditem.id);
    basket = basket.filter((x) => x.item !== 0);
    generateitems(); 
    localStorage.setItem("data", JSON.stringify(basket));
      
};
let update = (id)=>
{
    let search= basket.find((x)=> x.id === id);
    document.getElementById(id).innerHTML= search.item;
    calculation();
    totalamount();
};

// let removeitem = (id) =>
// {
//     let selecteditem = id;
//     basket = basket.filter((x) => x.id !== selecteditem.id);
//     generateitems(); 
//     totalamount();
//     localStorage.setItem("data", JSON.stringify(basket)); 
       
// }

let totalamount = () =>
{
    if(basket.length !==0)
    {
        let amount = basket.map((x) => {
            let {item, id} = x;
            let search = shopitemsdata.find((y)=> y.id === id) || [];
            return item* search.price;
        }).reduce((x,y) => x+y,0);
        label.innerHTML = `
        <h2 class = "amou"> Total Amount: $ ${amount} </h2>
        <button class = "check">
            <a type="button" href="order.html"> Checkout</a>
        </button>   
        `
    }    
    else
    {
        return;
    }
};
totalamount();