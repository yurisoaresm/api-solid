export class ResourceNotFoundError extends Error {
  constructor() {
    super();
    this.name = 'ResourceNotFoundError';
    this.message = 'Resource not found';
  }
}
