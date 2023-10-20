import React, { useEffect } from "react";
import logo from "./logo.svg";
import styles from "./app.module.scss";
import utilStyles from "./utils.module.scss";

import hljs from "highlight.js/lib/core";
import html from "highlight.js/lib/languages/xml";

import GenericTable from "react-generic-table";
import "react-generic-table/dist/index.css";

const packageUrl = "https://npmjs.com/package/react-generic-table";

const App = () => {

  useEffect(() => {
    hljs.registerLanguage("html", html);
    hljs.highlightAll();
    }, []);

  return (
    <div className="App">
      <header className={styles.header}>
        <div>
          <img src={logo} alt="logo" />
        </div>

        <div>
          <p className={styles.title}>React Generic Table Example</p>
        </div>

        <div className={styles.linkContainer}>
          <a
            className={`${utilStyles.link} text-neutral-100`}
            href={packageUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            react-generic-table on NPM
          </a>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <p>
            Simple feed data and indicate what columns you want to display!
            {/*  Nice explanation with emojis */}
            <span role="img" aria-label="smile">
              😄
            </span>
          </p>
          <ul>
            <li>⚙️ Configurable</li>
            <li>🔀 Out-of-the-box sorting</li>
            <li>🔄 Loading states</li>
            <li></li>
          </ul>
          <pre>
            <code>
              {`
              <GenericTable
                objArray={[
                  { id: 1, name: "J.W.", age: "25", profession: "Developer" },
                  { id: 2, name: "Lea", age: "22", profession: "Journalist" },
                ]}
                columns={["name", "age", "profession"]}
              />
              `}
            </code>
          </pre>
          <div className={styles.container}>
            <GenericTable
              objArray={[
                { id: 1, name: "J.W.", age: "25", profession: "Developer" },
                { id: 2, name: "Lea", age: "22", profession: "Journalist" },
              ]}
              columns={["name", "age", "profession"]}
            />
          </div>
        </div>
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
