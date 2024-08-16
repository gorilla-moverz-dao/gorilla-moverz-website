import { createClient } from "@supabase/supabase-js";
import { SUPRA_API_URL, SURPA_ANON_KEY } from "../constants";
import { Database } from "../database.types";

export const supabase = createClient<Database>(SUPRA_API_URL, SURPA_ANON_KEY);
