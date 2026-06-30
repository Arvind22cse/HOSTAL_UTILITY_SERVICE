import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? <FiSun /> : <FiMoon />}
    </button>
  );
};

export default ThemeToggle;
