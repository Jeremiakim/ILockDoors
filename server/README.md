[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12632665&assignment_repo_type=AssignmentRepo)

# P2-Challenge-1 (Server Side)

> Deployed Server: https://jkzu.online/
> Deployed Client: https://i-lock-doors.vercel.app/

&nbsp;

# API Documentation - ILockDoors

## Models :

_User_

```
- id : primary
- username : string, optional
- email : string, required, unique, email format
- password : string, required, length min 5
- role : string
- address: string
- phoneNumber : string
```

_Room_

```
- id : primary
- roomNumber : integer,required
- name: string, required
- imgUrl: string, required
- description: string, required
- price: integer, required, min price
- startDate: date,
- endDate: date,
- createdAt: date,
- updatedAt: date,
- UserId: integer, required
- AccomodationId: integer, required
```

_Category_

```
- id : primary
- name: string, required
- city: string, required
```

&nbsp;

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /google-login`

Routes below need authentication:

- `POST /rooms`
- `GET /rooms`
- `GET /rooms/:roomId`
- `PUT /rooms/:roomId`
- `PATCH /rooms/:roomId (VACANT)`
- `PATCH /rooms/:roomId (BOOKED)`
- `DELETE /rooms/:id`
- `POST /invoiceXendit/:roomId`
- `POST /invoiceXendit/paid`
- `POST /accomodations`
- `GET /accomodations`
- `GET /accomodations/:accomodationId`
- `PUT /accomodations/:accomodationId`
- `DELETE /accomodations/:accomodationId`

Routes below need authentication & authorizaton:

- `POST /register-user`
- `PUT /cuisines/:id`
- `PATCH /cuisines/:id`
- `DELETE /cuisines/:id`

&nbsp;

## 1. POST /register-user

Request:

- headers:

```json
{
  "authorization": "string"
}
```

- body

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email is required"
}
OR
{
  "message": "invalid email format"
}
OR
{
  "message": "email must be unique"
}
OR
{
  "message": "password is required"
}
OR
{
  "message": "password must have at least 5 characters"
}
```

## 2. POST /login

Request:

- body

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email is required"
}
OR
{
  "message": "password is required"
}
OR
{
  "message": "invalid email/password"
}
```

## 3. POST /cuisines

Request:

- headers:

```json
{
  "authorization": "string"
}
```

- user

```json
{
  "id": "integer",
  "email": "string"
}
```

- body

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "imgUrl": "string",
  "categoryId": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": 2,
  "name": "Cheeseburger",
  "description": "Burger with cheese",
  "price": 30000,
  "imgUrl": "https://static01.nyt.com/images/2023/07/13/multimedia/13xp-cheese-king/13xp-cheese-king-superJumbo.jpg",
  "categoryId": 30,
  "authorId": 5,
  "updatedAt": "2023-10-30T13:50:46.749Z",
  "createdAt": "2023-10-30T13:50:46.749Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "name is required"
}
OR
{
  "message": "description is required"
}
OR
{
  "message": "price is required"
}
OR
{
  "message": "imgUrl is required"
}
OR
{
  "message": "categoryId is required"
}
OR
{
  "message": "authorId is required"
}
```

## 4. GET /cuisines

Request:

- headers:

```json
{
  "authorization": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Pepperoni Pizza",
    "description": "Pizza with pepperoni",
    "price": 100000,
    "imgUrl": "https://ik.imagekit.io/alder/Alder_Cover_R-UcPSQQw.jpg",
    "createdAt": "2023-11-03T06:20:23.320Z",
    "updatedAt": "2023-11-03T10:05:33.006Z",
    "categoryId": 5,
    "authorId": 1
  },
  ...,
]
```

## 5. GET /cuisines/:id

Request :

- headers

```json
{
  "authorization": "string"
}
```

- params

```json
{
  "id": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "name": "Pepperoni Pizza",
  "description": "Pizza with pepperoni",
  "price": 100000,
  "imgUrl": "https://ik.imagekit.io/alder/Alder_Cover_R-UcPSQQw.jpg",
  "createdAt": "2023-11-03T06:20:23.320Z",
  "updatedAt": "2023-11-03T10:05:33.006Z",
  "categoryId": 5,
  "authorId": 1
}
```

_Response (404 - Not Found)_

```json
{
  "message": "cuisine not found"
}
```

## 6. PUT /cuisines/:id

Request :

- headers

```json
{
  "authorization": "string"
}
```

- params

```json
{
  "id": "string"
}
```

- body

```json
{
  "id": 3,
  "name": "Pizza",
  "description": "Pizza with Pineapple",
  "price": 75000,
  "imgUrl": "https://media.istockphoto.com/id/521403691/photo/hot-homemade-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=PaISuuHcJWTEVoDKNnxaHy7L2BTUkyYZ06hYgzXmTbo=",
  "createdAt": "2023-11-03T09:40:28.483Z",
  "updatedAt": "2023-11-03T23:37:13.215Z",
  "categoryId": 5,
  "authorId": 1
}
```

_Response (200 - OK)_

```json
{
  "id": 3,
  "name": "Pizza",
  "description": "Pizza with Pineapple",
  "price": 75000,
  "imgUrl": "https://media.istockphoto.com/id/521403691/photo/hot-homemade-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=PaISuuHcJWTEVoDKNnxaHy7L2BTUkyYZ06hYgzXmTbo=",
  "createdAt": "2023-11-03T09:40:28.483Z",
  "updatedAt": "2023-11-03T23:37:13.215Z",
  "categoryId": 5,
  "authorId": 1
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "name is required"
}
OR
{
  "message": "description is required"
}
OR
{
  "message": "price is required"
}
OR
{
  "message": "imgUrl is required"
}
OR
{
  "message": "categoryId is required"
}
OR
{
  "message": "authorId is required"
}

```

_Response (404 - Not Found)_

```json
{
  "message": "cuisine not found"
}
```

## 7. PATCH /cuisines/:id

Request :

- headers

```json
{
  "authorization": "string"
}
```

- params

```json
{
  "id": "string"
}
```

- file

```json
{
  "fieldname": "imgUrl",
  "originalname": "BAKU Logo.png",
  "encoding": "7bit",
  "mimetype": "image/png",
  "buffer": "<Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 01 f4 00 00 01 f4 08 06 00 00 00 cb d6 df 8a 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 09
... 11937 more bytes>",
  "size": 11987
}

```

_Response (200 - OK)_

```json
{
  "message": "cuisine image updated successfully"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "file is required"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "cuisine not found"
}
```

## 8. DELETE /cuisines/:id

Request :

- headers

```json
{
  "authorization": "string"
}
```

- params

```json
{
  "id": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "cuisine successfully deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "cuisine not found"
}
```

## 9. POST /categories

Request :

- headers

```json
{
  "authorization": "string"
}
```

- body

```json
{
  "name": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "name": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "name is required"
}
```

## 10. GET /categories

Request :

- headers

```json
{
  "authorization": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Appetizer",
    "createdAt": "2023-11-03T06:16:00.432Z",
    "updatedAt": "2023-11-03T06:16:00.432Z"
  },
  ...
]
```

## 11. PUT /categories/:id

Request :

- headers

```json
{
  "authorization": "string"
}
```

- params

```json
{
  "id": "string"
}
```

- body

```json
{
  "name": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": 11,
  "name": "Noodle",
  "createdAt": "2023-11-03T09:53:57.713Z",
  "updatedAt": "2023-11-03T10:02:14.128Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "name is required"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "category not found"
}
```

## 12. DELETE /categories/:id

Request :

- headers

```json
{
  "authorization": "string"
}
```

- params

```json
{
  "id": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "category successfully deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "category not found"
}
```

## 13. GET /pub/cuisines

Request :

- headers

```json
{
  "authorization": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 4,
        "name": "Pepperoni Pasta",
        "description": "Pizza with pepperoni",
        "price": 100000,
        "imgUrl": "https://media.istockphoto.com/id/521403691/photo/hot-homemade-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=PaISuuHcJWTEVoDKNnxaHy7L2BTUkyYZ06hYgzXmTbo=",
        "createdAt": "2023-11-03T09:40:57.365Z",
        "updatedAt": "2023-11-03T09:40:57.365Z",
        "categoryId": 5,
        "authorId": 1
    },
    ...
]
```

## 14. GET /pub/cuisines/:id

Request :

- headers

```json
{
  "authorization": "string"
}
```

- params

```json
{
  "id": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": 4,
  "name": "Pepperoni Pasta",
  "description": "Pizza with pepperoni",
  "price": 100000,
  "imgUrl": "https://media.istockphoto.com/id/521403691/photo/hot-homemade-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=PaISuuHcJWTEVoDKNnxaHy7L2BTUkyYZ06hYgzXmTbo=",
  "createdAt": "2023-11-03T09:40:57.365Z",
  "updatedAt": "2023-11-03T09:40:57.365Z",
  "categoryId": 5,
  "authorId": 1
}
```

_Response (404 - Not Found)_

```json
{
  "message": "cuisine not found"
}
```

## Global Error

_Response (401 - JsonWebTokenError)_

```json
{
  "message": "jwt must be provided"
}
```

_Response (401 - Unauthenticated)_

```json
{
  "message": "invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "you are not authorized"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "internal server error"
}
```
