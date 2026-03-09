"use client"
import React from "react";
import { fakeData } from "@/app/FakeData"
import arrowIcon from "./../../../../public/icon/iconArrow.png";
import Image from "next/image";
import ItemForm from "./ItemForm";
import { useClickAway } from "ahooks";
type Item = {
    id: number
    name: string
    description: string
}
const ItemFormAny = ItemForm as any;

type propsType = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    clickAwayRef: React.RefObject<null>
}

export default function ListItem({ isOpen, setIsOpen, clickAwayRef }: propsType) {

    const idClicked = React.useRef<Item | null>(null);

    function clickHandler(id: number, name: string, description: string) {
        setIsOpen(true);
        idClicked.current = { id, name, description };
    }


    const liElements = fakeData.map(e => {
        return <li key={e.id} className="workReport" onClick={() => clickHandler(e.id, e.name, e.description)}>
            <p>{e.name}</p>
            <p>{e.description}</p>
            <Image src={arrowIcon} alt="arrowIcon" width={40} height={40} className="arrowIconReport" />
        </li>
    })

    return <>
        <ul className="workListReport">
            {liElements}
        </ul>
        {isOpen && <ItemFormAny idItem={idClicked.current} clickAwayRef={clickAwayRef} />}
    </>
}