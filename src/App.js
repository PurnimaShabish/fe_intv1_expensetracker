// import logo from './logo.svg';
import './App.css';
import { SnackbarProvider} from 'notistack';
import ReactModal from 'react-modal';
import ExpenseTracker from "./components/ExpenseTracker";

ReactModal.setAppElement('#root');

function App() {
  return (
    <SnackbarProvider>
      <div className="App">
        <ExpenseTracker />
      </div>
    </SnackbarProvider>
  );
}

export default App;
