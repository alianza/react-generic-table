import { useEffect, useState } from "react";
import LiveProviderBlock from "./LiveProviderBlock";
import AddRemoveButtons from "./AddRemoveButtons";

export default function FullPlayground({ scope }) {
  const [defaultDataState, setDefaultDataState] = useState([
    { id: 1, name: "J.W.", age: "25", profession: "Developer" },
    { id: 2, name: "Lea", age: "22", profession: "Journalist" },
    { id: 3, name: "Max", age: "34", profession: "Taxi Driver" },
  ]);
  const [codeState, setCodeState] = useState(getPlaygroundCode(defaultDataState));
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

  useEffect(() => {
    setCodeState(getPlaygroundCode(defaultDataState));
  }, [defaultDataState]);

  function getPlaygroundCode(data) {
    return `
    <GenericTable
      objArray={
${JSON.stringify(data)}
      }
      columns={[
        "id",
      { name: { alias: "Nickname", className: "font-bold" } }, 
      { age: { onClick: (obj) => { alert(\`Clicked Age row: \${JSON.stringify(obj)}\`); }, 
        className: "text-xs font-semibold rounded bg-red-400 p-2 hover:scale-110 inline-block transition-transform cursor-pointer active:scale-95 hover:outline outline-1" 
       } 
      },
      "profession"
      ]}      
      newLink="#"
      showCount={true}
      entityName="person"
      actionsColumnName="Tasks"
      actions={[
        { edit: () => <a>Edit</a> },
        { view: (obj) => <a onClick={() => alert(JSON.stringify(obj)) }>View</a> },
        { delete: () => <a>Delete</a> }
      ]}
      onAction={(action, obj) => {
        switch (action) {
          case "delete":
            confirm(\`Delete \${obj.name}?\`);
            break;
          case "edit":
            alert(\`Edit \${obj.name}?\`);
            break;
        }
      }
    }
/>;
  `;
  }

  return (
    <section className="mt-8">
      <h2 className="mb-2 text-3xl">Full playground</h2>
      <p className="text-lg">
        Play around with the full GenericTable component.{" "}
        <small>
          (Note: Full table is re-rendered after adding/removing items because of playground code editor setup)
        </small>
      </p>
      <LiveProviderBlock scope={scope} code={codeState} />

      <AddRemoveButtons
        onRemove={() => removeItem(defaultDataState.length)}
        onChange={(e) => setNewItemName(e.target.value)}
        value={newItemName}
        onAdd={addNewItem}
      />
    </section>
  );
}
