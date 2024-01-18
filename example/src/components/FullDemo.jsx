import { useState } from "react";
import GenericTable from "react-generic-table";
import AddRemoveButtons from "./AddRemoveButtons";

export default function FullDemo() {
  const [defaultDataState, setDefaultDataState] = useState([
    { id: 1, name: "J.W.", age: 25, profession: "Developer" },
    { id: 2, name: "Lea", age: 22, profession: "Journalist" },
    { id: 3, name: "Max", age: 34, profession: "Taxi Driver" },
  ]);
  const [newItemName, setNewItemName] = useState("");

  function addNewItem() {
    if (!newItemName) return alert("Please enter a name for the new item!");
    setDefaultDataState((prevDefaultDataState) => [
      ...prevDefaultDataState,
      {
        id: prevDefaultDataState.length + 1,
        name: newItemName,
        age: Math.floor(Math.random() * 100),
        profession: "New",
      },
    ]);
    setNewItemName("");
  }

  function removeItem(id) {
    setDefaultDataState((prevDefaultDataState) => prevDefaultDataState.filter((item) => item.id !== id));
  }

  return (
    <section className="mt-8">
      <h2 className="mb-2 text-3xl">Full DEMO</h2>
      <p className="text-lg">
        Play around with the full real GenericTable component.{" "}
        <small>(Note: Animations when adding new items here works properly)</small>
      </p>

      <div className="my-4">
        <GenericTable
          className="drop-shadow-xl"
          objArray={defaultDataState}
          columns={["name", "age", "profession"]}
          newLink="#"
          showCount={true}
          entityName="person"
          actionsColumnName="Tasks"
          actions={[
            { edit: () => <a>Edit</a> },
            { view: (obj) => <a onClick={() => alert(JSON.stringify(obj))}>View</a> },
            { delete: () => <a>Delete</a> },
          ]}
          onAction={(action, obj) => {
            switch (action) {
              case "delete":
                confirm(`Delete ${obj.name}?`);
                setDefaultDataState((prevDefaultDataState) =>
                  prevDefaultDataState.filter((item) => item.id !== obj.id),
                );
                break;
              case "edit":
                alert(`Edit ${obj.name}?`);
                break;
            }
          }}
        />
      </div>

      <AddRemoveButtons
        onRemove={() => removeItem(defaultDataState.length)}
        onChange={(e) => setNewItemName(e.target.value)}
        value={newItemName}
        onAdd={addNewItem}
      />
    </section>
  );
}
