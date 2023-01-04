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
      '2022-12-16T14:11:59.604Z',
      '2022-12-12T17:01:17.194Z',
      '2022-12-21T23:36:17.929Z',
      '2022-12-22T10:51:36.790Z',
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
      '2022-12-10T14:43:26.374Z',
      '2022-12-12T18:49:59.371Z',
      '2022-12-20T12:01:20.894Z',
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



    let currentAccount, timer;

    




//////////   Func displayMovments


//// Time functionality 

const formatMovementDate = (date, local) => {

        const calcDaysPassed = (date1, date2) => Math.round( Math.abs(date2 - date1)/(1000 * 60 * 60 * 24 ))
        const daysPassed = calcDaysPassed(new Date(), date)
        
        if(daysPassed === 0)
        return `Today`
        if(daysPassed === 1)
        return `Yesterday`
        if(daysPassed <= 7 ) return `${daysPassed} days ago`
        else {
          // const day = `${date.getDate()}`.padStart(2, 0)
          // const month = `${date.getMonth() + 1}`.padStart(2, 0)
          // const year = date.getFullYear()
          // return `${day}/${month}/${year}`
         
          return new Intl.DateTimeFormat(local).format(date)
         }
}

const formatCur = (value,locale, currency) => {
  return new Intl.NumberFormat(locale, 
    {style:'currency', 
    currency: currency })
    .format(value)
}



  const displayMovments = (acc, sort = false) => {
    containerMovements.innerHTML = ''

    const movs = sort ? acc.movements.slice().sort((a, b) => a - b): acc.movements

     
    movs.forEach((mov, i ) => {
        const type = mov > 0 ? 'deposit' : 'withdrawal'
        const date = new Date(acc.movementsDates[i]) 
        const formattedMov = formatCur(mov, acc.local, acc.currency )
        
        const displayDate = formatMovementDate(date, acc.locale)
       
        const html = ` 
        
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>`

      containerMovements.insertAdjacentHTML("afterbegin",html )
    }) 
  }

   
  

//////////// Func calcDisplayBalance
   const calcDisplayBalance = (acc) => {
    acc.balance =acc.movements.reduce((acc, mov) => acc + mov, 0)

      labelBalance.textContent = `${formatCur(acc.balance, acc.locale, acc.currency)}`
} 


////////// calcDisplaySummary
const calcDisplaySummary = (acount) => {

    const incomes = acount.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0)
    const out = acount.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0 )
    labelSumIn.textContent = `${formatCur(incomes, acount.locale, acount.currency )}` 
    labelSumOut.textContent = `${formatCur(Math.abs(out), acount.locale, acount.currency )}`

    const interes =acount.movements
    .filter(mov => mov > 0)
    .map(dep => (dep * acount.interestRate) / 100 )
    .filter((dep, i, arr) =>  dep >= 1)
    .reduce((acc, dep) => acc + dep, 0)
     labelSumInterest.textContent = `${formatCur(interes, acount.locale, acount.currency)}`
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
     displayMovments(currentAccount, !sortedState )
     sortedState = !sortedState
     
    })

    

    ////// update UI /// function for refactoring
    const updateUI =  (acc) => {

        displayMovments(acc)
        
        calcDisplayBalance(acc)
        
        calcDisplaySummary(acc)
    }

    ////Logout Timer
    const startLogOutTimer = () => {
       const tick = () => {
        const min = String(Math.trunc(time / 60) ).padStart(2, 0) 
        const sec = String(time % 60).padStart(2, 0) 
        // In each call, print the remaining time  to ui

        labelTimer.textContent = `${min}:${sec}`
       
        //When we are at 0 sec  stop timer and log out
        if(time === 0 ){
          clearInterval(timer)
          containerApp.style.opacity = 0
          labelWelcome.textContent = `Login to get started`
        }
        time--
      }
      //set Time 
      let time = 120
      //Call the timer  every second
      tick()
      const timer = setInterval(tick, 1000)
      return timer
    }

    
   
  

//// Login future
 
    btnLogin.addEventListener('click', (e) => {
        e.preventDefault()
        currentAccount = accounts.find((user => user.username === inputLoginUsername.value))
        if(currentAccount?.pin === +inputLoginPin.value){
            //Display UI and welcome message
            containerApp.style.opacity = 100
            labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`

            //Curent Date time 
             const now = new Date()
             const options = {
              hour: 'numeric',
              minute: 'numeric',
              day: 'numeric',
              month: 'numeric',
              year: 'numeric',
              //weekday: 'long'
             }
             
             labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale , options).format(now)
             
              
              
            
             

            //Clear input fields
            inputLoginUsername.value = inputLoginPin.value = ''
            inputLoginPin.blur()
             //Timer
             if(timer){clearInterval(timer)}
           timer = startLogOutTimer()
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
            //Add transfere date
            receiverAcc.movementsDates.push(new Date().toISOString())
            currentAccount.movementsDates.push(new Date().toISOString())
        
            updateUI(currentAccount)

            //Reset timer
            clearInterval(timer)
            timer = startLogOutTimer()
        }  
    })

    // Loan request
    
     

    btnLoan.addEventListener('click', (e) => {
        e.preventDefault()
        
        const loanAmount = Math.floor(inputLoanAmount.value)   
        
        if(loanAmount > 0 && currentAccount.movements.some(mov => mov >= loanAmount * 0.1 )){

          setTimeout(() => {
            currentAccount.movements.push(loanAmount)
            currentAccount.movementsDates.push(new Date().toISOString())
            updateUI(currentAccount)
            clearInterval(timer)
            timer = startLogOutTimer()
          }, 2000)
          
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

  


