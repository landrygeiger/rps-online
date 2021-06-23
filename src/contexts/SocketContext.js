import { createContext, useContext, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {
    const [connected, setConnected] = useState(false);
    const [socket, setSocket] = useState();

    const connect = () => {
        // Promise that resolves once connection to server is established
        return new Promise((resolve, reject) => {
            const socket = io();
            socket.on("connect", () => {
                setConnected(true);
                setSocket(socket);
                resolve(socket);
            });

            socket.on("connect_error", () => {
                reject();
            });

            socket.on("connect_timeout", () => {
                reject();
            });

            socket.on("disconnect", () => {
                setConnected(false);
            });
        });
    }

    const value = {
        connect,
        connected,
        socket
    }

    return (
        <SocketContext.Provider value={value}>
            { children }
        </SocketContext.Provider>
    )
}