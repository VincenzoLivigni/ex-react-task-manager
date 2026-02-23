import { useContext, useState } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import { useParams, useNavigate } from "react-router-dom"
import Modal from "./Modal"

export default function TaskDetail() {
    const { tasks, removeTask } = useContext(GlobalContext)
    const { id } = useParams()
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    console.log("show modal:", show)

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
            <main>
                {task && (
                    <>
                        <div>
                            <h3>{task.title}</h3>
                            <p><strong>Descrizione: </strong>{task.description}</p>
                            <p><strong>Status: </strong>{task.status}</p>
                            <p><strong>Data di creazione: </strong>{task.createdAt}</p>

                            <button className="px-3" onClick={() => setShow(true)}>Elimina task</button>
                        </div>
                        <Modal
                            title="Sicuro di voler rimuovere la task?"
                            content={task.title}
                            show={show}
                            onClose={() => setShow(false)}
                            onConfirm={deleteTask}
                            confirmText={"Conferma"}
                        />
                    </>
                )
                }
            </main>
        </>
    )
}