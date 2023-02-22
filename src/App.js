import { DemoFirst } from './components/demo';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UpdateCard from './components/board_card/update_card';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<DemoFirst />}/>
        </Routes>
        <Routes>
          <Route path='/update' element={<UpdateCard/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
