/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';

function ProductItem({ product }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow"
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <h2 className="lg:text-lg  text-xs">{product.name}</h2>
        </Link>
        <p className="mb-2 lg:text-lg text-xs">{product.brand}</p>
        <p> ₦{product.price}</p>
        <button className="primary-button lg:text-lg text-xs" type="button">
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
