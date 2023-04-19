import Head from 'next/head';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import React, { useContext, useState, useEffect } from 'react';
import { Store } from '../utils/Store';
import { FaRegUser } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';

function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };
  // footer date
  const year = new Date().getFullYear();
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

              <div>
                {status === 'loading' ? (
                  'Loading'
                ) : session?.user ? (
                  <Menu as="div" className="relative inline-block">
                    <Menu.Button className="text-blue-600 pt-2">
                      {session.user.name}
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                      <Menu.Item>
                        <DropdownLink className="dropdown-link" href="/profile">
                          Profile
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/order-history"
                        >
                          Order History
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <a
                          className="dropdown-link"
                          href="#"
                          onClick={logoutClickHandler}
                        >
                          Logout
                        </a>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
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
