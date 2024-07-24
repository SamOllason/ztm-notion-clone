import { createContext, useContext } from "react";
import { Page } from "../utils/types";
import { usePageState } from "./usePageState"

// use the ReturnType utility type
type AppStateContextType = ReturnType<typeof usePageState>

// note that {} as a default value is acceptable here, as the only case
// where default value will be used is when we try and access the values from this context
// while we are not wrapping the subtree of components with the context provider
const AppStateContext = createContext<AppStateContextType>({} as AppStateContextType)


type AppStateProviderProps = {
    children: React.ReactNode; // context wraps components subtree
    initialState: Page;
}

// the app state provider component is what we wrap our application with
export const AppStateProvider = ({children, initialState}: AppStateProviderProps) => {

    // want to make the observable values and handlers from the provider availlable 
    // to the page subtre
    const pageStateHandlers = usePageState(initialState)

    return (
        <AppStateContext.Provider value={pageStateHandlers}>
            {children}
        </AppStateContext.Provider>
    )

}

// create a custom hook, using useContext, to make the context easier to work with
export const useAppState = () => useContext(AppStateContext)