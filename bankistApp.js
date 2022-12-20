'use strict'



// BANKIST APP

//Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,
    movementsDates: [
      '2019-11-18T21:31:17.178Z',
      '2019-12-23T07:42:02.383Z',
      '2020-01-28T09:15:04.904Z',
      '2020-04-01T10:17:24.185Z',
      '2020-05-08T14:11:59.604Z',
      '2020-05-27T17:01:17.194Z',
      '2020-07-11T23:36:17.929Z',
      '2020-07-12T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
  };
  
  const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    movementsDates: [
      '2019-11-01T13:15:33.035Z',
      '2019-11-30T09:48:16.867Z',
      '2019-12-25T06:04:23.907Z',
      '2020-01-25T14:18:46.235Z',
      '2020-02-05T16:33:06.386Z',
      '2020-04-10T14:43:26.374Z',
      '2020-06-25T18:49:59.371Z',
      '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
  };
  
  // const account3 = {
  //   owner: 'Steven Thomas Williams',
  //   movements: [200, -200, 340, -300, -20, 50, 400, -460],
  //   interestRate: 0.7,
  //   pin: 3333,
  // };
  
  // const account4 = {
  //   owner: 'Sarah Smith',
  //   movements: [430, 1000, 700, 50, 90],
  //   interestRate: 1,
  //   pin: 4444,
  // };
  
  const accounts = [account1, account2];
  
  // Elements
  const navform = document.querySelector('.login')
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



    let currentAccount;

    




//////////   Func displayMovments
  const displayMovments = (movements, sort = false) => {
    containerMovements.innerHTML = ''

    const movs = sort ? movements.slice().sort((a, b) => a - b): movements


    movs.forEach((mov, i ) => {
        const type = mov > 0 ? 'deposit' : 'withdrawal'
        const html = ` 
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>`
      containerMovements.insertAdjacentHTML("afterbegin",html )
    }) 
  }

   
  

//////////// Func calcDisplayBalance
   const calcDisplayBalance = (acc) => {
    acc.balance =acc.movements.reduce((acc, mov) => acc + mov, 0)
    
      labelBalance.textContent = `${acc.balance.toFixed(2)}€`
      
    
} 


////////// calcDisplaySummary
const calcDisplaySummary = (acount) => {

    const incomes = acount.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0)
    const out = acount.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0 )
    labelSumIn.textContent = `${incomes.toFixed(2)}€` 
    labelSumOut.textContent = `${Math.abs(out).toFixed(2) }€`

    const interes =acount.movements
    .filter(mov => mov > 0)
    .map(dep => (dep * acount.interestRate) / 100 )
    .filter((dep, i, arr) =>  dep >= 1)
    .reduce((acc, dep) => acc + dep, 0)
     labelSumInterest.textContent = `${interes.toFixed(2)}€`
}


   
//////////// Func createUserName
const createUserName = (accounts) => {

    accounts.forEach(account => {
        account.username = account.owner
        .toLocaleLowerCase()
        .split(' ')
        .map(el => el[0]).join('')

    })

    }
    
    createUserName(accounts)

    ///sort button function

    let sortedState = false

    btnSort.addEventListener('click', e => {
     e.preventDefault()
     displayMovments(currentAccount.movements, !sortedState )
     sortedState = !sortedState
     
    })

    

    ////// update UI /// function for refactoring
    const updateUI = (acc) => {

        displayMovments(acc.movements)
        
        calcDisplayBalance(acc)
        
        calcDisplaySummary(acc)
    }

//// Login future
 
    btnLogin.addEventListener('click', (e) => {
        e.preventDefault()
        currentAccount = accounts.find((user => user.username === inputLoginUsername.value))
        if(currentAccount?.pin === +inputLoginPin.value){
            //Display UI and welcome message
            containerApp.style.opacity = 100
            labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`
            //Clear input fields
            inputLoginUsername.value = inputLoginPin.value = ''
            inputLoginPin.blur()

           
            updateUI(currentAccount)
        }
        
        
    })

    //// Transfer future

    btnTransfer.addEventListener('click', (e) => {
        e.preventDefault()
        
        const amount =  +(inputTransferAmount.value)
        const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value) 
       
        inputTransferAmount.value = inputTransferTo.value = ''
        if(amount > 0 && receiverAcc && currentAccount.balance >= amount &&  receiverAcc.username !== currentAccount.username ){

            currentAccount.movements.push(-amount)
            receiverAcc.movements.push(amount)
        
            updateUI(currentAccount)
        }  
    })

    // Loan request
    
     

    btnLoan.addEventListener('click', (e) => {
        e.preventDefault()
        
        const loanAmount = Math.floor(inputLoanAmount.value)   
        
        if(loanAmount > 0 && currentAccount.movements.some(mov => mov >= loanAmount * 0.1 )){
            currentAccount.movements.push(loanAmount)
            updateUI(currentAccount)
        }
         
        
        inputLoanAmount.value = ''
    })

    
  //CloseAcount

  btnClose.addEventListener('click', (e) => {
    e.preventDefault()
    
    const acountCloseUserName = inputCloseUsername.value
    const acountClosePin = +(inputClosePin.value )
    
    if(acountCloseUserName && acountCloseUserName === currentAccount.username && acountClosePin === currentAccount.pin ){
        const index = accounts.findIndex(acc =>  acc.username === acountCloseUserName)
         accounts.splice(index, 1)
         containerApp.style.opacity = 0
         
    }
    
    inputCloseUsername.value = inputClosePin.value = ''
  })

  // /////////////////////////////////////////////////
  // /////////////////////////////////////////////////
  // // LECTURES
  

  

  