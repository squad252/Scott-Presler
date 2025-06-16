// src/types/user.ts
export interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  zipCode: string;
  phoneNumber: string;
  madepayment: boolean;
}

// types/index.ts or directly in your component file
export type Payment = {
  id: string;
  username: string;
  status: 'pending' | 'accepted' | 'declined';
};