"use client";

import React, { useState } from "react";
import { Navigate } from "@/app/page";
import { Footer } from "@/app/components/Footer";
import { menuItems, dietaryIcons } from "./[slug]/page";
import { Filter, ChevronDown, Home } from "lucide-react";

export default function MenuPage() {
	const [activeFilter, setActiveFilter] = useState("all");
	const [showFilters, setShowFilters] = useState(false);

	const categories = [
		{ id: "all", label: "All Dishes" },
		{ id: "vegetarian", label: "Vegetarian" },
		{ id: "glutenFree", label: "Gluten Free" },
		{ id: "dairyFree", label: "Dairy Free" },
	];

	const filteredItems = menuItems.filter((item) => {
		if (activeFilter === "all") return true;
		return item.dietary[activeFilter];
	});

	const handleDishClick = (dishName) => {
		const slug = dishName.toLowerCase().replace(/ /g, "-");
		window.location.href = `/menu/${slug}`;
	};

	return (
		<div className="min-h-screen bg-amber-50">
			<Navigate />
			{/* Hero Section - updated */}
			<div className="relative h-[80vh] bg-amber-900">
				<div className="absolute inset-0">
					<img
						src="/menu_hero.jpeg"
						alt="French cuisine"
						className="w-full h-full object-cover opacity-40"
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
				</div>
				<div className="relative h-full flex flex-col items-center justify-center text-center px-4 animate-fade-in pt-16">
					<h1 className="text-5xl md:text-7xl font-playfair text-white mb-8 tracking-wide">
						Our Menu
					</h1>
					<p className="text-xl md:text-2xl text-amber-200 max-w-2xl mx-auto font-light leading-relaxed">
						A culinary journey through French classics,
						<br />
						crafted with passion and tradition
					</p>
				</div>
			</div>

			{/* Filters Section - updated */}
			<div className="sticky top-0 z-20 bg-amber-900/95 backdrop-blur-sm shadow-lg shadow-amber-900/10">
				<div className="container mx-auto px-4 py-4">
					<div className="flex flex-col md:flex-row items-center justify-between gap-4">
						<div className="flex items-center space-x-4">
							<a
								href="/"
								className="text-amber-50 hover:text-amber-200 transition-colors">
								<Home size={20} />
							</a>
							<span className="text-amber-50/50">/</span>
							<span className="text-amber-50">Menu</span>
						</div>

						<div
							className={`${
								showFilters ? "flex" : "hidden"
							} md:flex flex-wrap gap-3 justify-center md:justify-end w-full md:w-auto`}>
							{categories.map((category) => (
								<button
									key={category.id}
									onClick={() => setActiveFilter(category.id)}
									className={`px-6 py-2 rounded-full transition-all duration-300 ${
										activeFilter === category.id
											? "bg-amber-800 text-amber-50 shadow-lg scale-105"
											: "text-amber-50 hover:bg-amber-800/50"
									} min-w-[120px]`}>
									{category.label}
								</button>
							))}
						</div>

						<button
							onClick={() => setShowFilters(!showFilters)}
							className="md:hidden flex items-center gap-2 text-amber-50 hover:text-amber-200 bg-amber-800/50 px-4 py-2 rounded-lg">
							<Filter size={20} />
							<span>Filters</span>
							<ChevronDown
								size={16}
								className={`transform transition-transform ${
									showFilters ? "rotate-180" : ""
								}`}
							/>
						</button>
					</div>
				</div>
			</div>
			{/* Enhanced Menu Grid */}
			<div className="container mx-auto px-4 py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{filteredItems.map((item) => (
						<div
							key={item.name}
							onClick={() => handleDishClick(item.name)}
							className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
							<div className="relative h-64 overflow-hidden">
								<img
									src={item.image}
									alt={item.name}
									className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								<div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
									<p className="text-sm opacity-90">
										{item.longDescription?.substring(0, 100)}...
									</p>
								</div>
							</div>

							<div className="p-6">
								<div className="flex justify-between items-start mb-3">
									<h3 className="text-xl font-playfair text-amber-900 group-hover:text-amber-700 transition-colors">
										{item.name}
									</h3>
									<span className="text-lg font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full">
										{item.price}
									</span>
								</div>
								<p className="text-amber-700 mb-4 line-clamp-2">
									{item.description}
								</p>

								<div className="flex items-center justify-between">
									<div className="flex gap-2">
										{Object.entries(item.dietary)
											.filter(([_, value]) => value)
											.map(([key]) => (
												<div
													key={key}
													className="text-amber-600 hover:text-amber-800 transition-colors"
													title={key.replace(/([A-Z])/g, " $1").trim()}>
													{dietaryIcons[key]}
												</div>
											))}
									</div>
									<span className="text-amber-600 text-sm">
										{item.calories} cal
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<Footer />
		</div>
	);
}
