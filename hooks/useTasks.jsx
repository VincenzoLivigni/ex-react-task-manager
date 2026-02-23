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

    function removeTask() {

    }

    function updateTask() {

    }

    return { tasks, setTasks, addTask, removeTask, updateTask }
}