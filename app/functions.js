// import { checkIfEmailAndOrPhoneExist } from "@/lib/prisma/users";
import axios from "axios";
import cookieCutter from "cookie-cutter";

export async function authenticateUser(userEmail, password) {
  //   console.log(password);
  let theResult = false;
  let myHeaders = "";

  myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    pass: password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const checkAuth = await fetch(`/api/users/${userEmail}`, requestOptions);
  const answer = await checkAuth.json();
  console.log("answer");
  console.log(typeof answer);
  if (answer && typeof answer === "string") {
    theResult = true;
    cookieCutter.set("loggedIn", true);
    cookieCutter.set("userToken", `${answer}j666x${answer}`);
  }
  return theResult;
}

export const userIdFromToken = (token) => {
  token = token.toString();
  const tokenArr = token.split('j666x');
  const userId = tokenArr[0]
  return userId;
}

export const emailOrPhoneExistCheck = async (email, phone) => {
  let existQuery = [];
  const res = await axios.post('/api/existCheck', [email, phone]);
  const data = await res.data;
  existQuery = data;

  return existQuery

}

export const updateUser = async (userId, body) => {
  const put = await axios.put(`/api/users/${userId}`, body);
  const res = await put.data;
  return res;
}

export const getAllProductsByStoreId = (storeId) => {
  
}