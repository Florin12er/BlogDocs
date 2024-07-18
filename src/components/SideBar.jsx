import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const elements = [
  { id: 1, name: "Getting Started", path: "/getting-started", depth: 0 },
  {
    id: 2,
    name: "Setup",
    path: "/getting-started/setup",
    depth: 1,
    parent: "Getting Started",
  },
  {
    id: 3,
    name: "apikey",
    path: "/getting-started/apikey",
    depth: 1,
    parent: "Getting Started",
  },
  { id: 4, name: "Config", path: "/config", depth: 0 },
  { id: 5, name: "node", path: "/config/node", depth: 1, parent: "Config" },
  { id: 6, name: "Element 3", path: "/element-3", depth: 0 },
];

export function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  // Extract current pathname for active route determination
  const currentPath = location.pathname;

  const handleElementSelected = (element) => {
    setSelected(element);
    navigate(element.path);
  };

  // Filter elements based on search query
  const filteredElements =
    query === ""
      ? elements
      : elements.filter((element) =>
          element.name.toLowerCase().includes(query.toLowerCase()),
        );

  // Filter main elements and immediate children based on currently selected main element
  const filteredMainElements = elements.filter(
    (element) =>
      element.depth === 0 || // Only main elements (depth 0)
      (element.depth === 1 && selected && selected.name === element.parent), // Include child elements of the currently selected main element
  );

  return (
    <div className="flex flex-col w-64 bg-gray-50 h-screen border-r border-gray-200">
      {/* Search Input */}
      <div className="relative z-10 w-full px-4 py-2">
        <Combobox
          value={selected}
          onChange={(value) => {
            setSelected(value);
            handleElementSelected(value);
          }}
          onClose={() => setQuery("")}
        >
          <div className="relative">
            <ComboboxInput
              autoComplete="off"
              className={clsx(
                "w-full rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm leading-5 text-gray-900",
                "focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
              )}
              displayValue={(element) => element?.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            </ComboboxButton>
          </div>

          {/* Combobox Options */}
          <ComboboxOptions className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredElements.map((element) => (
              <ComboboxOption
                key={element.id}
                value={element}
                className={clsx(
                  "relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900",
                  element === selected ? "bg-blue-600 text-white" : "",
                )}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {element.name}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                        <CheckIcon className="h-5 w-5" />
                      </span>
                    )}
                  </>
                )}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </Combobox>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col space-y-2 px-4 pt-2">
        {filteredMainElements.map((element, index) => {
          const isActive = currentPath.startsWith(element.path);

          return (
            <Link
              key={element.id}
              to={element.path}
              className={clsx(
                "block px-3 py-2 rounded-md text-base font-medium",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-900 hover:bg-gray-100",
                index > 0 &&
                  filteredMainElements[index - 1].depth < element.depth &&
                  !isActive
                  ? "ml-2 border-l-2 pl-2"
                  : "", // Add border and indent for child elements
              )}
              onClick={() => setSelected(element)}
            >
              {element.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default SideBar;
