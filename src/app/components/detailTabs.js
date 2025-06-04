"use client";

import { useRef, useState, useEffect } from "react";
import styles from "@/app/styles/crdsvr.module.css";
import sty from "@/app/styles/dtlsvr.module.css";
import { AiOutlinePaperClip } from "react-icons/ai";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { Tooltip } from "flowbite-react";

const Tab = ({ contents }) => {
  const textareaRef = useRef(null);
  const [copyMessage, setCopyMessage] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [outputText, setOutputText] = useState(
    "Select a tab to see content here..."
  );

  const handleCopyClick = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(outputText);
        setCopyMessage("Copied to clipboard!");
      } else {
        const tempTextarea = document.createElement("textarea");
        tempTextarea.value = outputText;
        tempTextarea.style.position = "absolute";
        tempTextarea.style.left = "-9999px";
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        tempTextarea.setSelectionRange(0, tempTextarea.value.length);
        document.execCommand("copy");
        document.body.removeChild(tempTextarea);
        setCopyMessage("Copied to clipboard (fallback)!");
      }

      setIsCopied(true);

      setTimeout(() => {
        setIsCopied("");
      }, 4000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setCopyMessage("Failed to copy text.");
    }
  };

  const promp = contents && contents.length > 0 ? contents[0] : {};

  // const tabs = contents;
  const interfacetab = [
    { id: 1, tabN: "Prompt", content: "This is content for Tab 1" },
    { id: 2, tabN: "Output", content: "This is the content for Tab 2" },
    { id: 3, tabN: "Readme", content: "This is the content for Tab 3" },
    {
      id: 4,
      tabN: "Engine",
      content: "This is the content for Tab 4.",
    },
  ];
  const tabs = interfacetab.map((tab) => ({
    ...tab,
    content:
      tab.tabN === "Output"
        ? promp.content || "No Output Content Available"
        : tab.tabN === "Readme"
        ? promp.Description || "No Readme Content Available"
        : tab.tabN === "Engine"
        ? promp.engine || "No Engine Info Available"
        : tab.content,
  }));
  useEffect(() => {
    if (tabs.length > 0) {
      setActiveTab(tabs[0].id);
      setOutputText(tabs[0].content);
    } else {
      setOutputText("No content available for tabs.");
    }
  }, []);

  const handleTabClick = (tabId, tabContent) => {
    setActiveTab(tabId);
    setOutputText(tabContent);
  };

  return (
    <>
      <div className="grid grid-cols-auto-fill-minmax-300px-1fr gap-4 mt-24 px-8 ml-18 min-w-[800px] mb-4">
        <div className="relative justify-center items-center h-fit">
          {contents.map((cont) => (
            <h1
              key={cont.id}
              className="h-12 flex justify-center text-2xl font-bold text-gray-800"
            >
              {cont.title}
            </h1>
          ))}

          {/* Tabs Navigation */}
          <div className="mb-4 z-30 flex justify-around">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id, tab.content)}
                className={`z-30 w-50 py-0 px-2 font-bold text-sm focus:outline-none transition-all ease-in-out border-2 rounded-md cursor-pointer text-slate-600 bg-inherit ${
                  activeTab === tab.id
                    ? "border-b-4 border-r-4 border-blue-500 text-blue-600 "
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300 "
                }`}
              >
                {tab.tabN}
              </button>
            ))}
          </div>
          <br></br>
          {/* Output Textarea */}
          <div className="mb-4">
            <div className="flex justify-between border-8 border-white dark:border-b-blue-950">
              {contents.map((cont) => (
                <label key={cont.id} htmlFor="output">
                  Prompt which develop with {cont.engine}
                </label>
              ))}
              <Tooltip
                placement="bottom"
                content="Copy Prompt"
                className={sty.tooltip}
              >
                <button
                  onClick={handleCopyClick}
                  className="rounded-md p-2 px-2.5 inline-flex gap-1.5 items-center justify-center h-8 w-25"
                  style={{ backgroundColor: "royalblue" }}
                >
                  {isCopied ? (
                    <IoCheckmarkDoneSharp className="text-amber-300 dark:text-amber-200 text-xl" />
                  ) : (
                    <AiOutlinePaperClip className="text-white text-xl" />
                  )}
                  {isCopied ? (
                    <span className="inline-flex items-center">
                      <span className="text-l font-semibold text-amber-300 dark:text-amber-200">
                        Copied!
                      </span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center">
                      <span className="text-l font-semibold text-white">
                        Copy
                      </span>
                    </span>
                  )}
                </button>
              </Tooltip>
            </div>
            <textarea
              id="output"
              rows="12"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={outputText} // This textarea displays the outputText
              readOnly
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Tab;
