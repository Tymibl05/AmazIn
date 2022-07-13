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

# Next
