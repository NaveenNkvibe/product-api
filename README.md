# product-api
This is a Node.js based authentication system with JWT authentication (Access & Refresh Tokens), user management, blocking system, and product management.

# Features
* User Registration & Login with JWT
* Token Refresh API
* User Profile Editing & Deletion
* Product & Brand Management
* Blocking & Unblocking System

# Project Setup
* Clone the Git Repository(product-api)
* CMD: cd product-api
* CMD: npm install
* Create a .env file in the root folder and add:
    PORT=5000
    MONGO_URL=your_mongodb_connection_string
    ACCESS_JWT_SECRET=your_jwt_secret_key
    REFRESH_JWT_SECRET=your_jwt_secret_key
* CMD: npm start
* The API will run at http://localhost:5000/

# API Request & Responses
**User Authentication**
* Register: POST || /auth/register
  Response : {
      "message": "User Registered Successfully"
  }
* Login: POST || /auth/login
  Response : {
      "message": "User Logged In Successfully",
      "result": {
          "accessToken": "eyJhbGciOiJ...."
      }
  }
* RefreshToken: POST || /auth/refresh
  Response : {
      "message": "New Access Token Generated",
      "result": {
          "newAccessToken": "eyJhbGciOiJ...."
      }
  }
* Use these Access Token Generated as Authorization Bearer Token in Postman

**User Management**
* Get User Details: GET || /user
  Response : {
      "message": "User Details Fetched Successfully",
      "result": {
          "_id": "67dacf1f59....",
          "username": "{Name}",
          "email": "{Email}",
          "password": "$2b$10....",
          "profile_photo": "upload/....",
          "blocked": [],
          "created_at": "2025-03-19T14:05:19.095Z",
          "updated_at": "2025-03-19T14:05:19.095Z",
          "__v": 0
      }
  }
* Edit User: PUT || /user/edit
  Response : {
      "message": "User Updated Successfully",
      "result": {
          "_id": "67db24abd....",
          "username": "{Name}",
          "email": "{Email}",
          "password": "$2b$10$Gqv....",
          "profile_photo": "upload/....",
          "blocked": [],
          "created_at": "2025-03-19T20:10:19.367Z",
          "updated_at": "2025-03-19T20:19:03.016Z",
          "__v": 0
      }
  }
* Block User: POST || /user/block
  Response : {
      "message": "User Blocked Successfully",
      "result": {
          "_id": "67db24....",
          "username": "{Name}",
          "email": "{Email}",
          "password": "$2b$10$Gqv....",
          "profile_photo": "upload/....",
          "blocked": [
              "67dac8...."
          ],
          "created_at": "2025-03-19T20:10:19.367Z",
          "updated_at": "2025-03-19T20:22:49.577Z",
          "__v": 1
      }
  }
* UnBlock User: POST || /user/unblock
  Response : {
      "message": "User Unblocked Successfully",
      "result": {
          "_id": "67db24....",
          "username": "{Name}",
          "email": "{email}",
          "password": "$2b$10$Gqv....",
          "profile_photo": "upload/....",
          "blocked": [],
          "created_at": "2025-03-19T20:10:19.367Z",
          "updated_at": "2025-03-19T20:25:42.740Z",
          "__v": 2
      }
  }
* Delete User: DELETE || /user/delete
  Response : {
      "message": "User Deleted Successfully"
  }

**Brand Management**
* Create Brand: POST || /brand/create
  Response : {
      "message": "Brand created successfully",
      "result": {
          "brand": {
              "brand_name": "{Brand Name}",
              "brand_logo": "upload/....",
              "categories": ["", "",....],
              "user_id": "67db29....",
              "_id": "67db2a8....",
              "created_at": "2025-03-19T20:35:20.609Z",
              "updated_at": "2025-03-19T20:35:20.609Z",
              "__v": 0
          }
      }
  }
* Get Brand: GET || /brand
  Response : {
      "message": "All Brands Fetched successfully",
      "result": {
          "brands": [
              {
                  "_id": "67db2....",
                  "brand_name": "{Brand Name}",
                  "brand_logo": "upload/....",
                  "categories": ["", "",....],
                  "user_id": "67db2....",
                  "created_at": "2025-03-19T20:35:20.609Z",
                  "updated_at": "2025-03-19T20:35:20.609Z",
                  "__v": 0
              }
          ]
      }
  }

**Product Management**
* Create Product: POST || /product/create
  Response : {
      "message": "Product created successfully",
      "result": {
          "product": {
              "product_name": "{Product Name}",
              "description": "{Description}",
              "price": 150,
              "category": "{Category}",
              "brand": "67dad....",
              "product_image": "upload/....",
              "added_by": "67db2....",
              "_id": "67db2....",
              "created_at": "2025-03-19T20:45:31.246Z",
              "updated_at": "2025-03-19T20:45:31.246Z",
              "__v": 0
          }
      }
  }
* Get Product: GET || /product/create
  Response : {
      "message": "All Products Fetched successfully",
      "result": {
          "products": [
              {
                  "_id": "67db2e....",
                  "product_name": "{Product Name}",
                  "description": "{Description}",
                  "price": 150,
                  "category": "{Category}",
                  "brand": "67db2....",
                  "product_image": "upload/....",
                  "added_by": "67db29....",
                  "created_at": "2025-03-19T20:51:25.595Z",
                  "updated_at": "2025-03-19T20:51:25.595Z",
                  "__v": 0,
                  "brandDetails": {
                      "_id": "67db2....",
                      "brand_name": "{Brand Name}",
                      "brand_logo": "upload/....",
                      "categories": ["", "",....],
                      "user_id": "67db2....",
                      "created_at": "2025-03-19T20:35:20.609Z",
                      "updated_at": "2025-03-19T20:35:20.609Z",
                      "__v": 0
                  }
              }
          ]
      }
  }
* Edit Product: PUT || /product/edit
  Response : {
      "message": "Product Updated successfully",
      "result": {
          "updatedProduct": {
              "_id": "67db2....",
              "product_name": "{Product Name}",
              "description": "{Description}",
              "price": 150,
              "category": "{Category}",
              "brand": "67dad....",
              "product_image": "upload/....",
              "added_by": "67db2....",
              "created_at": "2025-03-19T20:51:25.595Z",
              "updated_at": "2025-03-19T21:04:58.263Z",
              "__v": 0
          }
      }
  }
* Delete Product: DELETE || /product/delete
  Response : {
      "message": "Product Deleted Successfully"
  }