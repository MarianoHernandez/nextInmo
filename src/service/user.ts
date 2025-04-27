"use server"

import { BASE_URL } from "@/constants/constants";
import axios from "axios";
import { AuthenticationResponseDto } from "./dto/authentication.response.dto";

export async function loginUser(
  email: string,
  password: string
): Promise<AuthenticationResponseDto> {
  const res = await axios.post<AuthenticationResponseDto>(`${BASE_URL}/user/login`, {
    user: { email, password },
  });
  return res.data;
}

export const getUsers = async (token: string) => {
  const res = await axios.get(`${BASE_URL}/user/profile`, {
    headers: { 
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return await res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(BASE_URL + "/user/logout");
  return res.data;
};
