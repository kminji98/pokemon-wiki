import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header'
import Main from './Main';
import NotFound from './NotFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Main />}></Route>
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</BrowserRouter>
    </div>
  );
}

export default App;
