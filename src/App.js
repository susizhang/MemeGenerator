import "./App.css";
import { Meme } from "./components/Meme";

export function App() {
  return (
    <div className="container">
      <h1>React Meme Generator</h1>
      <Meme />
    </div>
  );
}
