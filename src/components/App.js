import '../App.css';
import Weather from './Weather';

function App() {
  const today = new Date();    
  const options = {
        weekday: "long",
        day: "numeric",
        month: "long"        
  };
  const day = today.toLocaleDateString("PT-BR", options);   
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tempo Agora</h1>
        <nav>{day}</nav>
      </header>
      
      <main>
        <Weather />
      </main>
      <footer>
        <p>Developed by <span><em>Ana Carolina Coelho Mendes</em></span> </p>
               
      </footer>
    </div>
  );
}

export default App;
