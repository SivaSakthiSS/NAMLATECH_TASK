import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import HotelDetail from "./components/HotelDetail";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />

        <Route path="/hotels/:hotelId" element = {<HotelDetail/>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;