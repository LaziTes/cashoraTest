// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lkjkibdgxewgcdeuiuvk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxramtpYmRneGV3Z2NkZXVpdXZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyMDExOTcsImV4cCI6MjA1MDc3NzE5N30.v1H8ovhXrB2Zg7_A05LyuVP3gt7wD4GF8_5hw5NAIew";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);