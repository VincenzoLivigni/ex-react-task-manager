import { useContext } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import { useParams, useNavigate } from "react-router-dom"

export default function TaskDetail() {
    const { tasks, removeTask } = useContext(GlobalContext)
    const { id } = useParams()
    const navigate = useNavigate()

    const task = tasks.find((t) => t.id.toString() === id)

    async function deleteTask() {
        console.log("Task eliminata");

        try {
            await removeTask(id)
            alert("Task rimossa con successo")
            navigate("/")
        }
        catch (err) {
            alert(err.message)
        }
    }
    return (
        <>
            <h1>taskdetail</h1>

            {task && (
                <div>
                    <p><strong>Titolo: </strong>{task.title}</p>
                    <p><strong>Descrizione: </strong>{task.description}</p>
                    <p><strong>Status: </strong>{task.status}</p>
                    <p><strong>Data di creazione: </strong>{task.createdAt}</p>

                    <button onClick={deleteTask}>Elimina task</button>
                </div>
            )
            }
        </>
    )
}