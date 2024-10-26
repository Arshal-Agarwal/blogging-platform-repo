// contexts/MyContext.js

"use client";

import { createContext, useState, useContext } from 'react';

// Use `null` as the default to avoid mismatch errors.
const MyContext = createContext(null);

export const MyProvider = ({ children }) => {
    const [LogInState, setLogInState] = useState(true);

    return (
        <MyContext.Provider value={{ LogInState, setLogInState }}>
            {children}
        </MyContext.Provider>
    );
};

// Custom hook to use MyContext, handling the case where context is null.
export const useMyContext = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyContext must be used within a MyProvider");
    }
    return context;
};

export default MyContext;
