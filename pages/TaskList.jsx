import { useContext, useEffect, useMemo, useState } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import TaskRow from "../components/TaskRow"

export default function TaskList() {

    const { tasks } = useContext(GlobalContext)

    const [sortBy, setSortBy] = useState("createdAt")
    const [sortOrder, setSortOrder] = useState(1)

    const [searchQuery, setSearchQuery] = useState("")
    const [queryDebounced, setQueryDebounced] = useState("")

    function order(column) {
        if (sortBy === column) {
            setSortOrder(prev => prev * -1)
        } else {
            setSortBy(column)
            setSortOrder(1)
        }
    }

    useEffect(() => {
        const ritardoAggiornamentoQuery = setTimeout(() => {
            setQueryDebounced(searchQuery)
        }, 1000)

        return () => clearTimeout(ritardoAggiornamentoQuery)
    }, [searchQuery])

    const orderedTasks = useMemo(() => {

        const query = queryDebounced.toLowerCase()

        const filteredTasks = tasks.filter((t) => t.title.toLowerCase().includes(query))

        const statusOrder = {
            "To do": 0,
            "Doing": 1,
            "Done": 2
        }

        return [...filteredTasks].sort((a, b) => {
            if (sortBy === "title") {
                return a.title.localeCompare(b.title) * sortOrder
            }

            if (sortBy === "status") {
                return (statusOrder[a.status] - statusOrder[b.status]) * sortOrder
            }

            if (sortBy === "createdAt") {
                return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * sortOrder
            }

            return 0
        })

    }, [tasks, sortBy, sortOrder, queryDebounced])

    return (
        <>
            <main>
                <h3>Lista task</h3>

                <input
                    className="mb-3"
                    type="text"
                    placeholder="Cerca..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <table>
                    <thead>
                        <tr>
                            <th className="evidenziaOrdine" onClick={() => order("title")}>Nome</th>
                            <th className="evidenziaOrdine" onClick={() => order("status")}>Stato</th>
                            <th className="evidenziaOrdine" onClick={() => order("createdAt")}>Data di Creazione</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            orderedTasks.map((task) => (
                                <TaskRow key={task.id} task={task} />
                            ))
                        }
                    </tbody>
                </table>
            </main>
        </>
    )
}