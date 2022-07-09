import "./Menu.scss";
import { Form } from "../Form";

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
            <div className="container">
                <div className="open-main-section-btn">
                    <button className="open-main-section" type="button" onClick={OpenMainSection}>
                        <i className="fa-solid fa-angle-left"></i>
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
                            <button type="button" order={name.id} onClick={GetList} >
                                <h2>{name.text}</h2>
                                <span className={name.bookmarked ? "active" : ""}>
                                    <i className="fa-solid fa-star"></i>
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}