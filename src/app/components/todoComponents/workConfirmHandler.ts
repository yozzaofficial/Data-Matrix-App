
type TodoItem = {
    id: string;              // UUID
    iditem: string;
    nameitem: string;
    done: string;
    last_maintenance: string;
    note: string;
    technician: boolean;
};
type propsConfirm = {
    payload: TodoItem
}

export default async function workConfirmHandler({ payload }: propsConfirm) {

    const res = await fetch("/api/setDoneItems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log("Inserito:", data);
};
