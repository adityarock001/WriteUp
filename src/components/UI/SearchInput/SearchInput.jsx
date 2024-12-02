import { useContext, useState } from "react";
import classes from "./SearchInput.module.scss";
import { NotesContext } from "../../../contexts/NotesContext";

const SearchInput = ({placeholder}) => {

    const {setSearchQuery} = useContext(NotesContext); 

    const [inputValue, setInputValue] = useState("");

    function handleInputChange(value) {
        setInputValue(value);
        setSearchQuery(value.trim());
    }

    return (
        <div className={classes.searchInput}>
            <img 
                src="/search.svg" 
                alt="Search" 
                className={classes.searchIcon} 
            />
            <input
                type="text" 
                placeholder={placeholder}
                value={inputValue}
                onChange={e => handleInputChange(e.target.value)}
            />
            <button 
                className={`${classes.btnClose} ${!Boolean(inputValue) && classes.hidden}`}
                onClick={() => handleInputChange("")}
            >
                <img 
                    src="/cross.svg" 
                    alt="Close" 
                />
            </button>
        </div>
    )
};

export default SearchInput;
