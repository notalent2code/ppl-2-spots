# SPOTS REST API Specification

## Authentication

### Register

Request :

- Method : POST
- Endpoint : `/api/auth/register`
- Header :

  - Content-Type: application/json
  - Accept: application/json

- Body (Tenant) :

```json
{
  "email": "megumi@gmail.com",
  "password": "coba12345",
  "confirm_password": "coba12345",
  "first_name": "Megumi",
  "last_name": "Kato",
  "phone_number": "+6285712345678",
  "user_type": "TENANT"
}
```

Response (Tenant) :

```json
{
  "message": "User created successfully",
  "user": {
    "user_id": 1,
    "email": "megumi@gmail.com",
    "first_name": "Megumi",
    "last_name": "Kato",
    "phone_number": "085712345678",
    "refresh_token": null,
    "user_type": "TENANT",
    "created_at": "2023-05-15T12:55:00.031Z",
    "updated_at": "2023-05-15T12:55:00.031Z",
    "tenant": {
      "tenant_id": 1,
      "user_id": 1,
      "avatar_url": "https://api.spotscoworking.live/uploads/avatar/default-avatar.png"
    }
  }
}
```

- Body (Owner):

```json
{
  "email": "chisato@gmail.com",
  "password": "coba12345",
  "confirm_assword": "coba12345",
  "first_name": "Chisato",
  "last_name": "Nishikigi",
  "phone_number": "+6285712345672",
  "user_type": "OWNER"
}
```

Response (Owner) :

```json
{
  "message": "User created successfully",
  "user": {
    "user_id": 2,
    "email": "chisato@gmail.com",
    "first_name": "Chisato",
    "last_name": "Nishikigi",
    "phone_number": "085712345679",
    "refresh_token": null,
    "user_type": "OWNER",
    "created_at": "2023-05-15T12:55:50.031Z",
    "updated_at": "2023-05-15T12:55:50.031Z",
    "owner": {
      "owner_id": 1,
      "user_id": 2,
      "nik": null,
      "ktp_picture": null,
      "balance": "0",
      "bank_name": null,
      "card_number": null,
      "status": "PENDING"
    }
  }
}
```

### Login

Request :

- Method : POST
- Endpoint : `/api/auth/login`
- Header :
  - Content-Type: application/json
  - Accept: application/json
- Body (Tenant, Owner, Admin) :

```json
{
  "email": "megumi@gmail.com",
  "password": "coba12345"
}
```

Response :

```json
{
  "message": "Login success",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Refresh Token

Request :

- Method : GET
- Endpoint : `/api/auth/refresh-token`
- Header :
  - Content-Type: application/json
  - Accept: application/json

Response :

```json
{
  "message": "Refresh token success",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Logout

Request :

- Method : DELETE
- Endpoint : `/api/auth/logout`
- Header :
  - Content-Type: application/json
  - Accept: application/json
  - Authorization : Bearer <access_token>

Response :

```json
{
  "message": "Logout success"
}
```

## Tenant

### Profile

Request :

- Method : GET
- Endpoint : `/api/tenants/profile`
- Header :

  - Content-Type: application/json
  - Accept: application/json
  - Authorization : Bearer <access_token>

- Response :

```json
{
  "tenant": {
    "tenant_id": 1,
    "user_id": 1,
    "avatar_url": "https://api.spotscoworking.live/uploads/avatar/default-avatar.png",
    "user": {
      "email": "megumi@gmail.com",
      "first_name": "Megumi",
      "last_name": "Kato",
      "phone_number": "+6285712345678"
    }
  }
}
```

### Edit Profile

Request :

- Method : PUT
- Endpoint : `/api/tenants/profile`
- Header :

  - Content-Type: multipart/form-data
  - Accept: application/json
  - Authorization : Bearer <access_token>

- Body (Tenant) :

```json
{
  "email": "megumi@gmail.com",
  "first_name": "Megumin",
  "last_name": "Nishikigi",
  "avatar_url": "avatar_url=@\"/C:/Users/user/Downloads/megumi.jpg\";type=image/jpg",
  "phone_number": "+6285712345677"
}
```

- Response :

```json
{
  "tenant": {
    "tenant_id": 1,
    "user_id": 1,
    "avatar_url": "https://api.spotscoworking.li/uploads/avatar/68b50401-5e3b-406f-b972-26bc94d57a89.jpg",
    "user": {
      "email": "megumi@gmail.com",
      "first_name": "Megumin",
      "last_name": "Nishikigi",
      "phone_number": "+6285712345677"
    }
  }
}
```

## Owner

### Information

Request :

- Method : GET
- Endpoint : `api/owners/info`
- Header :
  - Content-Type: application/json
  - Accept: application/json
  - Authorization : Bearer <access_token>

Response (Owner) :

```json
{
  "message": "Owner information retrieved successfully",
  "owner": {
    "owner_id": 1,
    "user_id": 2,
    "nik": "3272012589050088",
    "ktp_picture": "https://api.spotscoworking.live/uploads/ktp/936c9112-130a-4c8f-8c64-f978ecb96878.jpg",
    "balance": "0",
    "bank_name": "BNI",
    "card_number": "1815850071",
    "status": "APPROVED",
    "user": {
      "email": "chisato@gmail.com",
      "first_name": "Chisato",
      "last_name": "Nishikigi",
      "phone_number": "+6285712345679"
    }
  }
}
```

### Edit Information

Request :

- Method : PUT
- Endpoint : `api/owners/info`
- Header :

  - Content-Type: application/json
  - Accept: application/json

- Body (Owner) :

```json
{
  "nik": "3272012589050088",
  "ktp_picture": "ktp_picture=@\"/C:/Users/user/Downloads/ktp.jpg\";type=image/jpg",
  "bank_name": "BNI",
  "card_number": "1815850071"
}
```

- Response (Owner) :

```json
{
  "message": "Owner information updated successfully",
  "updated_owner": {
    "owner_id": 1,
    "user_id": 2,
    "nik": "3272012589050088",
    "ktp_picture": "https://api.spotscoworking.live/uploads/ktp/2f408a00-3fe9-4ab9-855a-8a2fe351c779.jpg",
    "balance": "0",
    "bank_name": "BNI",
    "card_number": "1815850071",
    "status": "APPROVED"
  }
}
```

## Admin

### Get All Tenants

Request :

- Method : GET
- Endpoint : `/api/admin/tenants`
- Header :

  - Content-Type: application/json
  - Accept: application/json
  - Authorization : Bearer <access_token>

- Response :

```json
{
  "tenants": [
    {
      "tenant_id": 1,
      "user_id": 1,
      "avatar_url": "https://api.spotscoworking.live/uploads/avatar/1_1684155961952.jpg",
      "user": {
        "email": "megumi@gmail.com",
        "first_name": "Megumin",
        "last_name": "Kato",
        "phone_number": "085712345678"
      }
    },
    {
      "tenant_id": 3,
      "user_id": 4,
      "avatar_url": "https://api.spotscoworking.live/uploads/avatar/default-avatar.png",
      "user": {
        "email": "megumi2@gmail.com",
        "first_name": "Megumi",
        "last_name": "Kato",
        "phone_number": "085712345672"
      }
    }
  ]
}
```

### Get All Owners

Request :

- Method : GET
- Endpoint : `/api/admin/owners`
- Header :

  - Content-Type: application/json
  - Accept: application/json
  - Authorization : Bearer <access_token>

- Response :

```json
{
  "owners": [
    {
      "owner_id": 1,
      "user_id": 2,
      "nik": "3272012589050088",
      "ktp_picture": "https://api.spotscoworking.live/uploads/ktp/2f408a00-3fe9-4ab9-855a-8a2fe351c779.jpg",
      "balance": "0",
      "bank_name": "BNI",
      "card_number": "1815850071",
      "status": "PENDING",
      "user": {
        "email": "chisato@gmail.com",
        "first_name": "Chisato",
        "last_name": "Nishikigi",
        "phone_number": "+6285712345679"
      }
    },
    {
      "owner_id": 2,
      "user_id": 6,
      "nik": null,
      "ktp_picture": null,
      "balance": "0",
      "bank_name": null,
      "card_number": null,
      "status": "PENDING",
      "user": {
        "email": "chisato2@gmail.com",
        "first_name": "Chisato",
        "last_name": "Nishikigi",
        "phone_number": "+6285712345670"
      }
    }
  ]
}
```

### Verify Owner

Request :

- Method : PUT
- Endpoint : `/api/admin/owners/:owner_id/verify`
- Header :
  - Content-Type: application/json
  - Accept: application/json
  - Authorization : Bearer <access_token>
- Path Variables : owner_id
- Body :

```json
{
  "owner_status": "APPROVED"
}
```

Response :

```json
{
  "owner": {
    "owner_id": 1,
    "user_id": 2,
    "nik": "3272012589050088",
    "ktp_picture": "https://api.spotscoworking.live/uploads/ktp/2f408a00-3fe9-4ab9-855a-8a2fe351c779.jpg",
    "balance": "0",
    "bank_name": "BNI",
    "card_number": "1815850071",
    "status": "APPROVED"
  }
}
```

### Verify Coworking Space

Request :

- Method : PUT
- Endpoint : `/api/admin/coworking-space/:space_id/verify`
- Header :
  - Content-Type: application/json
  - Accept: application/json
  - Authorization : Bearer <access_token>
- Path Variables : space_id

- Body :

```json
{
  "spaceStatus": "APPROVED"
}
```

Response :

```json
{
  "message": "Coworking space status changed successfully",
  "coworking_space": {
    "space_id": 2,
    "name": "Coworking Space Dummy",
    "description": "lorem ipsum dolor sit amet",
    "price": 275000,
    "capacity": 30,
    "owner_id": 1,
    "status": "APPROVED",
    "created_at": "2023-05-15T13:23:33.867Z",
    "updated_at": "2023-05-15T13:28:16.345Z"
  }
}
```

## Coworking Space

### Get All Coworking Space

Request :

- Method : GET
- Endpoint : `/api/coworking-spaces`
- Header :
  - Content-Type: application/json
  - Accept: application/json
  - Authorization : Bearer <access_token>

Response :

```json
{
  "message": "Coworking spaces retrieved successfully",
  "coworking_spaces": [
    {
      "name": "Coworking Space Dummy",
      "price": "275000",
      "capacity": 30,
      "status": "APPROVED",
      "location": {
        "location_id": 2,
        "space_id": 2,
        "address": "Jakarta",
        "latitude": -6.9254862,
        "longitude": 107.7743648
      },
      "coworking_space_images": [
        {
          "image_url": "https://api.spotscoworking.live/uploads/coworking_space/87628_1684157013846.jpeg"
        }
      ]
    },
    {
      "name": "Coworking Space Dummy 3",
      "price": "150000",
      "capacity": 15,
      "status": "APPROVED",
      "location": {
        "location_id": 4,
        "space_id": 4,
        "address": "Bandung",
        "latitude": -6.9254861,
        "longitude": 107.7743647
      },
      "coworking_space_images": [
        {
          "image_url": "https://api.spotscoworking.live/uploads/coworking_space/27094_1684157456092.jpeg"
        }
      ]
    }
  ]
}
```

### Get by ID Coworking Space

Request :

- Method : GET
- Endpoint : `/api/coworking-spaces/:space_id`
- Header :
  - Content-Type: application/json
  - Accept: application/json
  - Authorization : Bearer <access_token>
- Path Variables : space_id

Response :

```json
{
  "message": "Coworking space detail retrieved successfully",
  "coworking_space": {
    "name": "Coworking Space Dummy 3",
    "description": "lorem ipsum",
    "price": "150000",
    "capacity": 15,
    "status": "APPROVED",
    "owner": {
      "user": {
        "phone_number": "085712345670"
      }
    },
    "location": {
      "location_id": 4,
      "address": "Bandung",
      "latitude": -6.9254861,
      "longitude": 107.7743647
    },
    "coworking_space_images": [
      {
        "image_url": "https://api.spotscoworking.live/uploads/coworking_space/53183fac-b3a7-4cfd-a20e-fe964139ba29.jpg"
      },
      {
        "image_url": "https://api.spotscoworking.live/uploads/coworking_space/2d848a5a-fa37-4915-af1c-4338ca24ed77.jpg"
      }
    ],
    "coworking_space_facilities": [
      {
        "facility": {
          "facility_id": 1,
          "name": "WiFi",
          "description": "Koneksi internet nirkabel yang cepat dan stabil untuk kebutuhan penyewa"
        }
      },
      {
        "facility": {
          "facility_id": 10,
          "name": "Ruang Tunggu",
          "description": "Area yang nyaman untuk menunggu"
        }
      },
      {
        "facility": {
          "facility_id": 11,
          "name": "Parkir Mobil",
          "description": "Tempat parkir yang tersedia untuk mobil"
        }
      },
      {
        "facility": {
          "facility_id": 12,
          "name": "Parkir Motor",
          "description": "Tempat parkir yang tersedia untuk motor"
        }
      }
    ]
  }
}
```

### Add Coworking Space (Owner)

Request :

- Method : POST
- Endpoint : `/api/coworking-spaces`
- Header :

  - Content-Type: multipart/form-data
  - Accept: application/json
  - Authorization : Bearer <access_token>

- Body

```json
{
  "name": "Coworking Space Dummy 2",
  "description": "lorem ipsum",
  "price": "250000",
  "capacity": 20,
  "address": "Sumedang",
  "latitude": "-6.9254861",
  "longitude": "107.7743647",
  "images": [
    "image_url=@\"/C:/Users/user/Downloads/coworking_space1.jpg\";type=image/jpg",
    "image_url=@\"/C:/Users/user/Downloads/coworking_space2.jpg\";type=image/jpg"
  ],
  "facilities": [5, 6, 7, 8, 9]
}
```

Response :

```json
{
  "message": "Add coworking space success",
  "coworkingSpace": {
    "space_id": 3,
    "name": "Coworking Space Dummy 2",
    "description": "lorem ipsum",
    "price": "250000",
    "capacity": 20,
    "owner_id": 1,
    "status": "PENDING",
    "created_at": "2023-05-15T13:24:33.118Z",
    "updated_at": "2023-05-15T13:24:33.118Z"
  },
  "location": {
    "location_id": 3,
    "space_id": 3,
    "address": "Sumedang",
    "latitude": -6.9254861,
    "longitude": 107.7743647
  },
  "images": [
    {
      "image_id": 5,
      "space_id": 3,
      "image_url": "https://api.spotscoworking.live/uploads/coworking_space/53183fac-b3a7-4cfd-a20e-fe964139ba29.jpg"
    },
    {
      "image_id": 6,
      "space_id": 3,
      "image_url": "https://api.spotscoworking.live/uploads/coworking_space/2d848a5a-fa37-4915-af1c-4338ca24ed77.jpg"
    }
  ],
  "facilities": [
    {
      "space_id": 3,
      "facility_id": 5,
      "facility": {
        "facility_id": 5,
        "name": "TV LED",
        "description": "Televisi layar datar yang dapat digunakan untuk presentasi"
      }
    },
    {
      "space_id": 3,
      "facility_id": 6,
      "facility": {
        "facility_id": 6,
        "name": "Air Mineral",
        "description": "Air minum yang disediakan secara gratis untuk para penyewa"
      }
    },
    {
      "space_id": 3,
      "facility_id": 7,
      "facility": {
        "facility_id": 7,
        "name": "Kursi Tambahan",
        "description": "Kursi ekstra yang tersedia jika diperlukan"
      }
    },
    {
      "space_id": 3,
      "facility_id": 8,
      "facility": {
        "facility_id": 8,
        "name": "Flipchart",
        "description": "Papan tulis dengan kertas yang bisa digunakan untuk membuat catatan"
      }
    },
    {
      "space_id": 3,
      "facility_id": 9,
      "facility": {
        "facility_id": 9,
        "name": "Sound System",
        "description": "Sistem audio yang lengkap untuk mendukung kegiatan presentasi"
      }
    }
  ]
}
```

### Edit Coworking Space (Owner)

Request :

- Method : PUT
- Endpoint : `/api/coworking-spaces/:spaceId`
- Header :

  - Content-Type: multipart/form-data
  - Accept: application/json
  - Authorization : Bearer <access_token>

- Body

```json
{
  "name": "Coworking Space Dummy",
  "description": "lorem ipsum dolor sit amet",
  "price": "275000",
  "capacity": 30,
  "address": "Jakarta",
  "latitude": "-6.9254862",
  "longitude": "107.7743648",
  "images": [
    "image_url=@\"/C:/Users/user/Downloads/coworking_space1.jpg\";type=image/jpg",
    "image_url=@\"/C:/Users/user/Downloads/coworking_space2.jpg\";type=image/jpg"
  ],
  "facilities": [1, 2, 3, 4, 5]
}
```

Response :

```json
{
  "message": "Edit coworking space success",
  "coworkingSpace": {
    "space_id": 2,
    "name": "Coworking Space Dummy",
    "description": "lorem ipsum dolor sit amet",
    "price": "275000",
    "capacity": 30,
    "owner_id": 1,
    "status": "PENDING",
    "created_at": "2023-05-15T13:23:33.867Z",
    "updated_at": "2023-05-15T13:26:42.176Z"
  },
  "location": {
    "location_id": 2,
    "space_id": 2,
    "address": "Jakarta",
    "latitude": -6.9254862,
    "longitude": 107.7743648
  },
  "images": [
    {
      "image_id": 3,
      "space_id": 2,
      "image_url": "https://api.spotscoworking.live/uploads/coworking_space/53183fac-b3a7-4cfd-a20e-fe964139ba29.jpg"
    },
    {
      "image_id": 4,
      "space_id": 2,
      "image_url": "https://api.spotscoworking.live/uploads/coworking_space/2d848a5a-fa37-4915-af1c-4338ca24ed77.jpg"
    }
  ],
  "facilities": [
    {
      "space_id": 2,
      "facility_id": 1,
      "facility": {
        "facility_id": 1,
        "name": "WiFi",
        "description": "Koneksi internet nirkabel yang cepat dan stabil untuk kebutuhan penyewa"
      }
    },
    {
      "space_id": 2,
      "facility_id": 2,
      "facility": {
        "facility_id": 2,
        "name": "AC",
        "description": "Sistem pendingin udara yang membuat lingkungan kerja tetap nyaman dan sejuk"
      }
    },
    {
      "space_id": 2,
      "facility_id": 3,
      "facility": {
        "facility_id": 3,
        "name": "Proyektor",
        "description": "Alat untuk memproyeksikan presentasi atau konten multimedia di layar besar"
      }
    },
    {
      "space_id": 2,
      "facility_id": 4,
      "facility": {
        "facility_id": 4,
        "name": "Stop Kontak",
        "description": "Sumber daya listrik yang mudah diakses untuk mengisi daya perangkat elektronik"
      }
    },
    {
      "space_id": 2,
      "facility_id": 5,
      "facility": {
        "facility_id": 5,
        "name": "TV LED",
        "description": "Televisi layar datar yang dapat digunakan untuk presentasi"
      }
    }
  ]
}
```

## Booking

### Book Coworking Space (Tenant)

Request :

- Method : POST
- Endpoint : `/api/bookings/:space_id/book`
- Header :
  - Content-Type: application/json
  - Accept: application/json
  - Authorization : Bearer <access_token>
- Path Variables : space_id

- Body :

```json
{
  "date": "2023-05-18",
  "start_hour": "11",
  "end_hour": "13",
  "total_price": "275000"
}
```

Response :

```json
{
  "message": "Book coworking space success",
  "data": {
    "booking": {
      "booking_id": "95c92fa9-fee7-4571-a352-e78093d4b1b9",
      "space_id": 2,
      "tenant_id": 1,
      "date": "2023-05-18",
      "start_hour": 11,
      "end_hour": 13,
      "total_price": "275000",
      "created_at": "2023-05-18T15:25:18.444Z",
      "updated_at": "2023-05-18T15:25:18.444Z"
    },
    "coworking_space": {
      "name": "Coworking Space Dummy",
      "price": "275000",
      "capacity": 30
    }
  }
}
```

### Get All Booking History (Tenant)

Request :

- Method : GET
- Endpoint : `/api/bookings/history`
- Header :
  - Content-Type: application/json
  - Accept: application/json
  - Authorization : Bearer <access_token>

Response :

```json
{
  "message": "Booking history retrieved successfully",
  "bookings": [
    {
      "booking_id": "52d60b8c-edb2-4c40-9982-1f87af7910ef",
      "date": "2023-05-17",
      "coworking_space": {
        "name": "Coworking Space Dummy"
      },
      "payment": {
        "amount": "275000",
        "method": "bank_transfer",
        "status": "settlement"
      }
    },
    {
      "booking_id": "95c92fa9-fee7-4571-a352-e78093d4b1b9",
      "date": "2023-05-18",
      "coworking_space": {
        "name": "Coworking Space Dummy"
      },
      "payment": {
        "amount": "275000",
        "method": "bank_transfer",
        "status": "settlement"
      }
    }
  ]
}
```

### Callback Booking Detail (Tenant)

Request :

- Method : GET
- Endpoint : `/api/bookings?order_id=value`
- Header :
  - Content-Type: application/json
  - Accept: application/json
  - Authorization : Bearer <access_token>
- Params : order_id

Response :

```json
{
  "message": "Booking detail retrieved successfully",
  "booking": {
    "booking_id": "95c92fa9-fee7-4571-a352-e78093d4b1b9",
    "space_id": 2,
    "tenant_id": 1,
    "date": "2023-05-18",
    "start_hour": 11,
    "end_hour": 13,
    "total_price": "275000",
    "created_at": "2023-05-18T15:25:18.444Z",
    "updated_at": "2023-05-18T15:25:18.444Z",
    "coworking_space": {
      "name": "Coworking Space Dummy"
    },
    "payment": {
      "payment_id": "ac940744-5933-479c-9f7f-7cab70be5fc5",
      "method": "bank_transfer",
      "amount": "275000",
      "status": "settlement"
    }
  }
}
```

## Payment

### Booking Payment

Request :

- Method : POST
- Endpoint : `/api/payments/booking`
- Header :
  - Content-Type: application/json
  - Accept: application/json
  - Authorization : Bearer <access_token>
- Body :

```json
{
  "booking_id": "95c92fa9-fee7-4571-a352-e78093d4b1b9"
}
```

Response :

```json
{
  "message": "Payment created successfully",
  "snap_res": {
    "token": "ca98488a-8aa3-4028-86fa-8610fda46eb1",
    "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/ca98488a-8aa3-4028-86fa-8610fda46eb1"
  }
}
```
