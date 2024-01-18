import React from "react";
import logo from "./logo.svg";
import styles from "./app.module.scss";
import utilStyles from "./utils.module.scss";
import "./index.css";

import GenericTable from "react-generic-table";
import "react-generic-table/dist/index.css";
import FullPlayground from "./components/FullPlayground";
import LiveProviderBlock from "./components/LiveProviderBlock";
import FullDemo from "./components/FullDemo";
const scope = { GenericTable };

const packageUrl = "https://npmjs.com/package/react-generic-table";

const App = () => {
  return (
    <div className={`${utilStyles.App} App bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50`}>
      <header className={styles.header}>
        <div>
          <img src={logo} alt="logo" />
        </div>

        <div>
          <p className={styles.title}>React Generic Table Example</p>
        </div>

        <div className={styles.linkContainer}>
          <a
            className={`${utilStyles.link} text-neutral-50`}
            href={packageUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            react-generic-table on NPM
          </a>
        </div>
      </header>

      <main className="mx-auto min-h-screen max-w-4xl p-4">
        <section>
          <h1 className="mb-2 text-5xl">React Generic Table</h1>
          <p className="text-lg">
            A simple, customizable, responsive, out-of-the-box table component for React. 🧮 Just feed it data and
            indicate what columns you want to display and in what order! 😄 Quick and easy to use, yet customizable and
            feature-rich. 🚀
          </p>

          <h2 className="mb-2 mt-8 text-3xl">Installation</h2>
          <p className="text-lg">
            Install <code>react-generic-table</code> using <code>npm</code> or <code>yarn</code>:
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex gap-2">
              <span>npm:</span>
              <code>npm i react-generic-table</code>
            </div>
            <div className="flex gap-2">
              <span>yarn:</span>
              <code>yarn add react-generic-table</code>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-2 text-3xl">Usage</h2>
          <p className="text-lg">
            Simply feed data and indicate what columns you want to display and in what order! 😄
          </p>
          <ul className="my-2 ms-4 list-disc p-2 font-medium  ">
            <li>Configurable ⚙️</li>
            <li>sorting 🔀</li>
            <li>Loading states 🔄</li>
            <li>Empty states 📭</li>
            <li>Responsive 📱</li>
            <li>Out-of-the-box animations 🎬</li>
            <li>Custom actions 🧮</li>
            <li>Dark mode support 🌙</li>
          </ul>
          <LiveProviderBlock
            scope={scope}
            code={` 
    <GenericTable
        objArray={[
          { id: 1, name: "J.W.", age: "25", profession: "Developer" },
          { id: 2, name: "Lea", age: "22", profession: "Journalist" },
          { id: 3, name: "Max", age: "34", profession: "Taxi Driver" }
        ]}
        columns={["name", "age", "profession"]}
        newLink="#"
        sorting={true}
        showCount={true}
        entityName="person"
    />
            `}
          />
        </section>

        <section className="mt-8">
          <h2 className="mb-2 text-3xl">Simple action column support</h2>
          <p className="text-lg">You can also add an action column with custom actions to each row!</p>
          <ul className="my-2 ms-4 list-disc p-2 font-medium  ">
            <li>Add multiple actions per row 🧮</li>
            <li>Actions have access to the row data 💾</li>
            <li>Useful for links, buttons, icons, etc. 🖱️</li>
          </ul>
          <LiveProviderBlock
            scope={scope}
            code={`
    <GenericTable
        objArray={[
          { id: 1, name: "J.W.", age: "25", profession: "Developer" },
          { id: 2, name: "Lea", age: "22", profession: "Journalist" },
          { id: 3, name: "Max", age: "34", profession: "Taxi Driver" }
        ]}
        columns={["name", "age", "profession"]}
        actions={[
          { edit: (obj) => <a onClick={() => alert(JSON.stringify(obj)) }>Edit</a> },
          { view: (obj) => <a href={'#/' + obj.id}>View</a> }
        ]}
        entityName="person"
        showCount={true}
    />
                `}
          />
        </section>

        <section className="mt-8">
          <h2 className="mb-2 text-3xl">Advanced action column configuration</h2>
          <p className="text-lg">You can also add an action column with custom actions!</p>
          <ul className="my-2 ms-4 list-disc p-2 font-medium  ">
            <li>Add multiple actions per row 🧮</li>
            <li>Customize the action column name 📝</li>
            <li>Actions have access to the row data 💾</li>
            <li>Actions can be async 🚀</li>
            <li>Optional callback function for more complex individual action handling like Api calls etc. 🛜</li>
            <li>Customize the actions column name 📝</li>
          </ul>
          <LiveProviderBlock
            scope={scope}
            code={`
    <GenericTable
        objArray={[
          { id: 1, name: "J.W.", age: "25", profession: "Developer" },
          { id: 2, name: "Lea", age: "22", profession: "Journalist" },
          { id: 3, name: "Max", age: "34", profession: "Taxi Driver" }
        ]}
        columns={["name", "age", "profession"]}
        newLink="#"
        actionsColumnName="Tasks"
        actions={[
          { edit: () => <a>Edit</a> },
          { view: () => <a>View</a> },
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
            case "view":
              alert(\`View \${obj.name}?\`);
              break;
         }
        }}
    />
            `}
          />
        </section>

        <section className="mt-8">
          <h2 className="mb-2 text-3xl">Built-in Loading states</h2>
          <p className="text-lg">Loading states are built-in!</p>
          <ul className="my-2 ms-4 list-disc p-2 font-medium  ">
            <li>Loading state while data is being fetched (null) 🔄</li>
          </ul>

          <LiveProviderBlock
            scope={scope}
            code={`
        <GenericTable
            objArray={null}
            columns={["name", "age", "profession"]}
        />
                `}
          />
        </section>

        <section className="mt-8">
          <h2 className="mb-2 text-3xl">Built-in empty state</h2>
          <p className="text-lg">Empty state built-in!</p>
          <ul className="my-2 ms-4 list-disc p-2 font-medium  ">
            <li>Empty state when no data is available (empty array) 📭</li>
            <li>Customizable empty state message by indicating the entity name 📝</li>
          </ul>

          <LiveProviderBlock
            scope={scope}
            code={`
    <GenericTable
        objArray={[]}
        columns={["name", "age", "profession"]}
        newLink="#"
        entityName="person"
    />
            `}
          />
        </section>

        <section className="mt-8">
          <h2 className="mb-2 text-3xl">Responsive capabilities</h2>
          <p className="text-lg">
            The table is responsive! Scrollbars are added when the table is wider than the space available 📱
          </p>

          <div className="mx-auto my-8 max-w-64">
            <GenericTable
              className="drop-shadow-xl"
              objArray={[
                { id: 1, name: "J.W.", age: 25, profession: "Developer", salary: "1000" },
                { id: 2, name: "Lea", age: 22, profession: "Journalist", salary: "2000" },
                { id: 3, name: "Max", age: 34, profession: "Taxi Driver", salary: "3000" },
              ]}
              columns={["id", "name", "age", "profession", "salary"]}
              actions={[
                { edit: (obj) => <a onClick={() => alert("Edit:" + JSON.stringify(obj))}>Edit</a> },
                { view: (obj) => <a onClick={() => alert("View:" + JSON.stringify(obj))}>View</a> },
                { delete: (obj) => <a onClick={() => alert("Delete:" + JSON.stringify(obj))}>Delete</a> },
              ]}
              entityName="person"
            />
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-2 text-3xl">Advanced Column Configurations</h2>
          <p className="text-lg">You can also add additional column configurations!</p>
          <ul className="my-2 ms-4 list-disc p-2 font-medium  ">
            <li>Custom column names 📝</li>
            <li>Custom column class names 📃</li>
            <li>Custom column capitalization 🏙️ (opt-out)</li>
            <li>Custom column handlers & props (With access to full object) 🖱️</li>
          </ul>
          <LiveProviderBlock
            scope={scope}
            code={`
    <GenericTable
        objArray={[
          { id: 1, name: "J.W.", age: "25", profession: "Developer", alive: "yes" },
          { id: 2, name: "Lea", age: "22", profession: "Journalist", alive: "no" },
          { id: 3, name: "Max", age: "34", profession: "Taxi Driver", alive: "yes" }
        ]}
        columns={[
          { name: { alias: "Nickname", className: "font-bold" } }, 
          { age: { onClick: (obj) => { alert(\`Clicked Age row: \${JSON.stringify(obj)}\`); }, 
            className: "text-xs font-semibold rounded bg-red-400 p-2 hover:scale-110 inline-block transition-transform cursor-pointer active:scale-95 hover:outline outline-1" 
           } 
          },
          { profession: { capitalize: false }, style: { fontFamily: 'Times New Roman'  } },
          { alive: { capitalize: false, style: { fontFamily: 'Times New Roman' } } }
          ]}
    />;
            `}
          />
        </section>

        <FullPlayground scope={scope} />

        <FullDemo />
      </main>
      <footer className={styles.footer}>
        <span>
          Created by{" "}
          <a href="https://jwvbremen.nl/" target="_blank" rel="noreferrer">
            Jan-Willem van Bremen
          </a>
        </span>
      </footer>
    </div>
  );
};

export default App;
