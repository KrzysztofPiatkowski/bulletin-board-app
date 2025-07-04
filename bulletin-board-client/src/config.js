export const API_URL = process.env.NODE_ENV === 'production'
  ? ''
  : 'http://localhost:8000';

export const IMGS_URL = process.env.NODE_ENV === 'production'
  ? '/uploads/'
  : `${API_URL}/uploads/`;
