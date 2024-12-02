import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { MobileContext } from "../contexts/MobileContext";
import { useContext, useEffect } from "react";
import ModalNoteEditor from "../components/ModalNoteEditor/ModalNoteEditor";

const AppRoutes = () => {

    const isMobile = useContext(MobileContext);

    const location = useLocation();
    
    useEffect(() => {
        if (isMobile) {
            const isModalNoteEditorOpen = location.pathname.includes("/note/");
            document.body.classList.toggle("modal-open", isModalNoteEditorOpen);
        }
    }, [location.pathname, isMobile]);

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={null} />
                <Route path="/note/:id" element={<ModalNoteEditor />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </AnimatePresence>
    )
};

export default AppRoutes;
