import "./App.css";
import { useEffect } from "react";
import { useTelegram } from "./hook/useTelegram";
import Header from "./component/Header/Header";
import { Route, Routes } from "react-router-dom";
import ProductList from "./component/ProductList/ProductList";
import Form from "./component/Form/Form";

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<ProductList />} />
        <Route path={"form"} element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
