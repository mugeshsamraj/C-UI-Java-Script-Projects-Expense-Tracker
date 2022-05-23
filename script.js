var state = {
  balance: 1000,
  income: 500,
  expense: 50,
  transactions: [ 
    {name:'salary',amount:1000,type:'income'},
    {name:'buy bike',amount:550,type:'expense'},
    {name:'mobile',amount:50,type:'expense'}
  ]
}
var balanceEl = document.querySelector('#balance');
var incomeEl = document.querySelector('#income');
var expenseEl = document.querySelector('#expense');
var transactionsEl = document.querySelector('#transaction');
var IncomeBtnEl = document.querySelector("#IncomeBtn");
var ExpenseBtnEl = document.querySelector("#ExpenseBtn");
var nameInputEl = document.querySelector('#name');
var amountInputEl = document.querySelector('#amount');

function init() {
  
  initBtn();
  
}
/*function uniqueId(){
  return Math.round(Math.random() * 1000000) ;
}*/
function initBtn(){
  IncomeBtnEl.addEventListener('click',onAddIncomeClick);
  ExpenseBtnEl.addEventListener('click',onAddExpenseClick);
}
function onAddIncomeClick(){
  addTransaction(nameInputEl.value,amountInputEl.value,'income');
  }
function addTransaction(name,amount,type)
{
  if (name !== '' && amount !== '')
  {
    var transaction = {
    //id:uniqueId(),
    name:name,
    amount:parseInt(amount),
    type:type
  };
  state.transactions.push(transaction);
  updateState();
  }
  else{
    alert('please enter valid data');
  }

  nameInputEl.value='';
  amountInputEl.value='';
}
function onAddExpenseClick()
{
  addTransaction(nameInputEl.value,amountInputEl.value,'expense');
}

/*function onDeleteClick(event){
{
  var id = parseInt(event.target.getAttribute('data-id'));
  var deleteIndex;
  for(var i=0; i<state.transactions.length; i++)
    if(state.transactions[i].id === id)
    {
      deleteIndex = i ;
      break;
    }
}

state.transactions.splice(deleteIndex,1);

updateState();

}*/

function updateState(){
  var balance=0,
    income=0,
    expense=0,
    item;

  for(i=0; i<state.transactions.length; i++)
  {
    item = state.transactions[i];
    amount=0;

    if(item.type ==='income')
    {
      income += item.amount;
    }
    else if(item.type === 'expense')
    {
      expense += item.amount;
    }
  }
  balance= income - expense;
  state.balance = balance;
  state.income = income;
  state.expense = expense;
  render();
}
function render(){
  balanceEl.innerHTML = `$${state.balance}` ;
  incomeEl.innerHTML = `$${state.income}` ;
  expenseEl.innerHTML = `$${state.expense}` ;

  var transactionEl,containerEl,amountEl,item,btnEl;

  transactionsEl.innerHTML= '' ;

  for(var i=0; i < state.transactions.length; i++){
    item = state.transactions[i];
    transactionEl = document.createElement('li');
    transactionEl.append(item.name);

    transactionsEl.appendChild(transactionEl);
    containerEl=document.createElement('div');
    amountEl=document.createElement('span');
    if(item.type === 'income'){
      amountEl.classList.add('income');
    }
    else if(item.type === 'expense'){
      amountEl.classList.add('expense');
  }
  amountEl.innerHTML=`$${item.amount}` ;
  containerEl.appendChild(amountEl);
  btnEl=document.createElement('button');
  //btnEl.setAttribute('data-id',item.id);
  btnEl.innerHTML="x" ;
  //btnEl.addEventListener('click',onDeleteClick());
  containerEl.appendChild(btnEl);
  transactionEl.appendChild(containerEl);

}
}

init();

