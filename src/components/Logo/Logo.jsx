import classes from "./Logo.module.scss";

const Logo = () => {
    
    return (
        <div className={classes.logo}>
            <img src="/notes.png" alt="Notes icon" />
            WriteUp
        </div>
    )
};

export default Logo;
