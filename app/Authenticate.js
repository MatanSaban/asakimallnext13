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

  const checkAuth = await fetch(
    `${process.env.WEBSITE_URL}/api/users/${userEmail}`,
    requestOptions
  );
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
