import { ID } from 'appwrite';
import { account } from '../config/appwrite';

export async function createUser(email: string, password: string, name: string) {
  return await account.create(ID.unique(), email, password, name);
}

export async function login(email: string, password: string) {
  return await account.createSession(email, password);
}
