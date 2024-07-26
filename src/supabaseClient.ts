import { createClient } from "@supabase/supabase-js"

// this is how we access
const supabaseUrl = import .meta.env.SUPABASE_URL
const supabaseKey = import .meta.env.SUPABASE_API_Key

if(!supabaseUrl || !supabaseKey) {
    throw new Error("Missing supabase url or key")
}

export const supabase = createClient(supabaseUrl, supabaseKey)  