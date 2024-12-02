import classes from "./AddNoteButton.module.scss";

const AddNoteButton = (props) => {
    
    return (
        <button className={classes.addNoteButton} {...props}>
            <img src="/add-note.svg" alt="Add note" />
        </button>
    )
};

export default AddNoteButton;
