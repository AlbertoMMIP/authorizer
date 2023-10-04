const variables = require('./../../resources/constants/variables');
const errors = require('./../../resources/constants/erros');

module.exports = {
  applyRules (activeAccount, currentRow, arrayTransactions) {
    let violations = [];
    violations.push(this.accountNotInitialized(activeAccount));
    violations.push(this.accountCardNotActive(activeAccount));
    violations.push(this.insufficientLimit(activeAccount, currentRow));
    violations.push(this.highFrequency(arrayTransactions, currentRow));
    violations.push(this.doubleTransaction(arrayTransactions, currentRow));
    violations = violations.filter(Boolean);
    if (!violations.length) {
      activeAccount = this.updateActiveAccount(activeAccount, currentRow);
    }
    if (activeAccount && !activeAccount.account) activeAccount = { account: {}}
    return { ...activeAccount, violations }
  },
  updateActiveAccount (activeAccount, currentRow) {
    const availableLimit = this.getAvailableLimit(activeAccount, currentRow);
    return { ...activeAccount, account: { ...activeAccount.account, ['available-limit']: availableLimit }};
  },
  getAvailableLimit (activeAccount, currentRow) {
    let availableLimit = activeAccount.account['available-limit'];
    const transactionAmount = currentRow.transaction.amount;
    availableLimit = availableLimit - transactionAmount;
    return availableLimit;
  },
  accountNotInitialized (activeAccount) {
    let violation = ''
    if (activeAccount && !activeAccount.account) {
      violation = errors.ACCOUNT_NOT_INITIALIZED.code
    }
    return violation;
  },
  accountCardNotActive (activeAccount) {
    let violation = ''
    if (activeAccount && activeAccount.account && !activeAccount.account['active-card']) {
      violation = errors.CARD_NOT_ACTIVE.code
    }
    return violation;
  },
  insufficientLimit (activeAccount, currentRow) {
    let violation = ''
    if (activeAccount && !activeAccount.account) return violation
    let availableLimit = this.getAvailableLimit(activeAccount, currentRow);
    if (availableLimit < 0) {
      violation = errors.INSUFFICIENT_LIMIT.code
    }
    return violation;
  },
  highFrequency (arrayTransactions, currentTransaction) {
    let violation = ''
    if(arrayTransactions.length >= 3) {
      const lastTransaction = arrayTransactions[arrayTransactions.length - 1];
      const interval = this.getIntervalTime(lastTransaction, currentTransaction);
      if (interval < variables.LIMIT_TRANSACTION_TIME) {
        violation = errors.HIGH_FREQUENCY.code
      }
    }
    return violation;
  },
  doubleTransaction (arrayTransactions, currentTransaction) {
    let violation = '';
    const sameTransaction = arrayTransactions.find(item => item.transaction.merchant === currentTransaction.transaction.merchant && item.transaction.amount === currentTransaction.transaction.amount);
    if (sameTransaction && sameTransaction.transaction) {
      const interval = this.getIntervalTime(sameTransaction, currentTransaction);
      if (interval < variables.LIMIT_TRANSACTION_TIME) {
        violation = errors.DOUBLE_TRANSACTION.code;
      }
    }
    return violation;
  },
  getIntervalTime (prevTransaction, currentTransaction) {
    const lastTime = new Date(prevTransaction.transaction.time);
    const lastTimeInMilliseconds = lastTime.getTime();
    const currentTime = new Date(currentTransaction.transaction.time);
    const currentTimeInMillisends = currentTime.getTime();
    const diff = currentTimeInMillisends - lastTimeInMilliseconds;
    return diff;
  }
}