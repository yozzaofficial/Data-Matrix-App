"use client";
import { ChangeEvent } from "react";
import iconX from "./../../../../public/icon/iconX.png";
import Image from "next/image";
import React from "react";
import CustomSelect from "./../CustomSelect";
import workConfirmHandler from "./workConfirmHandler";
import { setTodoFalse } from "./workConfirmHandler";
import { MaintenanceItem } from "@/app/todo/page";
type propsType = {
  isWorkConfirmOpen: boolean;
  setOpenWorkDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setIsWorkConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
  itemData: MaintenanceItem;
};
export default function WorkConfirm({
  isWorkConfirmOpen,
  setOpenWorkDetail,
  setIsWorkConfirmOpen,
  itemData,
}: propsType) {
  const [fileName, setFileName] = React.useState<String[]>([]); // inizializza array vuoto
  const [workConfirmOut, setWorkConfirmOut] = React.useState(false);
  const defaultSelectValue = "Select an option";
  const [selectValue, setSelectValue] = React.useState(defaultSelectValue);
  const [selectOpen, setSelectOpen] = React.useState(false);
  const [note, setNote] = React.useState("");

  React.useEffect(() => {
    setTimeout(() => {
      setIsWorkConfirmOpen(false);
      setWorkConfirmOut(false);
    }, 250);
  }, [workConfirmOut]);

  async function tryInsert() {
    await submitData();
    window.location.reload();
    setOpenWorkDetail(false);
  }

  const onChangeImgInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    // aggiungi i nuovi file ai precedenti
    setFileName((prev) => [...prev, ...files.map((file) => file.name)]);
  };

  function submitData() {
    let payload = {
      id: String(itemData.id),
      iditem: String(itemData.id),
      nameitem: itemData.name,
      done: note,
      last_maintenance: new Date().toISOString(),
      note: "",
      technician: selectValue,
    };
    workConfirmHandler({ payload });
    setTodoFalse(String(itemData.id));
  }

  return (
    <div
      className={`workConfirm ${workConfirmOut ? "workConfirmTransitionLeft" : isWorkConfirmOpen ? "workConfirmTransition" : ""}`}
    >
      <header>
        <div className="workDetailTitle">
          <h2>Confirm Work</h2>
          <Image
            src={iconX}
            alt="Close icon"
            className="closeIcon"
            onClick={() => setOpenWorkDetail(false)}
          />
        </div>
      </header>
      <main>
        <div id="confirmWorkForm">
          <div>
            <p className="pTitle">Technician:</p>

            <CustomSelect
              width={350}
              height={60}
              optionsValues={[
                "",
                "Technician 1",
                "Technician 2",
                "Technician 3",
              ]}
              defaultSelectValue={defaultSelectValue}
              setSelectValue={setSelectValue}
              selectValue={selectValue}
              setIsOpen={setSelectOpen}
              isOpen={selectOpen}
            />
          </div>
          <div>
            <label htmlFor="confirmWorkDesc">Description:</label>
            <textarea
              id="confirmWorkDesc"
              name="confirmWorkDesc"
              rows={4} // numero di righe visibili
              cols={50} // larghezza (opzionale, puoi usare CSS)
              placeholder="Give a brief description of the work"
              value={note} // il valore viene dal state
              onChange={(e) => setNote(e.target.value)}
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
            <button
              type="submit"
              className="workDetailButton"
              onClick={() => tryInsert()}
            >
              Confirm
            </button>
            <button
              type="button"
              className="workDetailButton workDetailButtonCancel"
              onClick={() => setWorkConfirmOut(true)}
            >
              Cancel
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
