import { Page } from "../utils/types"
import { useMatch } from "react-router-dom"
import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"
import startPageScaffold from "./startPageScaffold.json"
import styles from "../utils/utils.module.css"
import { Loader } from "../components/Loader"

type InjectedProps = {
    initialState: Page
}

type PropsWithoutInjected<TBaseProps> = Omit<TBaseProps, keyof InjectedProps> 

// TProps here are the props of the **wrapped** component
export function withInitialState<TProps> (
    // create an intersection type.
    // if we just simply passed TProps as they are, we would get an error later on
    // because when we use TProps argument, every time we create a new type from it
    // TS treats it as a completely separate type - not as a type derived from the TProps
    // type variable. TODO: so what?!
    WrappedComponent: React.ComponentType<PropsWithoutInjected<TProps> & InjectedProps>
){
    // we dont want the new component to have the initialState prop
    return (props: PropsWithoutInjected<TProps>) => {
        const match = useMatch("/:slug")
        const pageSlug = match ? match.params.slug : "start"

        const [ initialState, setInitialState ] = useState<Page | null>()
        const [ isLoading, setIsLoading ] = useState(true)
        const [ error, setError ] = useState<Error | undefined>()

        // we will observe the page slug changes
        useEffect(() => {
            // whenever slug changes set loading to true, as user is navigating
            setIsLoading(true)

            const fetchInitialState = async () => {
                try {
                    const { data: userData } = await supabase.auth.getUser()
                    const user = userData.user
                    
                    if(!user){
                        throw new Error("User is not logged in")
                    }

                    // get data for the current page user is on
                    const { data } = await supabase.from("pages").select("title, id, cover, nodes, slug").match({ slug: pageSlug, created_by: user.id}).single()

                    if(!data && pageSlug === "start") {
                        // if here then we are on the starting page and the start page hasnt been created yet
                        const result = await supabase.from("pages").insert({
                            ...startPageScaffold,
                            slug: "start",
                            created_by: user.id
                        }).single()

                        setInitialState(result?.data)
                    } else {
                        // if we are on some other page then set the intial state to the data
                        setInitialState(data)
                    }
                } catch(e){
                    if(e instanceof Error){
                        setError(e)
                    }
                }

                setIsLoading(false) // either way, the page has loaded with result to user
            }

            fetchInitialState()
        }, [pageSlug])

        if(isLoading){
            return(<div className={styles.centeredFlex}>
                <Loader/>
            </div>)
        }

        if(error){
            return <div>{error.message}</div>
        }

        if(!initialState){
            return <div className={styles.centeredFlex}>Page not found</div>
        }

        // if there are no errors and we have managed to return the page data
        // then we can return the wrapped component
        // note that we return it with all props except the excluded ones
        // and the initial state

        return <WrappedComponent {...props} initialState={initialState}/>
    }
}