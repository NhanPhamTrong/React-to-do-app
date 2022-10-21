import "./MainSection.scss"
import { useEffect, useState } from "react"
import { Form } from "../Form"
import { Task } from "../Task/Task"
import { Reorder, AnimatePresence } from "framer-motion"

export const MainSection = (props) => {
    const [task, setTask] = useState([])
    const [statistic, setStatistic] = useState([true, false, false])

    const HandleClickOutside = (e) => {
        let chosenTask = task.map((item) => {
            if (e.target.classList.contains("task-menu-toggler") === false && e.target.closest("div").classList.contains("task-options") === false) {
                item.isActive = false
            }
            return item
        })

        setTask(chosenTask)
    }

    const CloseMainSection = () => {
        props.onCloseMainSection()
    }

    const ClickTaskMenuToggler = (order) => {
        let chosenTask = task.map((item) => {
            if (item.id === order) {
                item.isActive = item.isActive ? false : true
            }
            else {
                item.isActive = false
            }
            return item
        })

        setTask(chosenTask)
    }

    const AddTask = (newTask) => {
        if (newTask.text.trim().length !== 0) {
            task.push(newTask)
        }

        setTask((prevValue) => [...prevValue])
        
        if (statistic[2]) {
            GetCompleted()
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", HandleClickOutside)
        return (() => {
            document.removeEventListener("mousedown", HandleClickOutside)
        })
    })

    const DeleteTask = (id) => {
        setTask(prevValue => prevValue.filter((item) => item.id !== id))
    }

    const DeleteList = () => {
        props.onDeleteList(props.item.id)
    }

    const UpdateTask = (id, newValue) => {
        if (newValue.text.trim().length === 0) {
            return
        }
        else {
            setTask(prevValue => prevValue.map((item) => (item.id === id ? newValue : item)))
        }
    }

    const Bookmark = (e) => {
        e.currentTarget.classList.toggle("active")
        props.onBookmark(props.item.id)
    }

    const CompletedTask = (id) => {
        let chosenTask = task.map((item) => {
            if (item.id === id) {
                item.isCompleted = item.isCompleted ? false : true
            }
            return item
        })

        setTask(chosenTask)

        if (statistic[1]) {
            GetActive()
        }
        else if (statistic[2]) {
            GetCompleted()
        }
    }

    const GetCompleted = () => {
        setStatistic([false, false, true])
        let chosenTask = task.map((item) => {
            item.isShown = item.isCompleted ? true : false
            return item
        })

        setTask(chosenTask)
    }

    const GetActive = () => {
        setStatistic([false, true, false])
        let chosenTask = task.map((item) => {
            item.isShown = item.isCompleted ? false : true
            return item
        })

        setTask(chosenTask)
    }

    const GetAll = () => {
        setStatistic([true, false, false])
        let chosenTask = task.map((item) => {
            item.isShown = true
            return item
        })

        setTask(chosenTask)
    }

    return (
        <div className={"main-section" + (props.item.isActive ? " active" : "") + (props.isOpen ? " open" : "")}>
                <button className="close-main-section" type="button" onClick={CloseMainSection} title="Close main section">
                    <ion-icon name="list-outline"></ion-icon>
                </button>
                <div className={"list-content order-" + props.item.id}>
                    <div className="list-header">
                        <h2>{props.item.text}</h2>
                        <div className="list-btn">
                            <button className={"bookmark " + (props.item.bookmarked ? " active" : "")} type="button" onClick={Bookmark} title="Bookmark">
                                <ion-icon name="star"></ion-icon>
                            </button>
                            <button className="delete" type="button" onClick={DeleteList} title="Delete this list">
                                <ion-icon name="trash"></ion-icon>
                            </button>
                        </div>
                    </div>

                    <Form type="input-task" onSubmit={AddTask} />

                    <AnimatePresence mode="popLayout">
                        <Reorder.Group axis="y" values={task} onReorder={setTask}>
                            {task.map((item) => {
                                return (
                                    <Task key={item.id} item={item} onDeleteTask={DeleteTask} onUpdate={UpdateTask} onCompleted={CompletedTask} onClick={ClickTaskMenuToggler}/>
                                )
                            })}
                        </Reorder.Group>
                    </AnimatePresence>

                    <div className="statistic">
                        <button className={statistic[0] ? "active" : ""} type="button" onClick={GetAll}>All</button>
                        <button className={statistic[1] ? "active" : ""} type="button" onClick={GetActive}>Active</button>
                        <button className={statistic[2] ? "active" : ""} type="button" onClick={GetCompleted}>Completed</button>
                    </div>
                </div>
        </div>
    )
}