import "./Menu.scss";
import { Form } from "../Form";
import bookmarked from "../../assets/images/star-solid-lemon.svg";
import openMainSection from "../../assets/images/angle-left-solid.svg";

export const Menu = (props) => {
    const AddList = (newList) => {
        props.AddList(newList)
    }

    const GetList = (e) => {
        props.GetList(e)
    }

    const OpenMainSection = () => {
        props.onOpenMainSection()
    }

    return (
        <div id="menu">
            <div className="open-main-section">
                <button type="button" onClick={OpenMainSection} aria-label="Open main section" title="Open main section">
                    <img src={openMainSection} alt="Open main section" />
                </button>
            </div>

            <div className="avatar">
                <img src="" alt="" />
                <h1 className="name">Nhan Pham</h1>
            </div>

            <Form type="input-list" onSubmit={AddList} />

            <ul>
                {props.list.map((name, index) => (
                    <li key={index} className={name.isActive ? "active" : ""} >
                        <button type="button" order={name.id} onClick={GetList} title="Bookmark" >
                            <h2>{name.text}</h2>
                            <img className={name.bookmarked ? "active" : ""} src={bookmarked} alt="Bookmarked" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}