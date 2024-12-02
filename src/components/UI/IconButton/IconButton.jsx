import { forwardRef } from "react";
import classes from "./IconButton.module.scss";

const IconButton = forwardRef(({icon, ...props}, ref) => {

    return (
        <button className={classes.iconButton} ref={ref} {...props}>
            {
                icon == "delete" ? <img src="/trash.svg" alt="Delete" className={classes.trash} /> :
                icon == "color" ? <img src="/color.svg" alt="Color" className={classes.color} /> :
                ""
            }
        </button>
    )
});

export default IconButton;
