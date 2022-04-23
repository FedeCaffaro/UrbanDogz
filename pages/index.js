import Navbar from "../components/Navbar";
import NFTs from "../components/NFTs";
import { ToastContainer } from 'react-toastify';

export default function Home() {
	return (
		<div className="flex">
			<Navbar />
			<NFTs />
			<ToastContainer position="bottom-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
		</div>
	);
}
