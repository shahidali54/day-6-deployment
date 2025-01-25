'use client';

import { Product } from '@/types/product';
import React, { useEffect, useState } from 'react';
import { getCartItems, removeFromCart, updateCartQuantity } from '../actions/action';
import Swal from 'sweetalert2';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Header from '../multiy-components/headers/header';
import Top_Head from '../multiy-components/headers/top-header';


const CartPage = () => {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    useEffect(() => {
        setCartItems(getCartItems());
    }, []);

    const handleRemove = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this item!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        }).then((result) => {
            if (result.isConfirmed) {
                removeFromCart(id);
                setCartItems(getCartItems());
                Swal.fire("Removed!", "Item has been removed.", "success");
            }
        });
    };

    const handleQuantityChange = (id: string, quantity: number) => {
        updateCartQuantity(id, quantity);
        setCartItems(getCartItems());
    };

    const handleIncrement = (id: string) => {
        const product = cartItems.find((item) => item._id === id);
        if (product) handleQuantityChange(id, product.inventory + 1);
    };

    const handleDecrement = (id: string) => {
        const product = cartItems.find((item) => item._id === id);
        if (product && product.inventory > 1) handleQuantityChange(id, product.inventory - 1);
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.inventory, 0);
    };

    const handleProceed = () => {
        Swal.fire({
            title: "Proceed to Checkout?",
            text: "Please review your cart before checkout.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, proceed!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Success", "Your order has been successfully processed!", "success");
                setCartItems([]);
            }
        });
    };

    return (
        <div>
            
            <Top_Head />
            <Header />
            
            <main className="flex-grow container mx-auto px-4 py-6">
                {cartItems.length > 0 ? (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200"
                                >
                                    <div className="flex items-center">
                                        {item.productImage && (
                                                    <Image 
                                                    src={urlFor(item.productImage).url()}
                                                    alt='image'
                                                    width={80}
                                                    height={80}
                                            />
                                        )}
                                            
                                        <div>
                                            <h3 className="font-bold text-lg">{item.title}</h3>
                                            <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={() => handleDecrement(item._id)}
                                            className="px-3 py-1 bg-gray-300 rounded"
                                        >
                                            -
                                        </button>
                                        <span>{item.inventory}</span>
                                        <button
                                            onClick={() => handleIncrement(item._id)}
                                            className="px-3 py-1 bg-gray-300 rounded"
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={() => handleRemove(item._id)}
                                            className="text-red-500"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold">
                                Total: ${calculateTotal().toFixed(2)}
                            </h3>
                            <button
                                onClick={handleProceed}
                                className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-600">Your cart is empty!</p>
                )}
            </main>
        </div>
    );
};

export default CartPage;
