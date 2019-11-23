import React, { useState } from 'react';

export const AuthContext = React.createContext();

const AuthProvider = (props) => {

    const [isAuth, setAuth] = useState(false)

    return (
        <AuthContext.Provider value={isAuth}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;