# ReserveHub

A full-stack room reservation system built with **Spring Boot** (backend) and **React + Tailwind CSS** (frontend). Users can browse and book rooms, manage their reservations and view payment status. Admins can add, edit and delete rooms with image uploads.

---

## Features

### User
- Register and log in with JWT authentication
- Browse all available rooms with images, capacity and price
- Book a room by selecting a date and time slot
- View all personal reservations with payment status
- Cancel a reservation

### Admin
- Add new rooms with name, number, capacity, price and image upload
- Edit existing rooms
- Delete rooms (automatically removes linked reservations)
- Browse all rooms

### General
- Role-based access control (USER / ADMIN)
- JWT stateless authentication
- Responsive design — works on mobile, tablet and desktop
- Toast notifications for all user actions
- Password strength indicator on registration
- Show/hide password toggle

---

## Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Java 17 | Language |
| Spring Boot 3 | Framework |
| Spring Security | Authentication & Authorization |
| Spring Data JPA | Database ORM |
| Hibernate | JPA implementation |
| JWT (jjwt) | Stateless token authentication |
| BCrypt | Password hashing |
| MySQL / PostgreSQL | Relational database |
| Maven | Dependency management |

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI library |
| Vite | Build tool & dev server |
| React Router v6 | Client-side routing |
| Axios | HTTP client |
| react-hot-toast | Toast notifications |
| jwt-decode | Decode JWT on client |
| Tailwind CSS | Utility-first styling |

---

## Project Structure

```
reservehub/
│
├── backend/                        # Spring Boot project
│   └── src/main/java/com/my_project/
│       ├── config/
│       │   ├── CorsConfig.java
│       │   └── SecurityConfig.java
│       ├── controller/
│       │   ├── AuthController.java
│       │   ├── ReservationController.java
│       │   ├── RoomController.java
│       │   └── UserController.java
│       ├── dto/
│       │   ├── LoginRequest.java
│       │   ├── RegisterRequest.java
│       │   ├── ReservationDTO.java
│       │   └── UserDTO.java
│       ├── exception/
│       │   └── GlobalExceptionHandler.java
│       ├── model/
│       │   ├── Payment.java
│       │   ├── Reservation.java
│       │   ├── Role.java
│       │   ├── Room.java
│       │   └── User.java
│       ├── repository/
│       │   ├── PaymentRepository.java
│       │   ├── ReservationRepository.java
│       │   ├── RoomRepository.java
│       │   └── UserRepository.java
│       ├── security/
│       │   ├── JwtAuthenticationFilter.java
│       │   └── JwtUtil.java
│       └── service/
│           ├── FileStorageService.java
│           ├── ReservationService.java
│           ├── ReservationServiceImpl.java
│           ├── RoomService.java
│           ├── RoomServiceImpl.java
│           └── UserService.java
│
└── frontend/                       # React project
    └── src/
        ├── api/
        │   └── axios.js            # Axios instance + JWT interceptor
        ├── components/
        │   ├── Footer.jsx
        │   ├── Navbar.jsx
        │   └── ProtectedRoute.jsx
        ├── context/
        │   └── AuthContext.jsx     # Global auth state
        ├── pages/
        │   ├── AboutPage.jsx
        │   ├── AdminPage.jsx
        │   ├── ContactPage.jsx
        │   ├── HomePage.jsx
        │   ├── LoginPage.jsx
        │   ├── RegisterPage.jsx
        │   ├── ReservationsPage.jsx
        │   └── RoomsPage.jsx
        ├── App.jsx
        ├── index.css
        └── main.jsx
```

---

## API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login, returns JWT |
| POST | `/api/auth/register-admin` | ADMIN | Create admin account |

### Rooms
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/rooms` | USER, ADMIN | Get all rooms |
| POST | `/api/rooms` | ADMIN | Add new room (multipart/form-data) |
| PUT | `/api/rooms/{id}` | ADMIN | Update room |
| DELETE | `/api/rooms/{id}` | ADMIN | Delete room + linked reservations |
| GET | `/api/rooms/image/{filename}` | Public | Serve room image |

### Reservations
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/reservations` | USER, ADMIN | Get current user's reservations |
| POST | `/api/reservations/book` | USER | Book a room |
| DELETE | `/api/reservations/{id}` | USER, ADMIN | Cancel reservation |

---

## Roles & Permissions

| Action | USER | ADMIN |
|---|---|---|
| Browse rooms | ✅ | ✅ |
| Book a room | ✅ | ❌ |
| Cancel own reservation | ✅ | ✅ |
| Cancel any reservation | ❌ | ✅ |
| View own bookings | ✅ | ❌ |
| Add / Edit / Delete rooms | ❌ | ✅ |
| Create admin accounts | ❌ | ✅ |

---
