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

    function addTask() {

    }

    function removeTask() {

    }

    function updateTask() {

    }

    return { tasks, setTasks, addTask, removeTask, updateTask }
}