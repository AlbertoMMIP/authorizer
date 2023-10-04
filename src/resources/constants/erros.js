const errors = Object.freeze({
  ACCOUNT_ALREADY_INITIALIZED: {
    code: 'account-already-initialized',
    description: 'Once created'
  },
  ACCOUNT_NOT_INITIALIZED: {
    code: 'account-not-initialized',
    description: 'There are not any account created'
  },
  CARD_NOT_ACTIVE: {
    code: 'card-not-active',
    description: 'There is an account created but with card not active'
  },
  INSUFFICIENT_LIMIT: {
    code: 'insufficient-limit',
    description: 'The limit of the account is not enough'
  },
  HIGH_FREQUENCY: {
    code: 'high-frequency-small-interval',
    description: 'No more than 3 transactions within a 2 minutes interval'
  },
  DOUBLE_TRANSACTION: {
    code: 'double-transaction',
    description: 'No more than 1 similar transaction (amount and merchant) within a 2 minutes interval'
  },
  UNKNOW_REGISTER: {
    code: 'unknown-register',
    description: 'Data not consider inside the current format'
  }
})

module.exports = errors;