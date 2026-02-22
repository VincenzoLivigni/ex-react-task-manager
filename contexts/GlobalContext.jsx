import { createContext, useEffect, useState } from "react"
import useTasks from "../hooks/useTasks"

export const GlobalContext = createContext()

export default function GlobalProvider({ children }) {

    const { tasks, setTasks, addTask, removeTask, updateTask } = useTasks()

    return (
        <GlobalContext.Provider value={{ tasks, setTasks, addTask, removeTask, updateTask }}>
            {children}
        </GlobalContext.Provider>
    )
}