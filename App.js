import './App.css';
import Grid from './sudoku';



function App() {
  const title = "Sudoku Solver"

  return (
    <div className="App">
      
      <div className="content">
            <h1> {title} </h1>
      </div>
      <Grid />    
    </div>
  );
}



export default App;
