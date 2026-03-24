import { useEffect, useState } from "react";
import { IoMoonOutline } from "react-icons/io5";
import { GoSun } from "react-icons/go";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 text-gray-600 dark:text-white hover:text-blue-500 transition"
      title="Toggle Theme"
    >
      {darkMode ? <GoSun size={20} /> : <IoMoonOutline size={20} />}
    </button>
  );
};

export default DarkModeToggle;
