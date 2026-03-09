import QrScanner from "./QrScanner"
import React, { useCallback, useState } from "react"
import ItemForm from "./ItemForm";

//https://mydata-matrix.netlify.app/todo?path=todo$user=user&id=2
type Item = {
    id: number
    name: string
    description: string
}
type propsType = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    clickAwayRef: React.RefObject<null>
}

export default function ScanPage({ isOpen, setIsOpen, clickAwayRef }: propsType) {
    const [extractedItem, setExtractedItem] = React.useState<Item>({ id: 0, name: "", description: "" })

    const load = useCallback(async (id: number) => {
        const res = await fetch("/api/getTodoItems")
        const data = await res.json()
        const filterData = data.find((f: { id: number; }) => f.id === id)
        setExtractedItem({ id: filterData.id, name: filterData.name, description: filterData.description })
    }, [])

    const handleScan = useCallback(async (decodedText: string) => {
        try {
            const url = new URL(decodedText);
            const id = url.searchParams.get("id");
            if (id) {
                let numberId = Number(id)
                await load(numberId)
                setIsOpen(true)
            }
        } catch (error) {
            console.error("URL non valido:", error);
        }
    }, [load]);

    return <div style={{ padding: "20px" }}>
        <h1>Scansione QR Code</h1>

        <QrScanner onScan={handleScan} />
        {isOpen && <ItemForm idItem={extractedItem} clickAwayRef={clickAwayRef} />}
    </div>
}
