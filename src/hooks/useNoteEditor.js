import { useCallback, useContext, useEffect, useState } from "react";
import { NotesContext } from "../contexts/NotesContext";
import { MobileContext } from "../contexts/MobileContext";

const defaultColor = "202124";

export const useNoteEditor = (props, colorPicker, refs, noteColorRef) => {

    const {mode, noteToEdit, closeModalNoteEditor, modalRef} = props;

    const isEditor = mode === "editor";
    const isCreator = mode === "creator";

    const isMobile = useContext(MobileContext);
    const {createNote, editNote} = useContext(NotesContext);

    const [isTextareaFocused, setIsTextareaFocused] = useState(isEditor);
    const [titlePlaceholder, setTitlePlaceholder] = useState("Take a note...");

    const openEditor = useCallback(() => {
        setIsTextareaFocused(true);
        setTitlePlaceholder("Title");
    }, []);

    const closeEditor = useCallback(() => {
        if (isCreator) {
            refs.title.current.value = "";
            refs.content.current.value = "";
            setIsTextareaFocused(false);
            setTitlePlaceholder("Take a note...");
        }
        if (isEditor) closeModalNoteEditor();
        colorPicker.close();
        colorPicker.selectColor(defaultColor);
    }, [isCreator, isEditor]);

    const saveNote = useCallback(() => {
        const title = refs.title.current.value.trim();
        const content = refs.content.current.value.trim();
        const color = noteColorRef.current;

        closeEditor();
        if (title == "" && content == "") return;
        if (isCreator || noteToEdit == "new") {
            createNote(title, content, color);
        } else if (isEditor) {
            editNote(title, content, noteToEdit.id);
        }
    }, [isCreator, isEditor, noteToEdit, closeEditor]);

    function handleClickOutside(event) {
        if (colorPicker.ref.current && colorPicker.ref.current.contains(event.target)) return;
        if (
            (isCreator && refs.form.current && !refs.form.current.contains(event.target)) ||
            (isEditor && event.target == modalRef.current)
        ) {
            saveNote();
            document.removeEventListener('click', handleClickOutside);
        }
    }
    
    function handleEscKey(event) {
        if (event.key == "Escape") {
            refs.title.current.blur();
            saveNote();
            document.removeEventListener("keydown", handleEscKey);
        }
    }

    function handlePopstate() {
        saveNote();
        window.removeEventListener("popstate", handlePopstate);
    }

    useEffect(() => {
        if (isTextareaFocused) {
            if (!isMobile) {
                refs.content.current.focus();
                document.addEventListener("click", handleClickOutside);
                document.addEventListener("keydown", handleEscKey);
            }
            if (isEditor) window.addEventListener("popstate", handlePopstate);
            window.addEventListener("beforeunload", saveNote);
            return () => {
                if (!isMobile) {
                    document.removeEventListener('click', handleClickOutside);
                    document.removeEventListener("keydown", handleEscKey);
                }
                if (isEditor) window.removeEventListener("popstate", handlePopstate);
                window.removeEventListener("beforeunload", saveNote);
            };
        }
    }, [isTextareaFocused]);

    useEffect(() => {
        if (isEditor && noteToEdit != "new") {
            refs.title.current.value = noteToEdit.title;
            refs.content.current.value = noteToEdit.content;
        }
    }, []);


    const editor = {
        open: openEditor,
        close: closeEditor,
        saveNote,
    }

    return [
        editor,
        isTextareaFocused,
        titlePlaceholder,
    ];
}
