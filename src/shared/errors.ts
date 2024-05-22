export class DuplicateRecordError extends Error {
  constructor(message: string | null) {
    message ||= 'Record already exists';
    super(message);

    this.name = 'DuplicateRecordError';
  }
}
