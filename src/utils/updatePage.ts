import { Page } from "../utils/types"
import { supabase } from "../supabaseClient"
import { debounce } from "underscore"

// we will only be updating one field on the page at a time
// so make use of Partial to make all types optional, except id
export const updatePage = debounce(async (page: Partial<Page> & Pick<Page, "id">) => {
    await supabase.from("pages").update(page).eq("id", page.id)
}, 500)

