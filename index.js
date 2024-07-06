
class Transaction { // write getters
  constructor(amount, account) {
    this._amount = amount;
    this._account = account;

  }
  get amount() {
    return this._amount;
  }
  get account() {
    return this._account;
  }
  commit() {
    this._time = new Date();
    this.account.balance += this.value;
    this.account.addTransaction(this);
  }
}


class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  commit() {
    if (this.account.balance >= this.amount) {
      this.account.balance += this.value; // This is equivalent to subtracting this.amount
      this.account.addTransaction(this);
      return true;
    }
    return false;
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }
}

class Account {
  constructor(username) {
    this._username = username;
    this._balance = 0;
    this._transactions = [];
  }
  get username() {
    return this._username;
  }
  get balance() {
    return this._balance;
  }
  set balance(newBalance) {
    if (newBalance >= 0) {
      this._balance = newBalance;
    } else {
      throw new RangeError('Balance cannot be negative');
    }
  }
  addTransaction(transaction) {
    this._transactions.push(transaction);
  }
}

// DRIVER CODE BELOW
const myAccount = new Account("snow-patrol");

const t1 = new Withdrawal(50.25, myAccount);
console.log('Transaction 1 committed:', t1.commit());
console.log('Transaction 1:', t1);

const t2 = new Withdrawal(9.99, myAccount);
console.log('Transaction 2 committed:', t2.commit());
console.log('Transaction 2:', t2);

console.log('Balance:', myAccount.balance);

const t3 = new Deposit(125.00, myAccount);
console.log('Transaction 3 committed:', t3.commit());
console.log('Transaction 3:', t3);

console.log('Balance:', myAccount.balance);
