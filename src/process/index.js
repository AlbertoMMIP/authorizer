const validations = require('./../utils/validations');
const rulesAccount = require('./../business-rules/account');
const variables = require('./../resources/constants/variables');
const errors = require('./../resources/constants/erros');
const rulesTransaction = require('./../business-rules/transaction');

module.exports = {
  init (inputsArray) {
    let activeAccount = {};
    let activeTransactions = [];
    return inputsArray.map((input, index) => {
      const currentRow = validations.convertToJson(input)
      const operationType = validations.getOperationType(currentRow);
      switch (operationType) {
        case variables.ACCOUNT:
          const prevRow = index ? validations.convertToJson(inputsArray[index-1]) : null;
          const account = rulesAccount.applyRules(prevRow, currentRow);
          if (account && !account.violations.length) {
            activeAccount = account;
            activeTransactions = [];
          }
          return account;
        case variables.TRANSACTION:
          const transaction = rulesTransaction.applyRules(activeAccount, currentRow, activeTransactions);
          if (transaction && !transaction.violations.length) {
            activeTransactions.push(currentRow);
            activeAccount = transaction;
          }
          return transaction;
        default:
          return { ...currentRow, violations: [errors.UNKNOW_REGISTER] };
          break;
      }
    });
  }
}