import { useEffect, useState } from "react";
import { MobileContext } from "../../contexts/MobileContext";

const mobileScreenMaxWidth = 575.5;

const MobileContextProvider = ({children}) => {
    
    const [isMobile, setIsMobile] = useState(window.innerWidth < mobileScreenMaxWidth);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < mobileScreenMaxWidth);
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <MobileContext.Provider value={isMobile}>
            {children}
        </MobileContext.Provider>
    )
};

export default MobileContextProvider;
