import Head from 'next/head';
import Link from 'next/link';
import React, { useContext } from 'react';
import { Store } from '../utils/Store';
import { AiOutlineShoppingCart } from 'react-icons/ai';

function Layout({ title, children }) {
  const year = new Date().getFullYear();
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <>
      <Head>
        <title>{title ? title + ' - Willey' : 'Willey'}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/">
              <div className="text-lg font-bold">Willey</div>
            </Link>
            <div className="flex">
              <Link href="/cart">
                <div className="p-2 mt-1 flex bg-red-100 rounded-lg">
                  <AiOutlineShoppingCart size="20px" />
                  {cart.cartItems.length > 0 && (
                    <span className="ml-1  rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  )}
                </div>
              </Link>
              <Link href="/login">
                <div className="p-2">Login</div>
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright © {year} Willey</p>
        </footer>
      </div>
    </>
  );
}

export default Layout;
