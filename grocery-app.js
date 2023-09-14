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
                console.log('Invalid Command \n');
                main();
                break;
        }
    });
}

function boughtItem(){
    rl.question('What items did you buy? \n', (itemName) => {
        for(key in groceryList){
            if(groceryList[key].name == itemName){
                console.log(`${groceryList[key].name} marked as bought \n`);
                groceryList[key].bought = true;
                main();
            }else{
                console.log("Item not on list \n")
                boughtItem();
            }
        }
    })
}

// remove item
function removeItem(){   
    rl.question('What would you like to remove? \n', (itemName) => {
        let exists = false;
        for(key in groceryList){
            if(groceryList[key].name == itemName){
                exists = true;
                console.log(`${groceryList[key].name} removed from your list \n`);
                groceryList = groceryList.filter((groceryItem) => {
                    return groceryItem.name !== itemName;
                });
                rl.question('Would you like to remove anything else? (1. Yes 2. No) \n', (ans) => {
                    if(ans == 1){
                        removeItem();
                    }else{
                        main();
                    }
                })
            }    
        }
        if(!exists){
            console.log("Item not on list \n")
            removeItem();
        }
    });
}

// add item
function addItem(){
    let item = {};    
    rl.question('What would you like to add? \n', (itemName) => {    
        rl.question('How many would you like to add? \n', (itemQuantity) => {
            rl.question('What is the price? \n', (itemPrice) => {                       
                item.name = itemName;
                item.quantity = +itemQuantity;
                item.price = +itemPrice;
                item.bought = false;
                groceryList.push(item);
                console.log(`${itemName} added to your list \n`)
                rl.question('Would you like to add anything else? (1. Yes 2. No) \n', (ans) => {
                    if(ans == 1){
                        addItem();
                    }else{
                        main();
                    }
                })
            })
        })
    });
}

