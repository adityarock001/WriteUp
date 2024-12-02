import classes from "./Button.module.scss";

const Button = ({children, ...props}) => {
    
    return (
        <button {...props} className={classes.btn}>
            {children}
        </button>
    )
};

export default Button;
