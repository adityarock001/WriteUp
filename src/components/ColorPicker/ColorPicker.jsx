import { useContext, forwardRef } from "react";
import classes from "./ColorPicker.module.scss";
import { MobileContext } from "../../contexts/MobileContext";

const colors = [
    "202124", "77172e", "692b17", "7c4a03",
    "264d3b", "0c625d", "256377", "284255",
    "472e5b", "6c394f", "4b443a", "232427",
]

const ColorPicker = forwardRef(({options, selectColor, selectedColor}, ref) => {

    const isMobile = useContext(MobileContext);

    return (
        <div
            className={classes.сolorPicker}
            ref={ref}
            style={{
                position: options.position,
                background: `#${isMobile ? selectedColor : colors[0]}`,
            }}
        >
            {isMobile && <p>Color</p>}
            <div
                className={`
                    ${classes.colors} 
                    ${options?.rows == 2 ? classes["two-rows"] : ""}
                `}
            >
                {colors.map(color => 
                    <button
                        key={color}
                        className={`${classes.color} ${color == selectedColor ? classes.active : ""}`}
                        style={{background: "#"+color}}
                        onClick={() => selectColor(color)}
                    />
                )}
            </div>
        </div>
    )
});

export default ColorPicker;
