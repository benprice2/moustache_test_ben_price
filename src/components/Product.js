import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const api = "https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product";

/**
 * Represents a product component.
 * @component
 */
const Product = () => {
    // State variables
    const [productData, setProductData] = useState(null); // Product data state
    const [size, setSize] = useState(''); // Selected size state
    const [cart, setCart] = useState([]); // Cart state

    /**
     * Updates the cart with the selected size.
     * If the size already exists in the cart, increments the quantity.
     * If the size doesn't exist, adds a new item to the cart.
     * @param {string} size - The selected size.
     */
    const updateCart = (size) => {
        const updatedCart = [...cart];
        const existingItem = updatedCart.find(item => item.size === size);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            updatedCart.push({ 
                size: size, 
                quantity: 1,
                image: productData.imageURL,
                title: productData.title,
                price: productData.price
            });
        }
        setCart(updatedCart);
    };

    // Fetch product data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(api); // Assuming 'api' is defined
                setProductData(response.data);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchData();
    }, []);

    /**
     * Adds the selected size to the cart.
     * Displays an alert if no size is selected.
     * @param {string} size - The selected size.
     */
    const addToCart = (size) => {
        if (!size) {
            window.alert('Please select a size before adding to cart');
            console.log("Please select a size before adding to cart");
            return;
        }
        else{
            updateCart(size);
            console.log('Adding product to cart');
        } 
    };

    /**
     * Handles the selection of a size.
     * Updates the selected size state.
     * @param {string} selectedSize - The selected size.
     */
    const handleSizeSelection = (selectedSize) => {
        console.log("size selected")
        setSize(selectedSize);
    };

    return (
        <section className='container'>
            <Navbar cart={cart} /> {/* Assuming 'Navbar' component is imported */}
            {productData ? (
                <div className='productContainer'>
                    <div className='productImageContainer'>
                        <img src={productData.imageURL} alt={productData.title} className='productImage' />
                    </div>
                    <div className='productInfoContainer'>
                        <h2 className='productTitle'>{productData.title}</h2>
                        <h3 className='productPrice'>${productData.price}.00</h3>
                        <p className='productDescription'>{productData.description}</p>
                        <p className='productSizeSelected'>SIZE<span className='productStar'>*</span> {size}</p>
                        <div className='productSizeBtns'>
                            {productData.sizeOptions.map((sizeOption) => (
                                <button className='productSizeBtn' key={sizeOption.id} id={sizeOption.id} onClick={() => handleSizeSelection(sizeOption.label)}>{sizeOption.label}</button>
                            ))}
                        </div>
                        <button className='addToCartBtn' onClick={() => addToCart(size)}>Add to Cart</button>
                    </div>
                </div>
            ) : (
                <p>Loading product data...</p>
            )}
        </section>
    );
};

export default Product;