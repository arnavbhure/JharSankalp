import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

if (!supabaseUrl || !supabasePublishableKey) {
  console.warn(
    'JharSankalp: Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY. Please verify client environment configuration.'
  );
}

/**
 * Standard Supabase client using public/publishable credentials only.
 * No service-role keys are exposed or required.
 */
export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export const EVIDENCE_BUCKET = import.meta.env.VITE_EVIDENCE_BUCKET;
