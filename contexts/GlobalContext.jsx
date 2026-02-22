import { createContext, useEffect, useState } from "react"

export const GlobalContext = createContext()

export default function GlobalProvider({ children }) {

    const [tasks, setTasks] = useState([])

    const API_URL = import.meta.env.VITE_URL_API;

    useEffect(() => {
        fetch(`${API_URL}/tasks`)
            .then(res => res.json())
            .then(data => {
                setTasks(data)
                console.log("Dati ricevuti con successo", data)
            })
            .catch(err => console.log("Errore durante ricezione dei dati", err))
    }, [])

    return (
        <GlobalContext.Provider value={{ tasks, setTasks }}>
            {children}
        </GlobalContext.Provider>
    )
}