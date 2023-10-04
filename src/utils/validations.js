module.exports = {
  isAccount (row) {
    return row && row.account;
  },
  isTransaction(row) {
    return row && row.transaction;
  },
  getOperationType (row) {
    return row && Object.keys(row)[0]
  },
  convertToJson (obj) {
    return typeof(obj) === 'string' ? JSON.parse(obj) : obj;
  }
}