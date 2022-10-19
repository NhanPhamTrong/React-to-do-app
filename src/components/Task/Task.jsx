import "./Task.scss"
import { useState } from "react"
import { Reorder } from "framer-motion"
import { Form } from "../Form"

export const Task = (props) => {
    const [edit, setEdit] = useState({
        id: null,
        text: ""
    })

    const ClickTaskMenuToggler = (e) => {
        const order = parseInt(e.currentTarget.getAttribute("order"))
        props.onClick(order)
    }

    const DeleteTask = () => {
        props.onDeleteTask(props.item.id)
    }

    const UpdateTask = () => {
        setEdit({
            id: props.item.id,
            value: props.item.text
        })
    }

    const SubmitUpdate = (value) => {
        props.onUpdate(edit.id, value)
        setEdit({
            id: null,
            text: ""
        })
    }

    const CompletedTask = (e) => {
        props.onCompleted(props.item.id)
    }

    if (edit.id) {
        return (
            <Reorder.Item id={props.item} value={props.item}>
                <div className="checkbox"></div>
                <Form type="update" edit={edit} onSubmit={SubmitUpdate} />
            </Reorder.Item>
        )
    }

    return (
        <Reorder.Item
            className={(props.item.isCompleted ? "completed " : "") + (props.item.isShown ? "" : "hide")}
            value={props.item}
            layout
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}>
                <button className="checkbox" type="button" onClick={CompletedTask} title="Completed task">
                    <i className="fa-solid fa-check"></i>
                </button>
                <h3>{props.item.text}</h3>
                <div className="task-menu">
                    <button className={"task-menu-toggler " + (props.item.isActive ? "active" : "")} type="button" order={props.item.id} onClick={ClickTaskMenuToggler} title="Task menu toggler">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                    <div className={"task-options " + (props.item.isActive ? "active" : "")}>
                        <button className="update" type="button" onClick={UpdateTask}>Update</button>
                        <button className="delete" type="button" onClick={DeleteTask}>Delete</button>
                    </div>
                </div>
        </Reorder.Item>
    )
}