"use client"
import { ChangeEvent } from "react"
import iconX from "./../../../../public/icon/iconX.png"
import Image from "next/image"
import React from "react"
import CustomSelect from "./../CustomSelect"
type propsType = {
    isWorkConfirmOpen: boolean,
    setOpenWorkDetail: React.Dispatch<React.SetStateAction<boolean>>,
    setIsWorkConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function WorkConfirm({ isWorkConfirmOpen, setOpenWorkDetail, setIsWorkConfirmOpen }: propsType) {
    const [fileName, setFileName] = React.useState<String[]>([]); // inizializza array vuoto
    const [workConfirmOut, setWorkConfirmOut] = React.useState(false)
    const defaultSelectValue = "Select an option"
    const [selectValue, setSelectValue] = React.useState(defaultSelectValue)


    React.useEffect(() => {
        setTimeout(() => {
            setIsWorkConfirmOpen(false);
            setWorkConfirmOut(false);
        }, 250);
    }, [workConfirmOut])

    async function tryInsert() {
        const res = await fetch("./../../api/insertNewWork", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        });

        if (res.ok) {
            const user = await res.json();
            console.log("Login OK:", user);
        } else {
            console.error("Login fallito");
        }
    }


    const onChangeImgInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);

        // aggiungi i nuovi file ai precedenti
        setFileName(prev => [...prev, ...files.map(file => file.name)]);
    };

    return <div className={`workConfirm ${workConfirmOut ? "workConfirmTransitionLeft" : isWorkConfirmOpen ? "workConfirmTransition" : ""}`}>
        <header>
            <div className="workDetailTitle">
                <h2>Confirm Work</h2>
                <Image src={iconX} alt="Close icon" width={48} height={48} className="closeIcon" onClick={() => setOpenWorkDetail(false)} />
            </div>
        </header>
        <main>
            <div id="confirmWorkForm">

                <div>
                    <label htmlFor="confirmWorkTechnician">Technician:</label>
                    <div id="confirmWorkTechnician">
                        <CustomSelect width={350} height={60} optionsValues={["", "Technician 1", "Technician 2", "Technician 3"]} defaultSelectValue={defaultSelectValue}
                            setSelectValue={setSelectValue}
                            selectValue={selectValue} />
                    </div>
                </div>
                <div>
                    <label htmlFor="confirmWorkDesc">Description:</label>
                    <textarea

                        id="confirmWorkDesc"
                        name="confirmWorkDesc"
                        rows={4}          // numero di righe visibili
                        cols={50}         // larghezza (opzionale, puoi usare CSS)
                        placeholder="Give a brief description of the work"
                    ></textarea>
                </div>
                <div className="confirmWorkImgDiv">
                    <label htmlFor="confirmWorkImg" className="confirmWorkImgLabel">
                        Image
                        <input
                            id="confirmWorkImg"
                            type="file"
                            name="images"
                            multiple
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={onChangeImgInput}
                        />
                    </label>
                    <ul className="confirmWorkImgList">
                        {fileName?.map((name, index) => (
                            <li key={index}>{name}</li>
                        ))}
                    </ul>
                </div>
                <div className="buttonField">
                    <button type="submit" className="workDetailButton" onClick={() => tryInsert()}>Confirm</button>
                    <button type="button" className="workDetailButton workDetailButtonCancel" onClick={() => setWorkConfirmOut(true)}>Cancel</button>
                </div>

            </div>
        </main>
    </div>
}