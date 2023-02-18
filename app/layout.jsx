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


export default function RootLayout({ children }) {
  return (
    <html lang="he" className={ellaSans.className}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
