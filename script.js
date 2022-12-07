'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

//Data

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


