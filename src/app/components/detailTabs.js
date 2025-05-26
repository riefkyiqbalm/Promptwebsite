// components/TabsComponent.jsx
"use client"; // Required for client-side interactivity in Next.js 13+

import { useState, useEffect } from "react";

const Tab = ({ contents }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [outputText, setOutputText] = useState(
    "Select a tab to see content here..."
  );
  console.log(contents);

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
  const promp = contents[0];
  const tabs = interfacetab.map((tab) => ({
    ...tab,
    content:
      tab.tabN === "Output"
        ? promp.content
        : tab.tabN === "Readme"
        ? promp.Description
        : tab.tabN === "Engine"
        ? promp.engine
        : tab.content,
  }));

  useEffect(() => {
    // Ensure the first tab is active when the component mounts
    if (tabs.length > 0) {
      setActiveTab(tabs[0].id);
    }
  }, []);

  const handleTabClick = (tabId, tabContent) => {
    setActiveTab(tabId);
    setOutputText(tabContent);
  };

  return (
    <div className="ml-8 relative justify-center w-250 border h-fit">
      {contents.map((cont) => (
        <h1
          key={cont.id}
          className="h-12 flex justify-center text-2xl font-bold text-gray-800"
        >
          {cont.title}
        </h1>
      ))}

      {/* Tabs Navigation */}
      <div className="z-30 flex justify-around">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id, tab.content)}
            className={`z-30 w-40 rounded py-0 px-2 font-bold text-sm focus:outline-none transition-all ease-in-out border-2 rounded-md cursor-pointer text-slate-600 bg-inherit ${
              activeTab === tab.id
                ? "border-b-4 border-r-4 border-blue-500 text-blue-600 "
                : "text-gray-500 hover:text-gray-700 hover:border-gray-300 "
            }`}
          >
            {tab.tabN}
          </button>
        ))}
      </div>

      {/* Output Textarea */}
      <div className="mb-4">
        <label
          htmlFor="output"
          className="mt-10 block text-sm font-medium text-gray-700 h-10"
        >
          Output
        </label>
        <textarea
          id="output"
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={outputText}
          readOnly
        />
      </div>
    </div>
  );
};

export default Tab;

{
  /* <div class="w-full">
  <div class="relative right-0">
    <ul
      class="relative flex flex-wrap px-1.5 py-1.5 list-none rounded-md bg-slate-100"
      data-tabs="tabs"
      role="list"
    >
      <li class="z-30 flex-auto text-center">
        <a
          class="z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer text-slate-600 bg-inherit"
          data-tab-target=""
          role="tab"
          aria-selected="true"
          aria-controls="dashboard"
        >
          Dashboard
        </a>
      </li>
      <li class="z-30 flex-auto text-center">
        <a
          class="z-30 flex items-center justify-center w-full px-0 py-2 mb-0 text-sm transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-600 bg-inherit"
          data-tab-target=""
          role="tab"
          aria-selected="false"
          aria-controls="profile"
        >
          Profile
        </a>
      </li>
      <li class="z-30 flex-auto text-center">
        <a
          class="z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit"
          data-tab-target=""
          role="tab"
          aria-selected="false"
          aria-controls="settings"
        >
          Settings
        </a>
      </li>
    </ul>

    <div data-tab-content="" class="p-5">
      <div id="dashboard" role="tabpanel">
        <p class="text-slate-400 font-light">
          Because it&apos;s about motivating the doers. Because I&apos;m here to
          follow my dreams and inspire other people to follow their dreams, too.
        </p>
      </div>
      <div class="hidden opacity-0" id="profile" role="tabpanel">
        <p class="text-slate-400 font-light">
          The reading of all good books is like a conversation with the finest
          minds of past centuries.
        </p>
      </div>
      <div class="hidden opacity-0" id="settings" role="tabpanel">
        <p class="text-slate-400 font-light">
          Comparing yourself to others is the thief of joy.
        </p>
      </div>
    </div>
  </div>
</div>; */
}
