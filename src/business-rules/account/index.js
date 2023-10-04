const validations = require('./../../utils/validations');
const errors = require('./../../resources/constants/erros');

module.exports = {
  applyRules (prevRow, currentRow) {
    const violations = [];
    const ruleA = prevRow ? this.alreadyInitialized(prevRow) : false;
    if (ruleA) violations.push(ruleA);
    return { ...currentRow, violations }
  },
  alreadyInitialized (prevRow) {
    let violation = ''
    const beforeRowIsAccount = validations.isAccount(prevRow);
    if (beforeRowIsAccount) {
      violation = errors.ACCOUNT_ALREADY_INITIALIZED.code
    }
    return violation;
  }
}