import { useState, useRef, useContext } from "react"
import { GlobalContext } from "../contexts/GlobalContext"

export default function AddTask() {

    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";

    const [title, setTitle] = useState("")
    const [errorMess, setErrorMess] = useState("")

    const validaTitle = title.trim() === "" || [...title.trim()].some((t) => symbols.includes(t))

    const descriptionRef = useRef()
    const statusRef = useRef()

    const { addTask } = useContext(GlobalContext)

    async function handleSubmit(e) {
        e.preventDefault()

        const descriptionValue = descriptionRef.current.value
        const statusValue = statusRef.current.value

        if (validaTitle) {
            setErrorMess("Il titolo non puo contenere caratteri speciali o essere vuoto")
            return
        }

        setErrorMess("")

        try {
            await addTask({
                title: title,
                description: descriptionValue,
                status: statusValue
            })

            alert("Task creata con successo")

            setTitle("")
            descriptionRef.current.value = ""
            statusRef.current.value = "To do"
        }
        catch (err) {
            console.log(err)
            alert(`Creazione della task fallita, ${err.message}`)
        }
    }

    return (
        <>
            <main>
                <h3>Aggiungi task</h3>
                <form onSubmit={handleSubmit}>

                    {/* Nome */}
                    <section className="section_add_task">
                        <label>Nome</label>
                        <input
                            type="text"
                            placeholder="Inserisci il titolo della task"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {errorMess && <p style={{ color: "red" }}>{errorMess}</p>}
                    </section>

                    {/* descrizione */}
                    <section className="section_add_task">
                        <label>Descrizione</label>
                        <textarea
                            placeholder="Inserisci descrizione"
                            ref={descriptionRef}
                            defaultValue="">

                        </textarea>
                    </section>

                    {/* stato */}
                    <section className="section_add_task">
                        <label>Stato</label>
                        <select ref={statusRef}
                            defaultValue="To do">

                            <option value="To do">To do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </section>

                    <button className="mt-4 px-2" type="submit">Aggiungi task</button>
                </form>
            </main>
        </>
    )
}