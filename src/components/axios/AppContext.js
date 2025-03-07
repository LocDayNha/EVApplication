import { createContext, useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [infoUser, setInfoUser] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const [myLat, setMyLat] = useState(null);
    const [myLng, setMyLng] = useState(null);
    const [myCar, setMyCar] = useState(null);

    useEffect(() => {
        const loadStoredData = async () => {
            try {
                const storedIsLogin = await AsyncStorage.getItem('isLogin');
                const storedInfoUser = await AsyncStorage.getItem('infoUser');
                const storedIdUser = await AsyncStorage.getItem('idUser');
                const storedMyCar = await AsyncStorage.getItem('myCar');

                if (storedIsLogin) setIsLogin(JSON.parse(storedIsLogin));
                if (storedInfoUser) setInfoUser(JSON.parse(storedInfoUser));
                if (storedIdUser) setIdUser(storedIdUser);
                if (storedMyCar) setMyCar(JSON.parse(storedMyCar));
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu từ AsyncStorage:', error);
            }
        };

        loadStoredData();
    }, []);

    const updateLoginStatus = async (loginStatus) => {
        setIsLogin(loginStatus);
        await AsyncStorage.setItem('isLogin', JSON.stringify(loginStatus));
    };

    const updateUserInfo = async (user) => {
        setInfoUser(user);
        await AsyncStorage.setItem('infoUser', JSON.stringify(user));
    };

    const updateUserId = async (userId) => {
        setIdUser(userId);
        await AsyncStorage.setItem('idUser', userId);
    };

    const updateMyCar = async (myCar) => {
        setMyCar(myCar);
        await AsyncStorage.setItem('myCar', JSON.stringify(myCar));
    };

    const contextValue = useMemo(() => {
        return {
            isLogin, setIsLogin: updateLoginStatus,
            infoUser, setInfoUser: updateUserInfo,
            idUser, setIdUser: updateUserId,
            myCar, setMyCar: updateMyCar,
            myLat, setMyLat,
            myLng, setMyLng,
        };
    }, [isLogin, infoUser, idUser, myCar, myLat, myLng]);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};
