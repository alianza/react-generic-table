import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import utilStyles from "../utils.module.scss";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function LiveProviderBlock({ scope, code = "" }) {
  const [codeState, setCodeState] = useState(code);

  useEffect(() => {
    setCodeState(code);
  }, [code]);

  const resetCode = () => setCodeState(code);

  return (
    <div className="flex flex-col items-center gap-12 overflow-y-hidden py-4">
      <LiveProvider scope={scope} code={codeState}>
        <div className="relative">
          <LiveEditor className={utilStyles.codeEditor} onChange={setCodeState} />
          {codeState !== code && (
            <button className="absolute right-2 top-2">
              <ArrowPathIcon className={`w-8 ${utilStyles.hoverEffect}`} title="Reset code" onClick={resetCode} />
            </button>
          )}
        </div>
        <LiveError />
        <LivePreview className="drop-shadow-xl" />
      </LiveProvider>
    </div>
  );
}
