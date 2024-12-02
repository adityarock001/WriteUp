import classes from "./ModalNoteEditor.module.scss";
import NoteEditor from "../NoteEditor/NoteEditor";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext, useEffect, useRef } from "react";
import { NotesContext } from "../../contexts/NotesContext";

const ModalNoteEditor = () => {

    const {findNoteById} = useContext(NotesContext);

    const { id } = useParams();
    const navigate = useNavigate();

    const modalRef = useRef();

    const noteToEdit = id == "new" ? "new" : findNoteById(id);

    useEffect(() => {
        if (!noteToEdit) navigate("/");
    }, []);

    if (!noteToEdit) return null;

    function closeModal() {
        navigate("/", {replace: noteToEdit == "new"});
    }

    return (
        <motion.div
            className={classes.modalNoteEditor}
            ref={modalRef}

            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0]}}
        > 
            <NoteEditor
                mode="editor"
                closeModalNoteEditor={closeModal}
                {...{noteToEdit, modalRef}}
            />
        </motion.div>
    )
};

export default ModalNoteEditor;
