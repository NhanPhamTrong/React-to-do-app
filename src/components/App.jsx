import { MainSection } from "./MainSection/MainSection";
import { useState } from "react";
import { Menu } from "./Menu/Menu";

export const App = () => {
    const [list, setList] = useState([])
    const [mainSectionOpen, setMainSectionOpen] = useState(false)

    const OpenMainSection = () => {
        if (mainSectionOpen === false) {
            setMainSectionOpen(true)
        }
    }

    const CloseMainSection = () => {
        if (mainSectionOpen === true) {
            setMainSectionOpen(false)
        }
    }

    const AddList = (newList) => {
        if (newList.text.trim().length !== 0) {
            list.push(newList);
        }

        setList((prevValue) => [...prevValue]);
    }

    const GetList = (e) => {
        const order = parseInt(e.currentTarget.getAttribute("order"));

        let chosenList = list.map((name) => {
            name.isActive = name.id === order ? true : false
            return name
        });

        setList(chosenList)
        setMainSectionOpen(false)
    }

    const DeleteList = (listOrder) => {
        setList(prevValue => prevValue.filter((name) => name.id !== listOrder))
    }

    const Bookmark = (id) => {
        let chosenList = list.map((name) => {
            if (name.id === id) {
                name.bookmarked = name.bookmarked ? false : true
            }
            return name
        });

        setList(chosenList);
    }

    return (
        <>
            <Menu list={list} AddList={AddList} GetList={GetList} onOpenMainSection={OpenMainSection} />
            {list.map((name, index) => (
                <MainSection key={name.id} listOrder={name.id} listName={name.text} isActive={name.isActive} isOpen={mainSectionOpen} onCloseMainSection={CloseMainSection} onDeleteList={DeleteList} onBookmark={Bookmark} />
            ))}
        </>
    )
}