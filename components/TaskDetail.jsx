import { useContext, useState } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import { useParams, useNavigate } from "react-router-dom"
import Modal from "./Modal"
import EditTaskModal from "./EditTaskModal"

export default function TaskDetail() {
    const { tasks, removeTask, updateTask } = useContext(GlobalContext)
    const { id } = useParams()
    const navigate = useNavigate()

    /* state elimina modale */
    const [showDelete, setShowDelete] = useState(false)
    console.log("show modal:", showDelete)

    /* state modifica modale */
    const [showModify, setShowModify] = useState(false)
    console.log("show modal:", showModify)

    const task = tasks.find((t) => t.id.toString() === id)

    /* funzione elimina task */
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

    /* funzione modifica task */
    async function modifyTask(updatedTask) {
        console.log("Task modificata");

        try {
            await updateTask(updatedTask)
            alert("Task modificata con successo")
            setShowModify(false)
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

                            <button className="px-3 me-3" onClick={() => setShowDelete(true)}>Elimina task</button>
                            <button className="px-3" onClick={() => setShowModify(true)}>Modifica task</button>
                        </div>

                        {/* Modale elimina task */}
                        <Modal
                            title="Sicuro di voler rimuovere la task?"
                            content={task.title}
                            show={showDelete}
                            onClose={() => setShowDelete(false)}
                            onConfirm={deleteTask}
                            confirmText={"Conferma"}
                        />

                        {/* Modale elimina task */}
                        <EditTaskModal
                            show={showModify}
                            onClose={() => setShowModify(false)}
                            task={task}
                            onSave={modifyTask}
                        />
                    </>
                )
                }
            </main>
        </>
    )
}