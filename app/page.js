"use client";

import React, { useEffect, useCallback } from "react";
import { Footer } from "./components/Footer";
import { useState } from "react";
import {
	Menu,
	X,
	Home,
	Clock,
	Phone,
	MapPin,
	ChevronRight,
	ChevronLeft,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
	Navigation,
	Pagination,
	EffectCoverflow,
	Mousewheel,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

// Add this function at the top level
const useScrollAnimation = () => {
	useEffect(() => {
		const observerCallback = (entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("fade-in");
				}
			});
		};

		const observer = new IntersectionObserver(observerCallback, {
			threshold: 0.1,
		});

		document.querySelectorAll(".animate-on-scroll").forEach((element) => {
			observer.observe(element);
		});

		return () => observer.disconnect();
	}, []);
};

// Add scroll animation hook
const useParallaxElements = () => {
	useEffect(() => {
		const handleScroll = () => {
			const elements = document.querySelectorAll(".parallax");
			elements.forEach((el) => {
				const rect = el.getBoundingClientRect();
				const scrolled = window.pageYOffset;
				const rate = el.dataset.rate || 0.3;
				el.style.setProperty("--scroll-offset", `${scrolled * rate}px`);
			});
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
};

// Keep only this Navigation component and remove the duplicate one

// Update HomeHero with parallax effect
const HomeHero = () => {
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY * 0.5);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="relative min-h-screen flex items-center justify-center">
			<div
				className="absolute inset-0 bg-[url('/homehero.jpeg')] bg-cover bg-center"
				style={{
					transform: `translateY(${scrollY}px)`,
					filter: "brightness(0.65)",
				}}
			/>
			<div className="relative text-center text-white z-10 px-4">
				<h1 className="text-7xl font-playfair mb-6 split-text">
					{["Welcome", "to", "La", "Maison", "Cozy"].map((word, i) => (
						<span
							key={i}
							style={{ animationDelay: `${i * 0.1}s` }}
							className="inline-block mx-1">
							{word}
						</span>
					))}
				</h1>
				<p className="text-2xl font-lato font-light mb-12 reveal-line">
					Experience comfort food at its finest
				</p>
				<a
					href="#menu"
					className="bg-amber-800/90 px-10 py-4 rounded-lg hover:bg-amber-700 
          transition-all duration-300 hover:shadow-2xl hover:scale-105 inline-block">
					Explore Our Menu
				</a>
			</div>
			<div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
				<div className="float text-white">
					<svg
						className="w-6 h-6 animate-bounce"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M19 14l-7 7m0 0l-7-7m7 7V3"
						/>
					</svg>
				</div>
			</div>
		</div>
	);
};

export const Navigate = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const closeMenu = useCallback(() => {
		setIsOpen(false);
	}, []);

	// Close menu on route change or escape key
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === "Escape") closeMenu();
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [closeMenu]);

	return (
		<>
			<nav
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 backdrop-blur-sm
		${
			scrolled
				? "bg-amber-900/95 shadow-2xl shadow-amber-950/20"
				: "bg-gradient-to-b from-black/50 to-transparent"
		}`}>
				<div className="container mx-auto flex justify-between items-center py-6">
					<a
						href="/"
						className="text-3xl font-playfair text-amber-50 hover:text-amber-200 transition-colors">
						La Maison Cozy
					</a>

					{/* Desktop Navigation */}
					<div className="hidden md:block">
						<ul className="flex space-x-12">
							{[
								{ name: "Home", path: "/" },
								{ name: "Menu", path: "/menu" },
								{ name: "About", path: "/#about" },
								{ name: "Contact", path: "/#contact" },
							].map((item) => (
								<li key={item.name}>
									<a
										href={item.path}
										className="nav-link text-amber-50 hover:text-amber-200 transition-colors py-2 text-lg tracking-wide font-lato">
										{item.name}
									</a>
								</li>
							))}
						</ul>
					</div>

					<button
						className="md:hidden z-50 text-amber-50 hover:text-amber-200 transition-colors"
						onClick={() => setIsOpen(!isOpen)}>
						{isOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</nav>

			{/* Mobile Sidebar */}
			<div
				className={`fixed inset-0 bg-black/50 z-40 overlay ${
					isOpen ? "open" : ""
				}`}
				onClick={closeMenu}
			/>
			<div
				className={`fixed top-0 left-0 h-full w-72 bg-amber-900 z-50 sidebar ${
					isOpen ? "open" : ""
				}`}>
				<div className="p-6">
					<h2 className="text-2xl font-serif text-amber-50 mb-8">Menu</h2>
					<ul className="space-y-6">
						{[
							{ name: "Home", path: "/" },
							{ name: "Menu", path: "/menu" },
							{ name: "About", path: "/#about" },
							{ name: "Contact", path: "/#contact" },
						].map((item) => (
							<li key={item.name}>
								<a
									href={item.path}
									onClick={closeMenu}
									className="flex items-center text-amber-50 hover:text-amber-200 transition-colors group">
									<span className="text-lg">{item.name}</span>
									<ChevronRight
										className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
										size={16}
									/>
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

// Add this hook before the MenuSection component
const useImagePreloader = (imageUrls) => {
	useEffect(() => {
		imageUrls.forEach((imageUrl) => {
			const img = new Image();
			img.src = imageUrl;
		});
	}, [imageUrls]);
};

// Update MenuSection with enhanced cards and carousel
const MenuSection = () => {
	const menuItems = [
		{
			name: "Coq au Vin",
			price: "$28",
			description: "Classic French chicken braised in wine",
			image: "/menu1.jpeg",
		},
		{
			name: "Beef Bourguignon",
			price: "$32",
			description: "Tender beef stewed in red wine",
			image: "/menu2.jpeg",
		},
		{
			name: "Ratatouille",
			price: "$24",
			description: "Traditional Provençal vegetable dish",
			image: "/menu3.jpeg",
		},
		{
			name: "French Onion Soup",
			price: "$18",
			description: "Rich broth with caramelized onions and melted Gruyère",
			image: "/menu4.jpeg",
		},
		{
			name: "Duck Confit",
			price: "$34",
			description: "Slow-cooked duck leg with crispy skin",
			image: "/menu5.jpeg",
		},
		{
			name: "Escargots de Bourgogne",
			price: "$26",
			description: "Burgundy snails in garlic herb butter",
			image: "/menu6.jpeg",
		},
		{
			name: "Trout Amandine",
			price: "$30",
			description: "Pan-seared trout with toasted almonds",
			image: "/menu7.jpeg",
		},
		{
			name: "Cassoulet",
			price: "$29",
			description: "Traditional French bean stew with meat",
			image: "/menu8.jpeg",
		},
		{
			name: "Quiche Lorraine",
			price: "$22",
			description: "Classic bacon and cheese tart",
			image: "/menu9.jpeg",
		},
	];

	// Add this at the start of the component
	useImagePreloader(menuItems.map((item) => item.image));

	const handleDishClick = (dishName) => {
		// Convert dish name to URL-friendly format
		const slug = dishName.toLowerCase().replace(/ /g, "-");
		window.location.href = `/menu/${slug}`;
	};

	return (
		<section
			id="menu"
			className="py-32 bg-amber-50 relative z-10">
			<div className="container mx-auto px-4">
				<h2 className="text-5xl font-playfair text-center mb-16 text-amber-900">
					<span className="relative inline-block">Our Menu</span>
				</h2>

				<div className="relative px-1 py-10">
					<Swiper
						modules={[Navigation, Pagination, EffectCoverflow, Mousewheel]}
						spaceBetween={30}
						slidesPerView={1}
						navigation
						pagination={{ clickable: true }}
						effect="coverflow"
						loop={true}
						mousewheel={{
							forceToAxis: true,
							sensitivity: 1,
							releaseOnEdges: true,
						}}
						coverflowEffect={{
							rotate: 30,
							stretch: 0,
							depth: 100,
							modifier: 1,
							slideShadows: false,
						}}
						breakpoints={{
							768: {
								slidesPerView: 2,
							},
							1024: {
								slidesPerView: 3,
							},
						}}
						className="menu-swiper !py-20 !px-4" // Increased vertical padding
						grabCursor={true}
						allowTouchMove={true}
						touchEventsTarget="wrapper">
						{menuItems.map((item) => (
							<SwiperSlide
								key={item.name}
								className="!h-auto pb-12">
								{" "}
								{/* Added height auto and bottom padding */}
								<div
									onClick={() => handleDishClick(item.name)}
									className="card-hover bg-white rounded-xl shadow-lg overflow-hidden animate-on-scroll 
												transform hover:scale-105 transition-all duration-300 cursor-pointer h-full">
									{" "}
									{/* Added h-full */}
									<div className="relative h-64 overflow-hidden group">
										{" "}
										{/* Reduced height from h-64 to h-48 */}
										<img
											src={item.image}
											alt={item.name}
											className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
										/>
										<div
											className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent 
															opacity-0 group-hover:opacity-100 transition-opacity"
										/>
										<div
											className="absolute inset-0 flex items-center justify-center opacity-0 
															group-hover:opacity-100 transition-opacity">
											<span className="bg-amber-800/90 text-white px-4 py-2 rounded-lg">
												View Details
											</span>
										</div>
									</div>
									<div className="p-4">
										{" "}
										{/* Reduced padding from p-6 to p-4 */}
										<h3 className="text-xl font-playfair mb-2 text-amber-900">
											{item.name}
										</h3>
										<p className="font-lato text-sm text-amber-800 mb-2">
											{item.description}
										</p>{" "}
										{/* Reduced text size and margin */}
										<p className="font-lato font-bold text-lg text-amber-900">
											{item.price}
										</p>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</section>
	);
};

// Update AboutSection and ContactSection with animation classes
const AboutSection = () => (
	<section
		id="about"
		className="py-32 bg-white relative overflow-hidden">
		<div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5"></div>
		<div className="container mx-auto px-4 relative">
			<div className="max-w-4xl mx-auto">
				<div className="text-center animate-on-scroll mb-16">
					<h2 className="text-5xl font-playfair mb-8 text-amber-900">
						Our Story
					</h2>
					<div className="w-24 h-1 bg-amber-800 mx-auto mb-8"></div>
					<p className="text-amber-800 mb-12 text-xl leading-relaxed font-lato">
						Founded in 2020, La Maison Cozy brings the warmth of home-cooking to
						your dining experience. Our chefs combine traditional techniques
						with modern creativity to serve dishes that comfort the soul.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8 mt-16">
					<div className="text-center p-8 bg-gradient-to-b from-amber-50 to-amber-100 rounded-2xl shadow-lg transform hover:-translate-y-1 transition-all duration-300">
						<Clock
							className="mx-auto text-amber-800 mb-6"
							size={40}
						/>
						<h3 className="font-playfair text-xl text-amber-900 mb-3">
							Open Daily
						</h3>
						<p className="text-amber-800">11 AM - 10 PM</p>
					</div>
					<div className="text-center p-8 bg-gradient-to-b from-amber-50 to-amber-100 rounded-2xl shadow-lg transform hover:-translate-y-1 transition-all duration-300">
						<MapPin
							className="mx-auto text-amber-800 mb-6"
							size={40}
						/>
						<h3 className="font-playfair text-xl text-amber-900 mb-3">
							Location
						</h3>
						<p className="text-amber-800">123 Cozy Street</p>
					</div>
					<div className="text-center p-8 bg-gradient-to-b from-amber-50 to-amber-100 rounded-2xl shadow-lg transform hover:-translate-y-1 transition-all duration-300">
						<Phone
							className="mx-auto text-amber-800 mb-6"
							size={40}
						/>
						<h3 className="font-playfair text-xl text-amber-900 mb-3">
							Reservations
						</h3>
						<p className="text-amber-800">(555) 123-4567</p>
					</div>
				</div>
			</div>
		</div>
	</section>
);

const ContactSection = () => (
	<section
		id="contact"
		className="py-32 bg-gradient-to-b from-amber-50 to-amber-100">
		<div className="container mx-auto px-4">
			<div className="max-w-4xl mx-auto">
				<div className="text-center animate-on-scroll mb-16">
					<h2 className="text-5xl font-playfair mb-8 text-amber-900">
						Contact Us
					</h2>
					<div className="w-24 h-1 bg-amber-800 mx-auto mb-8"></div>
					<p className="text-xl text-amber-800 mb-12">
						We'd love to hear from you
					</p>
				</div>
				<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 hover:shadow-2xl transition-shadow duration-300">
					<form className="grid md:grid-cols-2 gap-8">
						<div className="space-y-6">
							{[
								{ name: "Name", type: "text", icon: "👤" },
								{ name: "Email", type: "email", icon: "✉️" },
								{ name: "Phone", type: "tel", icon: "📞" },
							].map((field) => (
								<div
									key={field.name}
									className="relative group">
									<label className="block text-amber-900 font-medium mb-2 text-lg">
										{field.icon} {field.name}
									</label>
									<input
										type={field.type}
										className="w-full p-4 border-2 border-amber-200 rounded-lg 
                    focus:ring-2 focus:ring-amber-600 focus:border-transparent
                    bg-white/90 transition-all duration-300
                    group-hover:border-amber-400 text-lg
                    shadow-sm hover:shadow-md"
										placeholder={`Enter your ${field.name.toLowerCase()}...`}
									/>
								</div>
							))}
						</div>
						<div>
							<div className="relative group h-full">
								<label className="block text-amber-900 font-medium mb-2 text-lg">
									💭 Message
								</label>
								<textarea
									className="w-full p-4 border-2 border-amber-200 rounded-lg 
                  focus:ring-2 focus:ring-amber-600 focus:border-transparent
                  bg-white/90 transition-all duration-300
                  group-hover:border-amber-400 text-lg
                  shadow-sm hover:shadow-md
                  h-[calc(100%-2rem)] resize-none"
									placeholder="Enter your message..."
								/>
							</div>
						</div>
						<div className="md:col-span-2 text-center">
							<button
								type="submit"
								className="bg-amber-800 text-white px-12 py-4 rounded-lg text-lg font-medium
                hover:bg-amber-900 transition-all duration-300 transform hover:scale-[1.02] 
                active:scale-[0.98] shadow-lg hover:shadow-xl
                relative overflow-hidden group">
								<span className="relative z-10">Send Message</span>
								<div className="absolute inset-0 bg-amber-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
);

// Update RestaurantWebsite to use animation hook
const RestaurantWebsite = () => {
	useScrollAnimation();
	useParallaxElements();

	return (
		<div className="min-h-screen">
			<Navigate />
			<main>
				<HomeHero />
				<MenuSection />
				<AboutSection />
				<ContactSection />
			</main>
			<Footer />
		</div>
	);
};

export default RestaurantWebsite;
