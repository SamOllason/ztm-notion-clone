import { supabase } from "../supabaseClient"
import { Session } from "@supabase/supabase-js"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

type AuthSessionContextValue = {
    // session: ReturnType<typeof supabase.auth.getSession>; // note: this was updated, see below
    session: Session | null;
    loading: boolean;
}

// note: fine to use empty object as initial value here as we are ONLY going
// to be using this to wrap our app. We use it to try and get the context value
// that is not wrapped in the context
const AuthSessionContext = createContext<AuthSessionContextValue>({} as AuthSessionContextValue)

type AuthSessionProviderProps = {
    children: ReactNode
}

export const AuthSessionProvider = ({children}: AuthSessionProviderProps) => {
    const [ session, setSession ] = useState<Session | null>(null)
    const [ loading, setLoading ]= useState(true)

    useEffect(() => {
        const auth = async () => {
            // function returns a promise that resolves to an obj with fields error and data
            const {data, error} = await supabase.auth.getSession()
            if(data.session){
                setSession(data.session)
                setLoading(false)
            } else {
                console.log(error)
            }
            auth()
            supabase.auth.onAuthStateChange((_event, session) => {
                setSession(session)
                setLoading(false)
            })
        }
    }, [])

    return(
        <AuthSessionContext.Provider value={{session, loading}}>
            {children}
        </AuthSessionContext.Provider>
    )
}

// make use of useContext hook here to make it easier to work with the context
export const useAuthSession = () => useContext(AuthSessionContext)