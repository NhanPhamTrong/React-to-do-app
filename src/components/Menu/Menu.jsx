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
            <div className="open-main-section">
                <button type="button" onClick={OpenMainSection} title="Open main section">
                    <ion-icon name="chevron-back"></ion-icon>
                </button>
            </div>

            <div className="avatar">
                <img src="" alt="" />
                <h1 className="name">Name</h1>
            </div>

            <Form type="input-list" onSubmit={AddList} />

            <ul>
                {props.list.map((item, index) => (
                    <li key={index} className={item.isActive ? "active" : ""} >
                        <button type="button" order={item.id} onClick={GetList} >
                            <h2>{item.text}</h2>
                            <span className={item.bookmarked ? "active" : ""}>
                                <ion-icon name="star"></ion-icon>
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}