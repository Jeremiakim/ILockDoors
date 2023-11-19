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

- `PUT /rooms/:roomId`
- `PATCH /rooms/:roomId (VACANT)`
- `PATCH /rooms/:roomId (BOOKED)`
- `DELETE /rooms/:id`

&nbsp;

## 1. POST /register

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
  "fullName": "string",
  "email": "string",
  "password": "string",
  "address": "string",
  "phoneNumber": "string"
}
```

_Response (201 - Created)_

```json
{
  "msg": "User Id 6 was created",
  "New_User": {
    "id": "integer",
    "email": "string"
  }
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Name Must Be Required"
}
OR
{
    "message": "Email Must Be Required"
}
OR
{
    "message": "Email Alredy Exists"
}
OR
{
    "message": "Email Must Be Unique"
}
OR
{
    "message": "Password Must Be Required"
}
OR
{
    "message": "Address Must Be Required"
}
OR
{
    "message": "Phone Number Must Be Required"
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
    "message": "Email Must Be Required"
}
OR
{
    "message": "Password Must Be Required"
}
OR
{
    "message": "Invalid Email Or Password"
}
```

## 3. POST /rooms

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
  "roomNumber": "integer",
  "description": "string",
  "price": "integer",
  "imgUrl": "string",
  "startDate": "date",
  "endDate": "date",
  "status": "string",
  "externalId": "string",
  "UserId": "integer",
  "AccomodationId": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": 9,
  "name": " Villa Papua",
  "roomNumber": 1,
  "imgUrl": "asdoin",
  "price": 1000000,
  "description": "helo ini ada di apua",
  "startDate": "2020-11-10T17:00:00.000Z",
  "endDate": "2020-12-11T17:00:00.000Z",
  "status": "vacant",
  "externalId": "A-1700400274730",
  "UserId": 1,
  "AccomodationId": 1,
  "updatedAt": "2023-11-19T13:24:34.723Z",
  "createdAt": "2023-11-19T13:24:34.723Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "name is required"
}
OR
{
  "message": "Room Number is required"
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
    "message": "Start date Cannot Be Null"
}
OR
{
    "message": "End date Cannot Be Null"
}
OR
{
    "message": "External Id date Cannot Be Null"
}
OR
{
  "message": "UserId is required"
}
OR
{
  "message": "AccomodationId is required"
}
```

## 4. GET /rooms

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
        "id": 3,
        "name": "Kost Welos Tangerang",
        "roomNumber": 2,
        "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqWouql30GfzDzhRWhEIxnr2i8QcowQm6iPw&usqp=CAU",
        "price": 1000000,
        "description": "Ac,kasur,tv",
        "startDate": "2023-11-20T00:00:00.000Z",
        "endDate": "2023-12-05T00:00:00.000Z",
        "status": "vacant",
        "externalId": "A-6751638",
        "UserId": 3,
        "AccomodationId": 1,
        "createdAt": "2023-11-17T05:26:39.863Z",
        "updatedAt": "2023-11-17T05:26:39.863Z",
        "Accomodation": {
            "id": 1,
            "name": "DeKhost",
            "city": "Tangerang Selatan",
            "createdAt": "2023-11-17T05:26:39.850Z",
            "updatedAt": "2023-11-17T05:26:39.850Z"
        }
    },
  ...,
]
```

## 5. GET /rooms/:roomId

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
  "message": "Success to read Room 1",
  "room": {
    "id": 1,
    "name": "Villa Bogor Temple Gress",
    "roomNumber": 1,
    "imgUrl": "https://ik.imagekit.io/tvlk/blog/2022/04/Vila-Murah-di-Puncak-dengan-Harga-200-Ribuan-Aries-Biru-Hotel-Villa--1024x683.jpeg",
    "price": 2500000,
    "description": "Ac,kamar mandi,kasur,tv,lemari baju,dapur",
    "startDate": "2023-11-15T00:00:00.000Z",
    "endDate": "2023-11-20T00:00:00.000Z",
    "status": "vacant",
    "externalId": "A-12872138",
    "UserId": 1,
    "AccomodationId": 2,
    "createdAt": "2023-11-17T05:26:39.862Z",
    "updatedAt": "2023-11-17T05:26:39.863Z",
    "Accomodation": {
      "id": 2,
      "name": "Villa Puncak",
      "city": "Bogor",
      "createdAt": "2023-11-17T05:26:39.850Z",
      "updatedAt": "2023-11-17T05:26:39.850Z"
    }
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "This room does not exists"
}
```

## 6. PUT /rooms/:roomId

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
  "name": "string",
  "roomNumber": "integer",
  "description": "string",
  "price": "integer",
  "imgUrl": "string",
  "startDate": "date",
  "endDate": "date",
  "status": "string",
  "externalId": "string",
  "UserId": "integer",
  "AccomodationId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Updated Room Success",
  "findRoom": {
    "id": 4,
    "name": " Villa Papua",
    "roomNumber": 1,
    "imgUrl": "asdoin",
    "price": 1000000,
    "description": "helo ini ada di apua",
    "startDate": "2020-11-10T17:00:00.000Z",
    "endDate": "2020-12-11T17:00:00.000Z",
    "status": "vacant",
    "externalId": "A-Sun Nov 19 2023 20:15:09 GMT+0700 (Indochina Time)",
    "UserId": 1,
    "AccomodationId": 1,
    "createdAt": "2023-11-19T13:15:09.810Z",
    "updatedAt": "2023-11-19T13:15:09.810Z"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "name is required"
}
OR
{
  "message": "Room Number is required"
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
    "message": "Start date Cannot Be Null"
}
OR
{
    "message": "End date Cannot Be Null"
}
OR
{
    "message": "External Id date Cannot Be Null"
}
OR
{
  "message": "UserId is required"
}
OR
{
  "message": "AccomodationId is required"
}

```

_Response (404 - Not Found)_

```json
{
  "message": "This room does not exists"
}
```

## 7. PATCH /rooms/:roomId

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
  "status": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Booked",
  "findRoom": {
    "id": 3,
    "name": "Kost Welos Tangerang",
    "roomNumber": 2,
    "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqWouql30GfzDzhRWhEIxnr2i8QcowQm6iPw&usqp=CAU",
    "price": 1000000,
    "description": "Ac,kasur,tv",
    "startDate": "2023-11-20T00:00:00.000Z",
    "endDate": "2023-12-05T00:00:00.000Z",
    "status": "booked",
    "externalId": "A-6751638",
    "UserId": 3,
    "AccomodationId": 1,
    "createdAt": "2023-11-17T05:26:39.863Z",
    "updatedAt": "2023-11-19T13:32:26.539Z"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "This room does not exists"
}
```

## 8. DELETE /rooms/:roomId

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
  "message": "Success to delete room",
  "findRoom": {
    "id": 9,
    "name": " Villa Papua",
    "roomNumber": 1,
    "imgUrl": "asdoin",
    "price": 1000000,
    "description": "helo ini ada di apua",
    "startDate": "2020-11-10T17:00:00.000Z",
    "endDate": "2020-12-11T17:00:00.000Z",
    "status": "booked",
    "externalId": "A-1700400274730",
    "UserId": 1,
    "AccomodationId": 1,
    "createdAt": "2023-11-19T13:24:34.723Z",
    "updatedAt": "2023-11-19T13:35:18.380Z"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "This room does not exists"
}
```

## 9. POST /accomodations

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
  "name": "string",
  "city": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "Success to Add accomodation",
  "accomodation": {
    "id": 3,
    "name": "The Hotels",
    "city": "Jikoda",
    "updatedAt": "2023-11-19T13:38:53.030Z",
    "createdAt": "2023-11-19T13:38:53.030Z"
  }
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Name Cannot Be Null"
}
OR
{
    "message": "City Cannot Be Null"
}
```

## 10. GET /accomodations

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
            "name": "DeKhost",
            "city": "Tangerang Selatan",
            "createdAt": "2023-11-17T05:26:39.850Z",
            "updatedAt": "2023-11-17T05:26:39.850Z",
            "Rooms": [
                {
                    "id": 8,
                    "name": " Villa Papua",
                    "roomNumber": 1,
                    "imgUrl": "asdoin",
                    "price": 1000000,
                    "description": "helo ini ada di apua",
                    "startDate": "2020-11-10T17:00:00.000Z",
                    "endDate": "2020-12-11T17:00:00.000Z",
                    "status": "booked",
                    "externalId": "A-1700400158693",
                    "UserId": 1,
                    "AccomodationId": 1,
                    "createdAt": "2023-11-19T13:22:38.692Z",
                    "updatedAt": "2023-11-19T13:34:58.970Z"
                },
  ...
            ]
  }
]
```

## 11. PUT /accomodations/:accomodationId

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
  "name": "string",
  "city": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success to Update accomodation",
  "findAccomodation": {
    "id": 3,
    "name": "Kpauas Villasoainsd",
    "city": "Papua",
    "createdAt": "2023-11-19T13:38:53.030Z",
    "updatedAt": "2023-11-19T13:43:36.725Z"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "name is cannot be null"
}
OR
{
  "message": "city is cannot be null"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "This Accomodation does not exists"
}
```

## 12. DELETE /accomodations/:accomodationId

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
  "message": "Success to Delete accomodation",
  "findAccomodation": {
    "id": 3,
    "name": "Kpauas Villasoainsd",
    "city": "Papua",
    "createdAt": "2023-11-19T13:38:53.030Z",
    "updatedAt": "2023-11-19T13:44:40.457Z"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "This Accomodation does not exists"
}
```
