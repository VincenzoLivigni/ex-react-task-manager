import { memo } from "react"
import { Link } from "react-router-dom"

function TaskRow({ task }) {

    return (
        <tr>
            <td>
                <Link to={`/task/${task.id}`}>{task.title}</Link>
            </td>

            <td style={{
                backgroundColor:
                    task.status === "To do" ? "crimson" :
                        task.status === "Doing" ? "gold" :
                            task.status === "Done" ? "ForestGreen" : "white"
            }}
            >{task.status}</td>

            <td>{task.createdAt}</td>
        </tr >
    )
}

export default memo(TaskRow)