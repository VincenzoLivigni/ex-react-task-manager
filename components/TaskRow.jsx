import { memo } from "react"

function TaskRow({ task }) {

    return (
        <tr>
            <td>{task.title}</td>

            <td style={{
                backgroundColor:
                    task.status === "To do" ? "crimson" :
                        task.status === "Doing" ? "gold" :
                            task.status === "Done" ? "ForestGreen" : "white"
            }}
            >{task.status}</td>

            <td>{task.createdAt}</td>
        </tr>
    )
}

export default memo(TaskRow)