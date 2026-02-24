import { useEffect, useState, useRef } from "react";
import Modal from "./Modal";

export default function EditTaskModal({ show, onClose, task, onSave }) {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("To do")

    const formRef = useRef(null)

    useEffect(() => {
        if (!show || !task) return

        setTitle(task.title)
        setDescription(task.description)
        setStatus(task.status)

    }, [show, task])

    function handleSubmit(e) {
        e.preventDefault()

        onSave({
            ...task,
            title: title,
            description: description,
            status: status
        })
    }

    return (
        <Modal
            show={show}
            onClose={onClose}
            title="Modifica Task"
            confirmText="Salva"
            onConfirm={() => formRef.current.requestSubmit()}
            content={
                <form onSubmit={handleSubmit} ref={formRef}>
                    <section className="section_modifica_modale">
                        <label>Titolo</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </section>

                    <section className="section_modifica_modale">
                        <label>Descrizione</label>
                        <textarea
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </section>

                    <section className="section_modifica_modale">
                        <label>Stato</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}>

                            <option value="To do">To do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </section>
                </ form>
            }
        />
    )
}