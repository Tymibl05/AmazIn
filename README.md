# AmazIn eCommerce App

# Tasks

1. Create App
2. Create Git Repository
3. List Products
   1. create products array
   2. render products
   3. style products
4. Add Page Routing
   1. install react-router-dom
   2. Home Page
   3. Product Page
   4. replace anchor tags with Link tags
5. Create Node.JS Server
   1. created npm project in new 'backend' folder
   2. updated backend's package.json type: module
   3. data.js moved to backend folder
   4. installed express package for webserver
   5. created server.js
      - created express app
      - created path '/api/products'
      - created port for express app to listen on
      - returns products array from data.js
6. Fetch Products From Backend
   1. set proxy in frontend's package.json
   2. npm install axios
   3. Hooks
      - useState
      - useEffect
        - axios .get() to fetch from 'http://localhost:3000/api/products'
        - setProducts state to result of fetch
   4. replace map() from local 'data.products' to 'products' state
   5. removed local data.js import from HomePage
   6. added reducer() w/ switch statement for different FETCH actions
      - returns state , loading, error, and products
   7. converted useState to useReducer
      - receives loading, error, products, and dispatch
      - sets initial values
      - calls reducer function
   8. updated useEffect()
      - calls dispatch() to update loading state
      - added try/catch for fetch request, setting payload to the result
      - converted fetchData() to IIFE
   9. npm install use-reducer-logger
      - logs state changes between dispatch actions
   10. added conditionally rendered Loading / Error display
7. Style HomePage
   1. created new HomePage.css and transfered styles from App.css
      - added custom color pallet in App.css
   2. npm install FontAwesome packages
      - library holds selected icons to use in other components
      - import <FontAwesomeIcons icon=''/> in necessary components
      * uninstalled use-reducer-logger due to conflicts in package.json
   3. added filler image to data.js > products.image
   4. created <Product /> inside new components folder
      - added logic within products.map() for readability
   5. created <Rating /> and imported into <Product />
      - renders the appropriate number of stars and number of reviews for each product under the product's name
8. Update Product Details Page
   1. fetch products from backend
      - updated backend data.js for '/products/slug/:slug'
   2. styled Product Page
9. Loading and Error components
   1. created components for Loading and Error statuses and styled
   2. added getError() in utils.js to show 'Product Not Found' message instead of default 404 error
10. Add to Cart Functionality
    1. Create React Context
    2. define reducer
    3. create Store Provider
    4. implement add to cart click handler

# Next

11. Complete Add to Cart
