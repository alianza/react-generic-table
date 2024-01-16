import { useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import utilStyles from "../utils.module.scss";
import GenericTable from "react-generic-table";

export default function FullDemo({ scope }) {
  const [defaultDataState, setDefaultDataState] = useState([
    { id: 1, name: "J.W.", age: "25", profession: "Developer" },
    { id: 2, name: "Lea", age: "22", profession: "Journalist" },
    { id: 3, name: "Max", age: "34", profession: "Taxi Driver" },
  ]);
  const [newItemName, setNewItemName] = useState("");

  function addNewItem() {
    if (!newItemName) {
      alert("Please enter a name for the new item!");
      return;
    }
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
      <p className="text-lg">Play around with the full real GenericTable component.</p>

      <div className="my-4">
        <GenericTable
          objArray={defaultDataState}
          columns={["name", "age", "profession"]}
          newLink="#"
          showCount={true}
          entityName="person"
          actionsColumnName="Tasks"
          actions={[
            { edit: () => <a>Edit</a> },
            { view: (obj) => <a onClick={() => alert(JSON.stringify(obj))}>Edit</a> },
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

      <div className="my-2 flex gap-4">
        <button
          className={`flex items-center gap-2 rounded bg-red-500 p-1 ${utilStyles.hoverEffect}`}
          onClick={() => removeItem(defaultDataState.length)}
        >
          <span className="flex items-center">
            Remove item <MinusIcon className="w-5" />
          </span>
        </button>

        <span className="flex">
          <input
            className="w-24 rounded-l text-neutral-900"
            name="name"
            placeholder="name"
            onChange={(e) => setNewItemName(e.target.value)}
            value={newItemName}
          />
          <button
            className={`flex origin-left items-center gap-2 rounded-r bg-green-500 p-1 ${utilStyles.hoverEffect}`}
            onClick={addNewItem}
          >
            <span className="flex items-center">
              Add item <PlusIcon className="w-5" />
            </span>
          </button>
        </span>
      </div>
    </section>
  );
}
