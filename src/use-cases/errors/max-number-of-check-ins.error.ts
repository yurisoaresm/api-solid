export class MaxNumberOfCheckInsError extends Error {
  constructor() {
    super();
    this.name = 'MaxNumberOfCheckInsError';
    this.message = 'Max number of check-ins exceeded';
  }
}
