import { useState } from "react"

export const Form = (props) => {
    const [input, setInput] = useState(props.type === "update" ? props.edit.value : "");
    const [openInput, setOpenInput] = useState({
        inputList: false,
        inputTask: false
    })

    const HandleChange = (e) => {
        setInput(e.target.value);
    }

    const HandleSubmit = (e) => {
        e.preventDefault();

        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input,
            isShown: true
        });

        setInput("");
    }

    const ClickInputList = (e) => {
        if (e.currentTarget.classList.contains("active")) {
            setOpenInput(prevValue => ({
                inputList: false,
                inputTask: false
            }))
        }
        else {
            setOpenInput(prevValue => ({
                inputList: true,
                inputTask: false
            }))
        }
    }

    if (props.type === "update") {
        return (
            <form className="update-task" onSubmit={HandleSubmit}>
                <input type="text" value={input} onChange={HandleChange} />
            </form>
        )
    }
    else if (props.type === "input-list") {
        return (
            <form className="input-list" onSubmit={HandleSubmit}>
                <button className={openInput.inputList ? "active" : ""} type="button" onClick={ClickInputList} title="Add new list">
                    <i className="fa-solid fa-plus"></i>
                </button>
                <input className={openInput.inputList ? "active" : ""} type="text" placeholder="Your list name..." value={input} onChange={HandleChange} />
            </form>
        )
    }
    else if (props.type === "input-task") {
        return (
            <form className="input-task" onSubmit={HandleSubmit}>
                <input type="text" placeholder="Your task..." value={input} onChange={HandleChange} />
            </form>
        )
    }
}