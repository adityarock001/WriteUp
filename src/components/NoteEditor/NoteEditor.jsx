import { useContext, useRef } from "react";
import classes from "./NoteEditor.module.scss";
import { TextareaAutosize } from "@mui/base";
import Button from "../UI/Button/Button";
import { motion } from "framer-motion";
import { MobileContext } from "../../contexts/MobileContext";
import { NotesContext } from "../../contexts/NotesContext";
import BackButton from "../UI/BackButton/BackButton";
import IconButton from "../UI/IconButton/IconButton";
import { createPortal } from "react-dom";
import ColorPicker from "../ColorPicker/ColorPicker";
import { useNoteEditor } from "../../hooks/useNoteEditor";
import { useNoteEditorColorPicker } from "../../hooks/useNoteEditorColorPicker";

const NoteEditor = (props) => {

    const {mode, noteToEdit} = props;

    const isEditor = mode === "editor";

    const isMobile = useContext(MobileContext);
    const {deleteNote} = useContext(NotesContext);

    const refs = {
        form: useRef(),
        title: useRef(),
        content: useRef(),
    }

    const [colorPicker, handleColorClick, noteColorRef]
        = useNoteEditorColorPicker(props, refs.form);
        
    const [editor, isTextareaFocused, titlePlaceholder]
        = useNoteEditor(props, colorPicker, refs, noteColorRef);

    const preventDefaultAndExecute = (func) => (event) => {
        event.preventDefault();
        func();
    };

    return (
        <>
            <motion.form
                ref={refs.form}
                className={`${classes.noteEditor} ${isTextareaFocused ? classes.open : ""} ${classes[mode]}`}
                onSubmit={e => e.preventDefault()}
                onClick={e => e.stopPropagation()}
                style={{background: `#${noteColorRef.current}`}}

                {...(isEditor && {
                    initial: {scale: 0.3},
                    animate: {scale: 1},
                    exit: {scale: 0.3},
                    transition: {duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0]},
                })}
            >
                {isMobile &&
                    <div className={classes.header}>
                        <BackButton onClick={preventDefaultAndExecute(editor.saveNote)} />
                    </div>
                }
                <div
                    className={classes.textareas}
                    {...(isMobile && {onClick: () => refs.content.current.focus()})}
                >
                    <TextareaAutosize
                        ref={refs.title}
                        className={classes.title}
                        placeholder={isEditor ? "Title" : titlePlaceholder}
                        {...(!isTextareaFocused && { onFocus: editor.open })}
                        {...(isMobile && {onClick: e => e.stopPropagation()})}
                    />
                    <TextareaAutosize
                        ref={refs.content}
                        className={classes.content}
                        placeholder="Take a note..."
                    />
                </div>
                <div className={classes.btns}>
                    <div className={classes.iconBtns}>
                        <IconButton
                            icon="delete"
                            onClick={preventDefaultAndExecute(() => {deleteNote(noteToEdit?.id);editor.close()})}
                        />
                        <IconButton
                            icon="color"
                            onClick={preventDefaultAndExecute(handleColorClick)}
                        />
                    </div>
                    {!isMobile && 
                        <Button onClick={preventDefaultAndExecute(editor.saveNote)} >
                            Close
                        </Button>
                    }
                </div>
            </motion.form>
            {colorPicker.isOpen && createPortal(
                <ColorPicker
                    selectColor={colorPicker.selectColor}
                    selectedColor={colorPicker.selectedColor}
                    options={colorPicker.options}
                    ref={colorPicker.ref}
                />,
                document.body
            )}
        </>
    )
};

export default NoteEditor;
