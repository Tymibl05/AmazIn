# AmazIn eCommerce App

This project was created by [Tyler Blease](https://www.linkedin.com/in/tyler-blease/).

[View Live](https://amazin-ecom.onrender.com)

## App Functions

In the app, you can:

### `Add to Cart`

Products can be saved in cart from home page or the specified project's page unless the product is out of stock. Cart is saved in local storage unless user signs out.

### `Sign In / Sign Up`

Users can sign up if they do not have an account allowing them to use other features of the application. Secure Token is generated on signin/up that is used for verification before placing order, viewing past orders, etc.

### `Place Order`

After confirming shipping info and payment method, user can submit order which will redirect them to the order info page.

Payment not currently implemented, however it can be added using PayPal's or Stripe's API.

### `User Order History and Profile Info`

Past Orders can be viewed after sign in and user information is able to be updated which will update the user's info in the backend database

### `Local Storage and MongoDB`

Local Storage stores basic user information and cart items until user signs out at which point the storage is cleared.

MongoDB stores the Products , Orders, and User Info.
User info stored includes the user's name, email, and hashed password which is used to compare with user's input password at signin.

## Tech Stack

This app was created using:

### `HTML, CSS, JS`

### `SCSS`

### `React.JS`

### `Express.JS`

### `MongoDB`

## More About Me

Check out some of my other projects on [GitHub](https://github.com/Tymibl05).

- [LinkedIn](https://www.linkedin.com/in/tyler-blease/)

- [Instagram](https://www.instagram.com/tblease05/)
