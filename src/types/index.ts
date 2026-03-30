/**
 * Shared TypeScript types used across the application.
 * 
 * Keep all shared types here to maintain a single source of truth
 * and prevent circular imports.
 */

/**
 * Standard server action response.
 * All server actions should return this shape.
 */
export type ActionResponse<T = void> =
  | { success: true; data: T }
  | { success: false; error: string }

/**
 * User profile as stored in the `profiles` table.
 * Extends the Supabase Auth user with app-specific fields.
 */
export interface UserProfile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

/**
 * Pagination metadata for list endpoints.
 */
export interface PaginationMeta {
  page: number
  perPage: number
  total: number
  totalPages: number
}

/**
 * Generic paginated response wrapper.
 */
export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
}
