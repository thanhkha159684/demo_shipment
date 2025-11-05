# GraphQL Authentication Demo

## 🚀 Hướng dẫn sử dụng

### Backend (NestJS + GraphQL)

1. **Khởi động backend:**
```bash
cd backend
npm run start:dev
```

2. **GraphQL Playground:** 
   - Truy cập: `http://localhost:3000/graphql`

### Frontend (Next.js + Apollo Client)

1. **Khởi động frontend:**
```bash
cd frontend  
npm run dev
```

2. **Authentication Flow:**
   - Khi truy cập bất kỳ page nào, layout sẽ check authentication status
   - Nếu chưa login: hiển thị `AccountForm` (login/register tabs)
   - Nếu đã login: hiển thị main application với sidebar navigation

## 🔐 API GraphQL

### Mutations

**Đăng ký user mới:**
```graphql
mutation Register {
  register(registerInput: {
    username: "testuser"
    email: "test@example.com"
    password: "password123"
  }) {
    accessToken
    user {
      id
      username
      email
      isActive
      createdAt
    }
  }
}
```

**Đăng nhập:**
```graphql
mutation Login {
  login(loginInput: {
    username: "testuser"
    password: "password123"
  }) {
    accessToken
    user {
      id
      username
      email
      isActive
    }
  }
}
```

**Lấy thông tin user hiện tại (cần Authorization header):**
```graphql
query Me {
  me {
    id
    username
    email
    isActive
    createdAt
    updatedAt
  }
}
```

**Headers cho protected queries:**
```json
{
  "Authorization": "Bearer YOUR_JWT_TOKEN_HERE"
}
```

## 📂 Cấu trúc Frontend

```
src/
├── app/
│   ├── layout.tsx             # Root layout với authentication check
│   └── page.tsx              # Home page (chỉ hiện khi đã login)
├── components/
│   ├── AppLayoutClient.tsx    # Layout component với auth guard
│   ├── login/
│   │   ├── LoginForm.tsx       # Form đăng nhập với GraphQL
│   │   ├── RegisterForm.tsx    # Form đăng ký
│   │   ├── AccountForm.tsx     # Combined auth form (login/register tabs)
│   │   └── index.ts           # Export components
│   └── ...
├── graphql/
│   └── auth.ts               # GraphQL queries/mutations
├── services/
│   └── auth.service.ts       # Authentication service
├── types/
│   └── auth.ts              # TypeScript types
├── hooks/
│   └── useAuth.ts           # Authentication hook
└── lib/
    └── apollo-client.tsx     # Apollo Client setup
```

## 🛠️ Cách hoạt động

### Authentication Guard
```tsx
// AppLayoutClient.tsx
export default function AppLayoutClient({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;
  
  if (!isAuthenticated) {
    return <AccountForm />; // Hiển thị login/register
  }

  return (
    // Main app layout với sidebar, header...
    <div>{children}</div>
  );
}
```

### Sử dụng trong component riêng lẻ
```tsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { AccountForm } from '../components/login';

const MyComponent = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <AccountForm />;
  }

  return (
    <div>
      <h1>Welcome {user?.username}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

## 🔧 Cấu hình

**Backend (.env):**
```
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=1d
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=demo_shipment
```

**Frontend:**
- GraphQL endpoint được cấu hình trong `apollo-client.tsx`
- Mặc định: `http://localhost:3000/graphql`