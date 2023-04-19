import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useState, useEffect } from 'react';
import { Store } from '../utils/Store';
import { FaRegUser } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useSession } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout({ title, children }) {
  const { status, data: session } = useSession();
  const year = new Date().getFullYear();
  const { state } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);
  return (
    <>
      <Head>
        <title>{title ? title + ' - Willey' : 'Willey'}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/">
              <span className="text-3xl font-press-start ">Willey</span>
            </Link>
            <div className="flex">
              <Link href="/cart">
                <span className="p-2  flex bg-red-100 rounded-lg">
                  <AiOutlineShoppingCart size="20px" />
                  {cartItemsCount > 0 && (
                    <span className="ml-1  rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </span>
                  )}
                </span>
              </Link>

              <div className="pt-2">
                {status === 'loading' ? (
                  'Loading'
                ) : session?.user ? (
                  session.user.name
                ) : (
                  <Link href="/login" className="flex pt-2 pl-2">
                    <div className="">
                      <FaRegUser />
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner font-press-start">
          <p>Copyright © {year} Willey</p>
        </footer>
      </div>
    </>
  );
}

export default Layout;
