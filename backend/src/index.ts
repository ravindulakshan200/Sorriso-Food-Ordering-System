/**
 * Backend barrel export.
 * Import individual modules directly for tree-shaking:
 *   import { generatePayHereHash } from '@backend/payment/payhere'
 *   import { createClient }        from '@backend/supabase/client'
 *   import { supabase }            from '@backend/services/supabase'
 */
export * from './types/types';
export * from './services/supabase';
export * from './payment/payhere';
export * from './utils/upload-image';
// Note: supabase/client and supabase/middleware export functions that are
// forward-exported by the frontend shims — import them from their own paths
// to avoid bundling Next.js-specific code in unexpected contexts.
