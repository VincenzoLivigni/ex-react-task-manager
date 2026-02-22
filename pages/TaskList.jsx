import { useContext } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import TaskRow from "../components/TaskRow"

export default function TaskList() {

    const { tasks } = useContext(GlobalContext)
    return (
        <>
            <main>
                <h3>TaskList</h3>
                <table className="bg-white">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Stato</th>
                            <th>Data di Creazione</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            tasks.map((task) => (
                                <TaskRow key={task.id} task={task} />
                            ))
                        }
                    </tbody>
                </table>
            </main>
        </>
    )
}