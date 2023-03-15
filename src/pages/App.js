import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components'
import Header from '../components/atom/Header'
import Main from './Main';
import NotFound from './NotFound';

const GlobalStyle = createGlobalStyle`
	:root {
		--primary: #FFCC00;
    --black: #222222;
		--navy: #0A285F;
		--gray: #d0d0d0;
	}
`

function App() {
  return (
    <div className="App">
			<GlobalStyle />
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
