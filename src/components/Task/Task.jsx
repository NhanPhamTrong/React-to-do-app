import "./Task.scss";
import { useState } from "react";
import { Form } from "../Form";

export const Task = (props) => {
    const [edit, setEdit] = useState({
        id: null,
        text: ""
    });

    const ClickTaskMenuToggler = (e) => {
        const order = parseInt(e.currentTarget.getAttribute("order"));
        props.onClick(order);
    }

    const DeleteTask = () => {
        props.onDeleteTask(props.id)
    }

    const UpdateTask = () => {
        setEdit({
            id: props.id,
            value: props.text
        })
    }

    const SubmitUpdate = (value) => {
        props.onUpdate(edit.id, value);
        setEdit({
            id: null,
            text: ""
        });
    }

    const CompletedTask = (e) => {
        props.onCompleted(props.id)
    }

    if (edit.id) {
        return (
            <li>
                <div className="checkbox"></div>
                <Form type="update" edit={edit} onSubmit={SubmitUpdate} />
            </li>
        )
    }

    return (
        <li className={props.isCompleted ? "completed" : ""} style={props.isShown ? {display : "grid"} : {display : "none"}}>
            <button className="checkbox" type="button" onClick={CompletedTask}>
                <i className="fa-solid fa-check"></i>
            </button>
            <p>{props.text}</p>
            <div className="task-menu">
                <button className={"task-menu-toggler " + (props.isActive ? "active" : "")} type="button" order={props.id} onClick={ClickTaskMenuToggler}>
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
                <div className={"task-options " + (props.isActive ? "active" : "")}>
                    <button className="update" type="button" onClick={UpdateTask}>Update</button>
                    <button className="delete" type="button" onClick={DeleteTask}>Delete</button>
                </div>
            </div>
        </li>
    )
}