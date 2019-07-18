export default class TestResult {
  status = 'pending'; // 'pending', 'success', 'fail', 'error', 'skipped'
  messages = [];

  constructor (status, messages) {
    this.status = status;
    this.messages = messages;
  }
};
