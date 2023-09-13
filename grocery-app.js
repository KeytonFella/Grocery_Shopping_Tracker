const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let groceryList = [];

console.log("Welcome to your grocery list.");

main();

function main() {
    rl.question(`
What would you like to do? (Please input number)
1. Display List
2. Add Item
3. Remove Item
4. Set Bought Items
5. Exit
`, (ans) => {
        switch (ans) {
            case "1": 
                console.log(groceryList);
                main();
                break;
            case "2": 
                addItem();
                break;
            case "3":
                removeItem();
                break; 
            case "4":
                boughtItem();
                break;
            case "5":
                rl.close();
                break;
            default:
                console.log('Invalid Command');
                main();
                break;
        }
    });
}

function boughtItem(){
    rl.question('What items did you buy?', (itemName) => {
        for(key in groceryList){
            if(groceryList[key].name == itemName){
                console.log(`${groceryList[key].name} marked as bought`);
                groceryList[key].bought = true;
                main();
            }else{
                console.log("Item not on list")
                boughtItem();
            }
        }
    })
}

// remove item
function removeItem(){   
    rl.question('What would you like to remove?', (itemName) => {
        for(key in groceryList){
            if(groceryList[key].name == itemName){
                console.log(`${groceryList[key].name} removed from list`);
                groceryList = groceryList.filter((groceryItem) => {
                    return groceryItem.name !== itemName;
                });
                main();
            }
        }
    });
}

// add item
function addItem(){
    let item = {};    
    rl.question('What would you like to add : ', (itemName) => {    
        rl.question('How many would you like to add : ', (itemQuantity) => {
            rl.question('What is the price : ', (itemPrice) => {                       
                item.name = itemName;
                item.quantity = +itemQuantity;
                item.price = +itemPrice;
                item.bought = false;
                groceryList.push(item);
                main();
            })
        })
    });
}

