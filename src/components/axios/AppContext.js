import { createContext, useState, useMemo } from 'react';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const { children } = props;
    const [isLogin, setIsLogin] = useState(false);
    const [infoUser, setInfoUser] = useState({});
    const [idUser, setIdUser] = useState(null);
    const [myLat, setMyLat] = useState(null);
    const [myLng, setMyLng] = useState(null);

    const contextValue = useMemo(() => {
        return {
            isLogin, setIsLogin, infoUser, setInfoUser, idUser, setIdUser, myLat, setMyLat, myLng, setMyLng
        };
    }, [isLogin, setIsLogin, infoUser, setInfoUser, idUser, setIdUser, myLat, setMyLat, myLng, setMyLng]);

    return (
        <AppContext.Provider
            value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}