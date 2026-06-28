# Visitor Pass Management System — Backend

A RESTful API built with Node.js and Express that powers the Visitor Pass Management System. It handles authentication, role-based access control, visitor management, appointment scheduling, QR code pass generation, and check-in/check-out logging.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JSON Web Tokens (JWT) + bcrypt
- **QR Code Generation**: qrcode
- **Email Notifications**: Resend
- **Environment Variables**: dotenv
- **Dev Server**: nodemon
- **Email Service**: Resend (HTTPS-based, no SMTP)

---

## Project Structure

```
backend/
├── config/
│   ├── db.js               # MongoDB connection
│   └── emailConfig.js      # Nodemailer transporter + email helper
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── visitorController.js
│   ├── appointmentController.js
│   ├── passController.js
│   └── checkLogController.js
├── middleware/
│   ├── authMiddleware.js    # JWT protect middleware
│   └── roleMiddleware.js    # Role-based access control
├── models/
│   ├── userModel.js
│   ├── visitorModel.js
│   ├── appointmentModel.js
│   ├── passModel.js
│   └── checkLogModel.js
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── visitorRoutes.js
│   ├── appointmentRoutes.js
│   ├── passRoutes.js
│   └── checkLogRoutes.js
├── server.js
└── .env
```

---

## Environment Variables

Create a `.env` file in the `backend/` directory with the following:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
RESEND_API_KEY=your_resend_api_key
```


---

## Installation

```bash
# Navigate to the backend folder
cd backend

# Install dependencies
npm install
```

---

## Running the Server

```bash
# Development (with auto-restart)
npx nodemon server.js

# Or with node directly
node server.js
```

The server runs on `http://localhost:5000` by default.

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |
| POST | `/api/auth/logout` | Logout |

### Users
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/users` | Admin |
| PUT | `/api/users/:id` | Admin |
| DELETE | `/api/users/:id` | Admin |

### Visitors
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/visitors` | Admin, Security, Employee |
| GET | `/api/visitors/email/:email` | Admin, Visitor |
| GET | `/api/visitors/:id` | Admin, Security, Employee |
| POST | `/api/visitors` | Admin, Security, Employee |
| PUT | `/api/visitors/:id` | Admin, Security |
| DELETE | `/api/visitors/:id` | Admin |

### Appointments
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/appointments` | Admin, Employee |
| GET | `/api/appointments/host/:hostId` | Admin, Employee |
| GET | `/api/appointments/:id` | Admin, Employee |
| POST | `/api/appointments` | Admin, Employee |
| PUT | `/api/appointments/:id` | Admin, Employee |
| DELETE | `/api/appointments/:id` | Admin |

### Passes
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/passes` | Admin, Security |
| GET | `/api/passes/id/:visitorId` | Admin, Visitor |
| GET | `/api/passes/:id` | Admin, Security |
| POST | `/api/passes` | Admin, Security |
| PUT | `/api/passes/:id` | Admin |
| DELETE | `/api/passes/:id` | Admin |

### Check Logs
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/checklogs` | Admin, Security |
| GET | `/api/checklogs/pass/:passId` | Admin, Security |
| POST | `/api/checklogs` | Admin, Security |
| PUT | `/api/checklogs/:id` | Admin, Security |
| DELETE | `/api/checklogs/:id` | Admin |

---

## Key Features

- **JWT Authentication** — Secure token-based auth with bcrypt password hashing
- **Role-Based Access Control** — Four roles: Admin, Security, Employee, Visitor
- **QR Code Generation** — Pass IDs encoded as base64 PNG QR codes
- **Email Notifications** — Automatic approval emails via Resend when appointments are approved
- **Populated Queries** — Appointments return visitor names and host usernames via Mongoose populate
- **Request Body Limit** — Set to 10mb to support base64 photo uploads

---

## Security Notes

- Passwords are hashed with bcrypt before storage and never returned in API responses
- All protected routes require a valid JWT token in the `Authorization: Bearer <token>` header
- MongoDB connection string and JWT secret are stored in `.env` and excluded from version control via `.gitignore`
