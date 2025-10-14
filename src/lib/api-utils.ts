import { type NextRequest, NextResponse } from 'next/server';
import { withAuth, type AuthUser } from './auth';
import { defaultRateLimiter } from './rate-limit';
import { type z } from 'zod';

// Define proper types
export interface ApiContext {
  params: Record<string, string>;
  user: unknown; // Use a more specific user type if available
}

export type ApiHandler = (
  req: NextRequest,
  context: ApiContext
) => Promise<NextResponse | Response>;

export interface ApiHandlerOptions {
  requireAuth?: boolean;
  rateLimit?: {
    limit: number;
    key?: string;
  };
}

export interface ParseRequestBodyResult<T> {
  data: T | null;
  error: string | null;
}

export interface ApiResponseOptions {
  status?: number;
  headers?: Record<string, string>;
}

export type ErrorDetails = Record<string, unknown>;

// Helper function to safely get client IP
function getClientIP(req: NextRequest): string {
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp;

  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0]?.trim();
    if (firstIp) return firstIp;
  }

  return 'anonymous';
}

export function createApiHandler(
  handler: ApiHandler, 
  options?: ApiHandlerOptions
) {
  const { requireAuth = true, rateLimit } = options || {};
  
  return async (req: NextRequest, context: { params: Record<string, string> }) => {
    // Apply rate limiting if configured
    if (rateLimit) {
      const ip = getClientIP(req);
      const rateLimitKey = rateLimit.key ? `${ip}:${rateLimit.key}` : ip;
      
      try {
        await defaultRateLimiter.check(req, rateLimit.limit, rateLimitKey);
      } catch {
        return NextResponse.json(
          { success: false, error: 'Rate limit exceeded' },
          { status: 429, headers: { 'Retry-After': '60' } }
        );
      }
    }

    // Apply authentication if required
if (requireAuth) {
  try {
    const authResult = await withAuth(async (request: NextRequest, user: AuthUser) => {
      try {
        const result = await handler(request, { ...context, user });
        // Ensure the result is a NextResponse
        return result instanceof NextResponse 
          ? result 
          : NextResponse.json(result);
      } catch (error: unknown) {
        console.error('API Error:', error);
        return NextResponse.json(
          { success: false, error: 'Internal server error' },
          { status: 500 }
        );
      }
    })(req);
    
    return authResult;
  } catch (error: unknown) {
    // Handle errors from withAuth itself
    console.error('Auth middleware error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 401 }
    );
  }
}
    // No authentication required, just call the handler
    try {
      return await handler(req, { ...context, user: null });
    } catch (error) {
      console.error('API Error:', error);
      return NextResponse.json(
        { success: false, error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}

// Helper function to parse and validate request body
export async function parseRequestBody<T>(
  req: NextRequest, 
  schema?: z.ZodSchema<T>
): Promise<ParseRequestBodyResult<T>> {
  try {
    const body = await req.json() as unknown;
    
    if (schema) {
      const result = schema.safeParse(body);
      if (!result.success) {
        const errorMessages = result.error.errors.map((error) => error.message).join(', ');
        return { 
          data: null, 
          error: errorMessages
        };
      }
      return { data: result.data, error: null };
    }
    
    return { data: body as T, error: null };
  } catch {
    return { 
      data: null, 
      error: 'Invalid request body' 
    };
  }
}

// Helper function to create standardized API responses
export function createApiResponse<T = unknown>(
  data: T | null = null, 
  options: ApiResponseOptions = {}
): NextResponse {
  const { status = 200, headers = {} } = options;
  const response = { success: status < 400, data };
  
  return new NextResponse(JSON.stringify(response), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
}

// Helper function to create error responses
export function createErrorResponse(
  message: string,
  status = 400,
  details?: ErrorDetails
): NextResponse {
  const responseData: { error: string; details?: ErrorDetails } = { 
    error: message,
    ...(details && { details })
  };

  return createApiResponse(responseData, { status });
}

// Additional utility for success responses
export function createSuccessResponse<T = unknown>(
  data: T,
  options: Omit<ApiResponseOptions, 'status'> = {}
): NextResponse {
  return createApiResponse(data, { ...options, status: 200 });
}

// Utility for not found responses
export function createNotFoundResponse(message = 'Resource not found'): NextResponse {
  return createErrorResponse(message, 404);
}

// Utility for unauthorized responses
export function createUnauthorizedResponse(message = 'Unauthorized'): NextResponse {
  return createErrorResponse(message, 401);
}

// Utility for forbidden responses
export function createForbiddenResponse(message = 'Forbidden'): NextResponse {
  return createErrorResponse(message, 403);
}