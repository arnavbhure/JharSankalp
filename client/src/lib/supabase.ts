import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  const missingVars: string[] = [];
  if (!supabaseUrl) missingVars.push('VITE_SUPABASE_URL');
  if (!supabasePublishableKey) missingVars.push('VITE_SUPABASE_PUBLISHABLE_KEY');

  throw new Error(
    `[Supabase Configuration Error]: Missing required environment variable(s): ${missingVars.join(', ')}. ` +
      'Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are configured in your environment settings.',
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

export const EVIDENCE_BUCKET = import.meta.env.VITE_EVIDENCE_BUCKET || 'challenge-evidence';
