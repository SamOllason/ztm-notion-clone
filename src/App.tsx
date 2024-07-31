import { Page } from "./Page/Page";
import { AppStateProvider } from "./state/AppStateContext";
import { Route, Routes } from "react-router-dom";
import { Auth } from "./auth/Auth"
import { Private } from "./auth/Private"

// const initialState = createPage() // not needed since withInitialState() added

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth/>}/>
      <Route
        path="/:id" 
        element={
          <Private component={
            // <AppStateProvider initialState={initialState}> // not needed since withInitialState() added
            <AppStateProvider >
              <Page/>
            </AppStateProvider>
          }/>
      }/>
      <Route
        path="/" 
        element={
          <Private component={
            <AppStateProvider>
              <Page/>
            </AppStateProvider>
          }/>
        }/>
    </Routes>
  )
}

export default App
