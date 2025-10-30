// Mock authentication for development
import { type NextRequest, NextResponse } from 'next/server';

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

// lib/auth.ts

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export type AuthHandler = (
  req: NextRequest,
  user: AuthUser
) => Promise<NextResponse | Response>;

export function withAuth(handler: AuthHandler) {
  return async (req: NextRequest): Promise<NextResponse | Response> => {
    try {
      // Your authentication logic here
      const user = await authenticateRequest(req);
      
      if (!user) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' },
          { status: 401 }
        );
      }

      return await handler(req, user);
    } catch (error) {
      console.error('Auth error:', error);
      return NextResponse.json(
        { success: false, error: 'Authentication failed' },
        { status: 401 }
      );
    }
  };
}

async function authenticateRequest(req: NextRequest): Promise<AuthUser | null> {
  // Your actual authentication logic
  // This is just a placeholder
  return null;
}