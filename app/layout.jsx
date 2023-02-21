import Header from './Header';
import Footer from './Footer';
import './styles.scss'
import localFont from '@next/font/local';

// Font files can be colocated inside of `app`
const ellaSans = localFont({
  src: [
    {
      path: '../public/fonts/EllaSans-Thin.ttf',
      weight: "300",
    },
    {
      path: '../public/fonts/EllaSans-Thin.eot',
      weight: "300",
    },
    {
      path: '../public/fonts/EllaSans-Thin.woff',
      weight: "300",
    },
    {
      path: '../public/fonts/EllaSans-Thin.woff2',
      weight: "300",
    },
    {
      path: '../public/fonts/EllaSans-Regular.ttf',
      weight: "500",
    },
    {
      path: '../public/fonts/EllaSans-Regular.eot',
      weight: "500",
    },
    {
      path: '../public/fonts/EllaSans-Regular.woff',
      weight: "500",
    },
    {
      path: '../public/fonts/EllaSans-Regular.woff2',
      weight: "500",
    },
    {
      path: '../public/fonts/EllaSans-Bold.ttf',
      weight: "700",
    },
    {
      path: '../public/fonts/EllaSans-Bold.eot',
      weight: "700",
    },
    {
      path: '../public/fonts/EllaSans-Bold.woff',
      weight: "700",
    },
    {
      path: '../public/fonts/EllaSans-Bold.woff2',
      weight: "700",
    },
  ],
  display: 'swap'
});


import { cookies } from 'next/headers';
import { getUserById } from '@/lib/prisma/users';

export default async function RootLayout({ children }) {


  const websiteCookies = cookies();
  const userToken = websiteCookies.get('userToken')
  const loggedIn = websiteCookies.get('loggedIn')
  const userIdFromToken = (token) => {
    token = token.value.toString();
    const tokenArr = token.split('j666x');
    const userId = tokenArr[0]
    return userId;
  }

  let userData = null;
  const checkIfLoggedIn = async () => {
    if (loggedIn) {
      console.log("logged in in cookies")
      if (userToken) {
        console.log("userToken in cookies")
        const userId = await userIdFromToken(userToken);
        console.log(userId)
        const res = await getUserById(userId)
        const user = res.user;
        if (user) {
          userData = user;
          return true
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }


  return (
    <html lang="he" className={`${ellaSans.className} ${await checkIfLoggedIn() ? 'loggedin' : ''}`}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body>
        <Header userCart={userData?.cart} useEmail={userData?.email} userFirstname={userData?.firstname} userLastname={userData?.lastname} userPhone={userData?.mobilephone} userRole={userData?.role} userHasStore={userData?.hasStore} isLoggedIn={await checkIfLoggedIn()} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
