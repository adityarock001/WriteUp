import classes from "./Header.module.scss";
import Logo from "../Logo/Logo";
import SearchInput from "../UI/SearchInput/SearchInput";

const Header = () => {
    
    return (
        <header className={classes.header + " container"}>
            <Logo />
            <SearchInput placeholder="Search" />
        </header>
    )
};

export default Header;
