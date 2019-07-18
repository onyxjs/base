export default class SuiteResult {
  status = 'pending'; // 'pending', 'success', 'fail', 'error', 'skipped'
  messages = [];

  constructor(status, messages) {
    this.status = status;
    this.messages = messages;
  }
};
