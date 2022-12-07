'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

//Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// /////////////////////////////////////////////////
// /////////////////////////////////////////////////
// // LECTURES



// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

////JUST TESTING

// 


// let arr = ['a', 'b', 'c', 'd', 'e']
// const arr2 = ['j', 'i', 'h', 'g', 'f']

///// SLICE Method
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));
// console.log(arr.slice());//sukuriama masyvo kopija
// console.log([...arr]);// kitas budas sukurti masyvi kopijai

////// Splice Method (splice does mutate the original array) returns deleted element

// console.log(arr.splice(-1));
// console.log(arr);

////// REVERSE Method (Reverse method does mutate the original array)


//  arr2.reverse();

// console.log(arr2);

/////// CONCAT Method
// const letters = arr.concat(arr2)


// console.log(letters);


///////JOIN Method

// console.log('Join', letters.join(' - '));


/////// ES 2022 new method (AT Method)

// const arr = [23, 11, 64]

// console.log(arr[1]);
// console.log(arr.at(1));

// console.log('GET LAST ARRAY ELEMENT USING (LENGTH)',arr[arr.length -1]);// geting last array dinamicli , does not depend from array elemnts number  allways you will get the last . One of proper ways to get last aray alement (MORE TRADICIONAL WAY)
// console.log('GET LAST ARRAY ELEMENT USING (SLICE Method)',arr.slice(-1)[0]);// other way to get last element from the array (MORE TRADICIONAL WAY)

// console.log('GET LAST ARRAY ELEMENT USING (AT Method)',arr.at(-1)); // More modern way of geting last array element

// console.log('Algirdas'.at(0));
// console.log('Algirdas'.at(-1));


///// LOOPING ARRAY FOREACH Method (the continue and break statments does'in work in forEach loop, all ways loop on the entare array)


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]



console.log(' ////// FOR OF LOOP /////// ');
// In for Of loop continue and break statmnes works 
for(const [i, value] of movements.entries())value > 0 ? console.log(`(For of loop) Movement ${i + 1 }  You deposited  ${value}`) : console.log(`(For of loop) Movement ${i + 1 } You withdrew  ${Math.abs(value)}`)

console.log(' ////// FOREACH /////// ');

movements.forEach(( element, i, arr) => element > 0 ? console.log(`Movement ${i + 1 } You deposited  ${element} `) : console.log(`Movement ${i + 1 } You withdrew  ${Math.abs(element)}`)); 
  

///// ForEach With Maps and Sets ///////
///Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);



currencies.forEach((value, key, arr) => console.log(`${key} : ${value}`))


///Set
console.log('///////// Set ////////////');
const currenciesUnice = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR' ])
console.log(currenciesUnice);
currenciesUnice.forEach((value, value2, arr ) => console.log(value, value2) )


// const testasOjk = {

//   element: [],
//   testForeach: function(testelemnt){
//     for(const misa of this.element){
//       function(testelemnt)
//     }
//   }

// }


