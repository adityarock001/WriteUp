import { useContext, useEffect, useMemo, useRef, useState } from "react";
import NoteItem from "../NoteItem/NoteItem";
import classes from "./NoteList.module.scss";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import { useNavigate } from "react-router-dom";
import { NotesContext } from "../../contexts/NotesContext";
import { useColorPicker } from "../../hooks/useColorPicker";
import { createPortal } from "react-dom";
import ColorPicker from "../ColorPicker/ColorPicker";
import { MobileContext } from "../../contexts/MobileContext";

const NoteList = () => {

    const {searchedNotes, notesLength, deleteNote, changeNoteColor} = useContext(NotesContext);
    const isMobile = useContext(MobileContext);

    const navigate = useNavigate();

    const noteListRef = useRef();

    const [
        isColorPickerOpen,
        colorPickerSelectedColor,
        colorPickerOptions,
        colorPickerRef,
        {openColorPicker, closeColorPicker, selectColor: colorPickerSelectColor},
    ] = useColorPicker(changeNoteColor);

    const [activeNoteId, setActiveNoteId] = useState();

    const masonryColumnsBreakPoints = useMemo(() => {
        const result = {0: 2};
        for (let i = 0; i < 20; i++) {
            result[576 + 300 * i] = i + 3;
        }
        return result;
    }, []);

    useEffect(() => {
        // The ResizeObserver is necessary because when the NoteEditor is closed,
        // the height of its parent element (Main) changes, causing the
        // ColorPicker to be positioned incorrectly
        if (!isMobile) {
            const resizeObserver = new ResizeObserver(() => closeColorPicker());
            resizeObserver.observe(noteListRef.current.parentNode);
            return () => {
                resizeObserver.unobserve(noteListRef.current.parentNode);
            }
        }
    }, [isMobile]);

    useEffect(() => {
        if (!isColorPickerOpen) setActiveNoteId(null);
    }, [isColorPickerOpen]);

    return (
        <>
            <div className={classes.noteList} ref={noteListRef}>
                {searchedNotes.length
                    ?
                    <ResponsiveMasonry columnsCountBreakPoints={masonryColumnsBreakPoints}>
                        <Masonry gutter="10px">
                            {searchedNotes.map(note => 
                                <NoteItem
                                    key={note.id}
                                    openNoteEditor={() => navigate(`/note/${note.id}`)}
                                    deleteNote={() => deleteNote(note.id)}
                                    isActive={activeNoteId == note.id}
                                    {...{note, openColorPicker, setActiveNoteId}}
                                />
                            )}
                        </Masonry>
                    </ResponsiveMasonry>
                    :
                    <div className={classes.empty}>
                        <img src={notesLength ? "/no-note.svg" : "/note.svg"} alt="Note icon" />
                        <p>{notesLength ? "No matching notes" : "Notes you add appear here"}</p>
                    </div>
                }
            </div>
            {isColorPickerOpen && createPortal(
                <ColorPicker
                    selectColor={colorPickerSelectColor}
                    selectedColor={colorPickerSelectedColor}
                    options={colorPickerOptions}
                    ref={colorPickerRef}
                />,
                document.body
            )}
        </>
    )
};

export default NoteList;
