import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

// Footer component
export const Footer = () => (
	<footer className="bg-amber-950 text-amber-50 py-8 font-lato">
		<div className="container mx-auto px-4 text-center">
			<p className="mb-6 text-lg">La Maison Cozy © 2025</p>
			<div className="flex justify-center space-x-8">
				<a
					href="#"
					className="hover:text-amber-300 transition-colors duration-300"
					aria-label="Facebook">
					<FaFacebook size={24} />
				</a>
				<a
					href="#"
					className="hover:text-amber-300 transition-colors duration-300"
					aria-label="Instagram">
					<FaInstagram size={24} />
				</a>
				<a
					href="#"
					className="hover:text-amber-300 transition-colors duration-300"
					aria-label="Twitter">
					<FaTwitter size={24} />
				</a>
			</div>
		</div>
	</footer>
);
