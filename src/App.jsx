import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { NotesContext } from "./contexts/NotesContext";
import { useNotes } from "./hooks/useNotes";
import AppRoutes from "./routes/AppRoutes";
import MobileContextProvider from "./components/MobileContextProvider/MobileContextProvider";

function App() {

    const noteMethods = useNotes();

    return (
        <MobileContextProvider>
            <NotesContext.Provider value={noteMethods}>
                <AppRoutes />
                <Header />
                <Main />
            </NotesContext.Provider>
        </MobileContextProvider>
    )
}

export default App;
