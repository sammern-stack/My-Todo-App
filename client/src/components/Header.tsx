import { useThemeStore } from "../stores/useThemeStore";
import { IoMoon, IoSunny } from "react-icons/io5";
import "../App.scss";

export default function Header() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  return (
    <header className="todo__header">
      <h1 className="todo__title">Todo</h1>
      <div className="todo__theme-switch" onClick={toggleTheme}>
        {theme === "dark" ? <IoSunny /> : <IoMoon />}
      </div>
    </header>
  );
}
