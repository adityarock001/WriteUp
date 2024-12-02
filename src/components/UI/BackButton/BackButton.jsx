import classes from "./BackButton.module.scss";

const BackButton = (props) => {
    
    return (
        <button className={classes.backButton} {...props} >
            <img src="/back.svg" alt="Back" />
        </button>
    )
};

export default BackButton;
