# GraphQL Authentication Schema Example

# Mutations để authenticate user
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
      createdAt
      updatedAt
    }
  }
}

mutation Register {
  register(registerInput: {
    username: "newuser"
    email: "newuser@example.com"
    password: "password123"
  }) {
    accessToken
    user {
      id
      username
      email
      isActive
      createdAt
      updatedAt
    }
  }
}

# Query để lấy thông tin user hiện tại (cần Authorization header)
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

# Headers cho query Me:
# {
#   "Authorization": "Bearer YOUR_JWT_TOKEN_HERE"
# }