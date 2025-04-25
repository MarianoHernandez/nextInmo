import { BASE_URL } from "@/constants/constants"
import axios from "axios"

export async function loginUser(email:string, password:string) {
    const res = await fetch(`${BASE_URL}/user/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({user:{ email, password }}),
    });
    if(res.ok) return;
    if(res.status === 401){
      throw new Error('Email o contraseña incorrectos');
    }
    return res;
  }
  
  export const getUsers = async () => {
    const res = await fetch(`${BASE_URL}/user/profile`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    return await res.json();
  };

export const logoutUser = async () => {
    const res = await axios.post(BASE_URL + '/user/logout')
    return res.data
}