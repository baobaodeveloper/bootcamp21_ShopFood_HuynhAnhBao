import "antd/dist/antd.css";
import FoodList from "./components/FoodList";
import Forms from "./components/Forms";
function App() {
  return (
    <div className="container">
      <Forms />
      <FoodList />
    </div>
  );
}

export default App;
