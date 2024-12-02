import classes from "./Main.module.scss";
import NoteEditor from "../NoteEditor/NoteEditor";
import NoteList from "../NoteList/NoteList";
import AddNoteButton from "../UI/AddNoteButton/AddNoteButton";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MobileContext } from "../../contexts/MobileContext";

const Main = () => {

    const isMobile = useContext(MobileContext);
    const navigate = useNavigate();

    return (
        <main className={classes.main + " container"}>
            {isMobile
                ? <AddNoteButton onClick={() => navigate(`/note/new`)} />
                : <NoteEditor mode="creator" />
            }
            <NoteList />
        </main>
    )
};

export default Main;
