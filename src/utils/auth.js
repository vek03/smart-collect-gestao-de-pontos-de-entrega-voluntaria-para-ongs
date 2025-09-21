import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { auth } from '../firebase/firebase';

export const setCookie = (name, value, hours) => {
  const date = new Date();
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  
  const expires = `; expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}${expires}; path=/`;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function removeCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken();

  setCookie('token', token, 1);
}

export const logout = () => {
  signOut(auth);
  removeCookie('token');
};

export const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const saveToken = (token) => localStorage.setItem('token', token);
export const isAuthenticated = () => {
  return !!getCookie('token');
};
