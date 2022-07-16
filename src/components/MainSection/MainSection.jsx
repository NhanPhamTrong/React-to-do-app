import "./MainSection.scss";
import { useEffect, useState } from "react";
import { Form } from "../Form";
import { Task } from "../Task/Task";

export const MainSection = (props) => {
    const [task, setTask] = useState([])
    const [statistic, setStatistic] = useState([true, false, false])

    const HandleClickOutside = (e) => {
        let chosenTask = task.map((name) => {
            if (e.target.classList.contains("task-menu-toggler") === false && e.target.classList.contains("fa-ellipsis-vertical") === false && e.target.closest("div").classList.contains("task-options") === false) {
                name.isActive = false
            }
            return name
        });

        setTask(chosenTask);
    }

    const CloseMainSection = () => {
        props.onCloseMainSection()
    }

    const ClickTaskMenuToggler = (order) => {
        let chosenTask = task.map((name) => {
            if (name.id === order) {
                name.isActive = name.isActive ? false : true
            }
            else {
                name.isActive = false
            }
            return name
        });

        setTask(chosenTask);
    }

    const AddTask = (newTask) => {
        if (newTask.text.trim().length !== 0) {
            task.push(newTask);
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
        setTask(prevValue => prevValue.filter((name) => name.id !== id))
    }

    const DeleteList = () => {
        props.onDeleteList(props.listOrder)
    }

    const UpdateTask = (id, newValue) => {
        if (newValue.text.trim().length === 0) {
            return
        }
        else {
            setTask(prevValue => prevValue.map((name) => (name.id === id ? newValue : name)))
        }
    }

    const Bookmark = (e) => {
        e.currentTarget.classList.toggle("active");

        props.onBookmark(props.listOrder);
    }

    const CompletedTask = (id) => {
        let chosenTask = task.map((name) => {
            if (name.id === id) {
                name.isCompleted = name.isCompleted ? false : true
            }
            return name
        });

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
        let chosenTask = task.map((name) => {
            name.isShown = name.isCompleted ? true : false
            return name
        });

        setTask(chosenTask);
    }

    const GetActive = () => {
        setStatistic([false, true, false])
        let chosenTask = task.map((name) => {
            name.isShown = name.isCompleted ? false : true
            return name
        });

        setTask(chosenTask);
    }

    const GetAll = () => {
        setStatistic([true, false, false])
        let chosenTask = task.map((name) => {
            name.isShown = true
            return name
        });

        setTask(chosenTask);
    }

    return (
        <div className={"main-section" + (props.isActive ? " active" : "") + (props.isOpen ? " open" : "")}>
            <button className="close-main-section" type="button" onClick={CloseMainSection} title="Menu">
                <i className="fa-solid fa-bars"></i>
            </button>
            <div className={"list-content order-" + props.listOrder}>
                <div className="list-header">
                    <h2>{props.listName}</h2>
                    <div className="list-btn">
                        <button className={"bookmark " + (props.bookmarked ? " active" : "")} type="button" onClick={Bookmark} title="Bookmark">
                            <i className="fa-solid fa-star"></i>
                        </button>
                        <button className="delete" type="button" onClick={DeleteList} title="Delete this list">
                            <i className="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>

                <Form type="input-task" onSubmit={AddTask} />

                <ul>
                    {task.map((name, index) => (
                        <Task key={name.id} text={name.text} id={name.id} isActive={name.isActive} isCompleted={name.isCompleted} isShown={name.isShown} onDeleteTask={DeleteTask} onUpdate={UpdateTask} onCompleted={CompletedTask} onClick={ClickTaskMenuToggler} />
                    ))}
                </ul>

                <div className="statistic">
                    <button className={statistic[0] ? "active" : ""} type="button" onClick={GetAll}>All</button>
                    <button className={statistic[1] ? "active" : ""} type="button" onClick={GetActive}>Active</button>
                    <button className={statistic[2] ? "active" : ""} type="button" onClick={GetCompleted}>Completed</button>
                </div>
            </div>
        </div>
    )
}