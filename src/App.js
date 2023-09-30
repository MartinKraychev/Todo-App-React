import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Main } from "./components/Main";


function App() {
    return (
        <div>
            <Header>Todo List</Header>
            <Main title="Todo List" buttonText= "+ Add new Todo" spinnerText = "Loading..."/>
            <Footer />
        </div>
    );
}

export default App;
