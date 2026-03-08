
type TodoItem = {
    id: string;              // UUID
    iditem: string;
    nameitem: string;
    done: string;
    last_maintenance: string;
    note: string;
    technician: string;
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
export async function setTodoFalse(id: string) {

    const res = await fetch("/api/setTodoFalse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    })
    const data = await res.json();
    console.log("Ok:", data);
}
