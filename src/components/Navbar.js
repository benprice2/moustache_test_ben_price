import React from 'react'
import cartImage from '../images/shopping-cart-64.png';

/**
 * Navbar component represents the navigation bar of the application.
 * It displays a button to toggle the cart dropdown menu and the number of items in the cart.
 *
 * @param {Object} cart - The cart object containing the cart items.
 * @returns {JSX.Element} The JSX element representing the Navbar component.
 */
const Navbar = (cart) => {
    // State to manage the visibility of the cart dropdown menu
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

    /**
     * Toggles the visibility of the cart dropdown menu.
     */
    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Calculate the total quantity of items in the cart
    const totalQuantity = cart.cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className='navbar'>
            <button onClick={handleDropdownToggle}><img src={cartImage} alt="Shopping Cart" className='cartBtnImg'/> <span className='cartBtnText'>My Cart</span>({totalQuantity})</button>
            {isDropdownOpen && (
                <div className='dropdownMenu'>
                    {/* Render each cart item */}
                    {cart.cart.length === 0 ? (
                        <p>No items in cart</p>
                    ) : (
                        cart.cart.map((item, index) => (
                            <div key={index} className='cartItem'>
                                <img className="cartItemImage" src={item.image} alt={item.title} />
                                <div className='cartItemDetails'>
                                    <p>{item.title}</p>
                                    <p>{item.quantity}x <span className='cartItemPrice'>${item.price}.00</span></p>
                                    <p>Size: {item.size}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default Navbar