"use client"
import React from "react"

type Item = {
    id: number
    name: string
    description: string
}

type PropsType = {
    idItem: Item | null,
    clickAwayRef?: React.RefObject<null>,
}

export default function ItemForm({ idItem, clickAwayRef }: PropsType) {

    const [file, setFile] = React.useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        setFile(e.target.files[0])
    }


    return (
        <div className="reportDetail" ref={clickAwayRef}>
            <h2>{idItem?.name}</h2>
            <h3>{idItem?.description}</h3>

            <form className="reportForm1">
                <div className="descReportContainer">Report:
                    <textarea name="name" id="name" />
                </div>
                <input type="file" className="reportFile" onChange={handleChange} />

                {file && <p>File selezionato: {file.name}</p>}
                <button type="submit" className="reportSubmit">Submit</button>
            </form>
        </div>
    )
}