"use client";
import React from "react";

type Item = {
  id: number;
  name: string;
  description: string;
};

type payloadType = {
  iditem: number;
  nameitem: string;
  note: string;
  technician: string;
};

type PropsType = {
  idItem: Item | null;
  clickAwayRef?: React.RefObject<null>;
};

export default function ItemForm({ idItem, clickAwayRef }: PropsType) {
  const [file, setFile] = React.useState<File | null>(null);

  async function reportAPI(payload: payloadType) {
    const res = await fetch("/api/reportItem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("Inserito:", data);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  return (
    <div className="reportDetail" ref={clickAwayRef}>
      <h2>{idItem?.name}</h2>
      <h3>{idItem?.description}</h3>

      <form
        className="reportForm1"
        onSubmit={(e) => {
          const formData = new FormData(e.currentTarget);
          const payload: payloadType = {
            iditem: idItem?.id || 0,
            nameitem: formData.get("name") as string,
            note: (formData.get("name") as string) || "",
            technician: "",
          };
          reportAPI(payload);
        }}
      >
        <div className="descReportContainer">
          Report:
          <textarea name="name" id="name" />
        </div>
        <input type="file" className="reportFile" onChange={handleChange} />

        {file && <p>File selezionato: {file.name}</p>}
        <button type="submit" className="reportSubmit">
          Submit
        </button>
      </form>
    </div>
  );
}
