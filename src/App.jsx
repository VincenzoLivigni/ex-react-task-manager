import { BrowserRouter, Routes, Route } from "react-router-dom"
import TaskList from "../pages/TaskList"
import AddTask from "../pages/AddTask"
import DefaultLayout from "../layouts/DefaultLayout"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<TaskList />} />
            <Route path="/addTask" element={<AddTask />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
