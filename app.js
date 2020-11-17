// Program should take income and expense inputs and display results

//Consant declarations

const ADD_FORM = document.querySelector("#add-form");       //Form
const TABLE_BODY = document.querySelector("#table-body");   //Table body

const DESCRIPTION = document.querySelector("#description"); //Description text input
const AMOUNT = document.querySelector("#amount");           //Amount text input

const INCOME = document.querySelector("#income");           //Income radio input
const EXPENSE = document.querySelector("#expense");         //Expense radio input

const RESULT = document.querySelector("#result-amount");    //Result amount

//Initial settings

INCOME.checked = true; //Income radio button is checked
DESCRIPTION.focus(); //Focus on description text field

RESULT.innerText = 0; //Set result amount to zero


//Creates new list items
function addItem(){

    //Creating new elements
    
    let newTr = document.createElement("tr");  //Create table row: <tr></tr>
    let newTd1 = document.createElement("td"); //Create first <td> for 'Description'-input
    let newTd2 = document.createElement("td"); //Create second <td> for for 'Amount'-input 
    

    //Add classes to first and second <td>
    
    newTd1.classList.add("description"); //Add description class for description item
    newTd2.classList.add("amount"); //Add amount class for amount item


    //Add class 'positive-amount' or 'negative-amount' to new item depending on if 'Income' or 'Expense' radio button is checked

    if (INCOME.checked == true) {                                   //If Income radio button is checked
        newTd2.classList.add("positive-amount");                    //add class .positive-amount
    } else if (EXPENSE.checked == true) {                           //Else if expense radio button is checked
        newTd2.classList.add("negative-amount");                    //add class .negative-amount
    }


    //Create content inside <td></td> that consists of user input 'Description' + 'Amount'
    
    let description = DESCRIPTION.value; //Variable for 'Description'-input
    let amount = AMOUNT.value; //Variable for 'Amount'-input

    let content1 = description;
    let content2 = amount;

    newTd1.innerText = content1; //Variable for content for first <td>
    newTd2.innerText = content2; //Variable for content for second <td>

    newTr.appendChild(newTd1); //Insert first table description in table row: <tr><td></td></tr>
    newTr.appendChild(newTd2); //Insert second table description in table row: <tr><td></td></tr>

    TABLE_BODY.appendChild(newTr); //Insert newly created item into table body

};  

//Updates Result amount value
function updateResult(){

    let positiveArray = document.querySelectorAll(".positive-amount"); //Creates array of all elements with '.positive-amount'-class
    let negativeArray = document.querySelectorAll(".negative-amount"); //Creates array of all elements with '.negative-amount'-class

    let positiveTotal = 0; //Variable to store total of all created 'Income' amounts
    let negativeTotal = 0; //Variable to store total of all created 'Expense' amounts

    for (let i = 0; i<positiveArray.length; i++){
        positiveTotal += Number(positiveArray[i].innerText); //Get innerText of all 'Income' amounts, convert to number, store in positiveTotal
    }

    for (let i = 0; i<negativeArray.length; i++){
        negativeTotal += Number(negativeArray[i].innerText); //Get innerText of all 'Expense' amounts, convert to number, store in negativeTotal
    }

    let resultTotal = (positiveTotal - negativeTotal);     //Total result = positive total - negative total
    
    RESULT.innerText = resultTotal;  //Updates result amount to total result
    
}

//Resets some initial settings
function resetSettings(){

    DESCRIPTION.value = null; //Empty 'Description' text field
    AMOUNT.value = null;      //Empty 'Amount' text field
    DESCRIPTION.focus();      //Focus on 'Description' text field

}

// Adding event listener to form event 'submit'
ADD_FORM.addEventListener("submit", function(e){

    e.preventDefault(); //Prevents site from refreshing due to default submit behavior

    //Ends function if either input text field is empty or "Amount" is NaN, and returns message

    if (DESCRIPTION.value == ""){                        // If description field is empty a number
        return console.log("Fill description");          // output msg "Fill description" while stopping function from creating new item
    }

    if (AMOUNT.value == ""){                             // If description field is empty a number
        return console.log("Fill amount");               // output msg "Fill amount" while stopping function from creating new item
    }

    let convertToNum = Number(AMOUNT.value);             //Converts string to number

    if (Number.isNaN(convertToNum)){                     // If not a number
        return console.log ("Enter number in amount");   // output msg "Enter number in amount" while stopping function from creating new item
    }

    addItem();
    updateResult();
    resetSettings();

});