import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://SEU_PROJECT_ID.supabase.co",
  "SUA_ANON_PUBLIC_KEY"
);
