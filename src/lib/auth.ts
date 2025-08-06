// Mock authentication for development
export async function signUp(email: string, password: string, fullName: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock successful signup
  return {
    user: {
      id: "mock-user-id",
      email,
      user_metadata: { full_name: fullName },
    },
  }
}

export async function signIn(email: string, password: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock successful signin
  return {
    user: {
      id: "mock-user-id",
      email,
      user_metadata: { full_name: "Demo User" },
    },
  }
}

export async function signOut() {
  // Mock signout
  return Promise.resolve()
}

export async function getCurrentUser() {
  // Always return mock user for demo
  return {
    id: "mock-user-id",
    email: "demo@taskflow.com",
    user_metadata: { full_name: "Demo User" },
  }
}
