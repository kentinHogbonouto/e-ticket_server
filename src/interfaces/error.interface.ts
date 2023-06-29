export interface ResponseError extends Error {
  status?: number;
  data?: any;
}

export interface FieldValidationError {
  field?: string;
  message?: string;
}
