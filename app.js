//Const declarations
const DESCRIPTION_INPUT = document.querySelector("#description-text");      //Text input: 'Description'
const AMOUNT_INPUT = document.querySelector("#amount-text");                //Text input: 'Amount'

const INCOME_RADIO = document.querySelector("#income-radio");               //Radio input: 'Income'
const EXPENSE_RADIO = document.querySelector("#expense-radio");  s           //Radio input: 'Expense'

const INCOME_TABLE_BODY = document.querySelector("#income-table-body");     //'Income' table body
const EXPENSE_TABLE_BODY = document.querySelector("#expense-table-body");   //'Expense' table body

const ADD_FORM = document.querySelector("#add-form");                       //Form: 'Add'

const CLEAR_BUTTON = document.querySelector("#clear-button");               //Button: 'Clear'

// Initial settings
INCOME_RADIO.checked = true; //Checks income radio button
DESCRIPTION_INPUT.focus();   //Focus on 'Description' text input

// Takes user input to create new elements into either 'Income' or 'Expenses' table on page
let createItem = function(descriptionInput, amountInput){

    // Creates new table row with two table cells
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    // Creates class to table row
    tr.classList.add("added-row");
    //Inserts user text input into table cells. 'Description'-input into first, 'Amount'-input into second.
    td1.innerText = descriptionInput.value;
    td2.innerText = amountInput.value;
    //Adds classes depending on which radio button is checked
    if (INCOME_RADIO.checked === true){
        td1.classList.add("income-description");
        td2.classList.add("income-amount");
    } else if (EXPENSE_RADIO.checked === true){
        td1.classList.add("expense-description");
        td2.classList.add("expense-amount");
    }
    //Inserts both table cells in table row
    tr.appendChild(td1);
    tr.appendChild(td2);
    //Inserts new table row into 'Income' or 'Expense' table body
    if (INCOME_RADIO.checked == true){
        INCOME_TABLE_BODY.appendChild(tr);
    } else if (EXPENSE_RADIO.checked == true){
        EXPENSE_TABLE_BODY.appendChild(tr);
    }

}

//Get total income and expense values and set total result
let updateResult = function(){

    let incomeList = document.querySelectorAll(".income-amount"); //Array of all income amount elements
    let incomeTotal = 0;                                          //To store total of income values
    //Converts and adds every value from incomeList into incomeTotal
    for (let i = 0; i<incomeList.length; i++){
        incomeTotal += Number(incomeList[i].innerText);           //Get amount innertext, convert into number, store in incomeTotal
    }
    
    let expenseList = document.querySelectorAll(".expense-amount"); //Array of all expense amount elements
    let expenseTotal = 0;                                           //To store total of expense values
    //Converts and adds every value from expenseList into expenseTotal
    for (let i = 0; i<expenseList.length; i++){
        expenseTotal += Number(expenseList[i].innerText);          //Get amount innertext, convert into number, store in expenseTotal
    }

    let resultTotal = 0;                                           //To store result total
    resultTotal = (incomeTotal-expenseTotal);                      //Result total = inocome total - expense total

    let resultAmount = document.querySelector(".result-amount");   //Variable for result amount

    resultAmount.innerText = resultTotal;                          //Set result amount innertext to result total

}

//Event listeners:

//Form submit gets user inputs to create items, update result, and reset settings
ADD_FORM.addEventListener("submit", function(e){
    e.preventDefault(); //Prevents default submit behavior

    if (checkValidInput(DESCRIPTION_INPUT, AMOUNT_INPUT) == true) { //If user text inputs are valid:
        createItem(DESCRIPTION_INPUT, AMOUNT_INPUT);     //Create new list item
        updateResult();                                  //Update result value
        resetSettings();                                 //Reset settings
    }
});

//Clear button to clear elements and resets settings
CLEAR_BUTTON.addEventListener("click", function(){
    clear();
    resetSettings();
});

//After selecting any radio button, focus on 'Description' text input field
INCOME_RADIO.addEventListener("click", function(){
    DESCRIPTION_INPUT.focus();
});

EXPENSE_RADIO.addEventListener("click", function(){
    DESCRIPTION_INPUT.focus();
});

//Function declarations:

//Checks if text input is valid
let checkValidInput = function(descriptionInput, amountInput){

    if (descriptionInput.value == ""){                        //If description field is empty a number
        return console.log("Fill description");               //output msg "Fill description" while stopping function from creating new item
    }

    if (amountInput.value == ""){                             //If description field is empty a number
        return console.log("Fill amount");                    //output msg "Fill amount" while stopping function from creating new item
    }

    let convertToNum = Number(amountInput.value);             //Converts string to number

    if (Number.isNaN(convertToNum)){                          //If not a number
        return console.log ("Enter number in amount");        //output msg "Enter number in amount" while stopping function from creating new item
    }
    
    return true; //If conditions are not met, return true

}

//Clear items in 'Income' and 'Expenses' tables
let clear = function() {

    //Clear all added table rows
    let addedRows = document.querySelectorAll(".added-row");

    for (i=0; i<addedRows.length; i++){
        addedRows[i].remove();
    }

    updateResult(); //Update result

}

let resetSettings = function(){

    DESCRIPTION_INPUT.focus();      //Focus on 'Description' text input
    DESCRIPTION_INPUT.value ="";    //Clear 'Description' text input
    AMOUNT_INPUT.value = "";        //Clear 'Amount' text input
    
}