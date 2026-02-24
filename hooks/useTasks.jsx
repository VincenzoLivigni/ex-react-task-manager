import { useEffect, useState } from "react"

export default function useTasks() {

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

    /* Aggiungi task */
    async function addTask({ title, description, status }) {
        try {
            const res = await fetch(`${API_URL}/tasks`, {
                method: "POST",
                body: JSON.stringify({ title, description, status }),
                headers: { "Content-Type": "application/json" }
            })

            const data = await res.json()

            if (!data.success) {
                throw new Error(data.message)
            }
            setTasks(prev => [...prev, data.task])
            return data.task
        }
        catch (err) {
            console.log("Creazione della task fallita", err.message)
            throw err
        }
    }

    /* rimuovi task */
    async function removeTask(taskId) {
        try {
            const res = await fetch(`${API_URL}/tasks/${taskId}`, {
                method: "DELETE"
            })
            const data = await res.json()

            if (!data.success) {
                throw new Error(data.message)
            }
            setTasks(prev => prev.filter((t) => t.id.toString() !== taskId))
            return true
        }
        catch (err) {
            console.log("Rimozione della task fallita", err.message)
            throw err
        }
    }


    /* aggiorna task */
    async function updateTask(updatedTask) {
        try {
            const res = await fetch(`${API_URL}/tasks/${updatedTask.id}`, {
                method: "PUT",
                body: JSON.stringify(updatedTask),
                headers: { "Content-Type": "application/json" }
            })
            const data = await res.json()

            if (!data.success) {
                throw new Error(data.message)
            }
            setTasks(prev => prev.map((t) => t.id === data.task.id ? data.task : t))
            return data.task
        }
        catch (err) {
            console.log("Modifica della task fallita", err.message)
            throw err
        }
    }

    return { tasks, setTasks, addTask, removeTask, updateTask }
}