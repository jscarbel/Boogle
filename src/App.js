import "./App.css";
import BoardContainer from "./components/BoardContainer";
import { OrangeBackground } from "./components/OrangeBackground";

function App() {
  return (
    <>
      <OrangeBackground />
      <div className="App">
        <BoardContainer />
      </div>
    </>
  );
}

export default App;
