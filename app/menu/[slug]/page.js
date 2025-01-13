"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Navigate } from "@/app/page";
import { Footer } from "@/app/components/Footer";

// Add dietary icons object
export const dietaryIcons = {
	vegetarian: (
		<svg
			className="w-5 h-5"
			viewBox="0 0 64 64"
			fill="currentColor">
			<path d="M48.68,38.71c8.06-8.06,10-34.59,10-34.59A40.94,40.94,0,0,1,44.41,7.73C36.16,8.43,28.52,9.6,24,14.08,17.13,21,15.4,30.82,19.34,37.77,23.66,31,41.47,21.29,41.47,21.29,28.69,30.43,14,47.78,13.41,50s3.64,2.3,4.3,1.15,3.2-5.78,6-8.57C30.68,47.53,41.33,46.07,48.68,38.71Z" />
		</svg>
	),
	glutenFree: (
		<svg
			className="w-5 h-5"
			viewBox="0 0 470 470"
			fill="currentColor">
			<path d="M495.271,91.194c-6.567,19.274-13.559,38.642-21.21,58.025l-29.43-11.618   c3.666-9.296,7.194-18.622,10.596-27.947c3.15-8.615,3.25-17.94,0.338-26.064c-4.223-11.78-8.652-23.376-13.127-34.928   l17.39-44.268L448.656,0l-16.175,41.169c-11.816,7.596-23.672,15.039-35.572,22.21c-7.212,4.336-12.779,11.186-15.731,19.258   c-3.19,8.747-6.476,17.427-9.864,26.027l-29.43-11.61c6.636-16.827,12.886-34.1,18.878-51.674l-11.442-3.897   c-5.937,17.434-12.124,34.524-18.68,51.131l-2.875,7.194c-2.136,5.267-4.304,10.482-6.52,15.647   c-3.655,8.534-3.601,18.086,0.117,26.628c3.762,8.637,7.377,17.376,10.816,26.24l-28.763-14.593   c-3.578,7.055-7.267,13.97-11.083,20.739c-4.333,7.699-5.179,16.841-2.399,25.58c2.824,8.827,5.41,17.786,7.747,26.906   l-26.621-18.211c-4.285,6.278-8.724,12.402-13.31,18.402c-5.205,6.812-7.252,15.596-5.732,24.599   c1.56,9.083,2.82,18.298,3.795,27.66l-23.646-21.933c-5.146,5.553-10.464,10.989-15.951,16.307   c-6.216,6.058-9.651,14.584-9.501,23.792c0.487,28.188-1.652,57.336-5.879,86.828c-4.007,2.886-8.036,5.736-12.105,8.534   c-23.859,16.453-48.688,31.572-74.067,45.769c5.043-5.172,9.376-10.256,13.145-15.252c5.077-6.754,9.124-13.368,12.526-19.925   c5.106-9.846,8.754-19.53,12.281-29.55c3.524-10.036,6.923-20.453,11.23-32.071c2.872-7.758,5.538-15.508,7.988-23.221   c-6.395,4.856-12.948,9.596-19.614,14.255c-24.972,17.398-45.186,33.762-61.214,49.578c-12.036,11.831-21.723,23.281-29.488,34.086   c-11.662,16.189-18.973,30.921-23.928,42.648c-2.48,5.853-4.38,10.952-5.96,14.973c-0.783,2.022-1.49,3.766-2.113,5.165   c-0.622,1.392-1.172,2.439-1.531,2.996l-0.623,0.974L5.286,493.622l6.396,13.992l18.471-8.564l6.058,0.718   c0.59,0.066,1.578,0.264,2.838,0.579c2.359,0.6,5.622,1.633,9.596,2.856c6.963,2.117,16.123,4.798,27.532,6.637   c17.123,2.754,39.407,3.692,67.254-2.205c27.767-5.97,61.383-18.599,99.384-45c8.226-5.758,16.405-11.684,24.5-17.816   c-9.486,1.319-18.903,2.41-28.25,3.304c-16.585,1.56-30.312,1.172-43.637,0.791c-9.985-0.286-19.738-0.586-30.096-0.168   c-7.761,0.301-15.856,0.997-24.573,2.337c-8.359,1.282-17.288,3.15-27.108,5.757c28.672-15.72,56.79-32.612,83.814-51.248   c4.15-2.856,8.263-5.764,12.358-8.71c29.672,5.091,60.38,8.344,92.227,8.922c10.376,0.19,21.474-4.439,30.008-12.746   c7.501-7.289,14.849-14.79,22.002-22.504l-23.646-21.94c10.343-0.732,20.774-1.788,31.265-3.186   c10.383-1.356,20.818-7.677,28.115-17.23c6.402-8.38,12.588-16.921,18.508-25.588l-26.62-18.21   c10.109-2.249,20.255-4.791,30.389-7.633c10.043-2.799,19.358-10.431,25.122-20.673c5.066-8.995,9.894-18.049,14.504-27.133   l-28.759-14.599c9.662-3.414,19.313-7.048,28.939-10.878c9.534-3.787,17.713-12.065,22.163-22.46   c2.699-6.278,5.311-12.563,7.852-18.841l3.41-8.527c7.74-19.61,14.794-39.147,21.412-58.566L495.271,91.194z M395.628,87.912   c1.579-4.322,4.557-7.97,8.392-10.256c7.23-4.315,14.438-8.71,21.632-13.192c1.186-0.74,2.574-0.924,3.831-0.499   c1.253,0.425,2.249,1.406,2.74,2.725c2.985,7.956,5.907,15.962,8.753,24.034c1.513,4.278,1.443,9.157-0.194,13.654   c-3.777,10.351-7.695,20.665-11.798,30.95c-8.523,3.648-17.065,7.15-25.606,10.497c-3.219,1.26-6.629-0.205-7.977-3.362   c-3.571-8.41-7.263-16.716-11.058-24.936C388.247,107.742,391.998,97.86,395.628,87.912z M335.38,121.521l1.827-4.3   c1.026-2.403,3.766-3.575,6.15-2.586l27.049,11.238c4.527,9.853,8.893,19.837,13.061,29.982c0.747,1.81,0.689,3.934-0.168,5.802   c-4.501,9.867-9.205,19.617-14.15,29.242c-1.274,2.491-3.798,4.029-6.398,3.956c-2.611-0.089-4.82-1.766-5.684-4.278   c-6.464-18.812-13.746-36.994-21.624-54.736C333.439,131.3,333.41,126.106,335.38,121.521z M305.734,182.021l2.183-3.912   c1.22-2.212,4.029-3.018,6.3-1.794l26.02,14.086c3.479,10.102,6.702,20.372,9.636,30.84c0.538,1.876,0.22,3.949-0.828,5.7   c-2.003,3.289-4.022,6.564-6.094,9.808c-3.729,5.868-7.571,11.67-11.545,17.384c-1.586,2.3-4.289,3.487-6.85,3.054   c-2.568-0.432-4.538-2.403-5.069-4.988c-3.94-19.426-9.043-38.195-15.046-56.347C302.899,191.2,303.372,186.212,305.734,182.021z    M269.964,236.493l2.648-3.501c1.476-1.949,4.329-2.33,6.413-0.806l23.859,17.5c2.124,10.409,3.904,21.002,5.322,31.77   c0.26,1.926-0.348,3.934-1.641,5.509c-2.447,2.959-4.919,5.904-7.439,8.805c-4.546,5.26-9.197,10.431-13.966,15.493   c-1.912,2.029-4.754,2.82-7.23,2.008c-2.476-0.813-4.135-3.047-4.274-5.684c-1.022-19.786-3.318-39.103-6.78-57.776   C265.99,245.02,267.107,240.229,269.964,236.493z M223.679,362.314c-2.355-1.128-3.703-3.568-3.48-6.205   c1.666-19.8,2.252-39.366,1.637-58.464c-0.15-4.886,1.696-9.523,5.095-12.827l3.157-3.098c1.758-1.736,4.652-1.692,6.49,0.124   l21.02,20.819c0.55,10.615,0.744,21.376,0.582,32.254c-0.033,1.935-0.908,3.854-2.421,5.216c-2.85,2.586-5.725,5.15-8.63,7.677   c-5.248,4.578-10.585,9.069-15.998,13.456C228.953,363.025,226.034,363.442,223.679,362.314z M321.341,382.027   c-4.395,4.271-10.106,6.717-15.555,6.703c-21.299-0.03-42.11-1.305-62.442-3.59c-2.714-0.315-4.78-2.184-5.307-4.748   c-0.527-2.578,0.56-5.384,2.791-7.178c5.552-4.498,11.021-9.106,16.412-13.808c2.982-2.6,5.937-5.23,8.868-7.89   c1.549-1.406,3.552-2.168,5.534-2.08c11.054,0.483,22.233,0.608,33.547,0.373l24.342,24.108L321.341,382.027z M381.047,314.267   l-3.472,4.579c-3.751,4.908-9.091,8.204-14.508,9.017c-21.196,3.157-42.113,4.952-62.636,5.435   c-2.74,0.066-5.029-1.516-5.886-4.007c-0.861-2.475-0.147-5.398,1.824-7.494c4.915-5.216,9.702-10.548,14.398-15.969   c2.597-2.996,5.143-6.021,7.67-9.083c1.33-1.619,3.22-2.645,5.182-2.857c11.018-1.128,22.123-2.652,33.279-4.578l23.855,17.507   C382.834,308.341,382.988,311.689,381.047,314.267z M425.167,236.376c2.278,1.231,2.901,4.469,1.367,7.245l-2.748,4.923   c-2.974,5.289-7.746,9.237-12.962,10.761c-20.423,6.006-40.828,10.856-61.057,14.372c-2.7,0.469-5.194-0.755-6.417-3.092   c-1.223-2.337-0.934-5.318,0.696-7.684c4.091-5.882,8.05-11.86,11.888-17.904c2.132-3.333,4.205-6.702,6.264-10.087   c1.08-1.802,2.802-3.084,4.714-3.568c10.728-2.673,21.49-5.706,32.24-9.054L425.167,236.376z M462.047,169.927l-2.142,5.032   c-2.319,5.4-6.527,9.692-11.497,11.713c-19.409,7.912-38.946,15.047-58.472,21.149c-2.596,0.821-5.248-0.066-6.764-2.205   c-1.528-2.146-1.642-5.135-0.341-7.692c5.066-9.846,9.871-19.815,14.464-29.88c0.872-1.912,2.432-3.392,4.296-4.08   c10.431-3.817,20.837-7.89,31.225-12.168l27.056,11.238C462.252,164.023,463.241,167.107,462.047,169.927z" />
		</svg>
	),
	dairyFree: (
		<svg
			fill="currentColor"
			className="w-5 h-5"
			viewBox="0 0 470 470">
			<path d="M422.492,139.231c-0.01-0.103-0.028-0.203-0.042-0.305c-0.018-0.131-0.035-0.263-0.06-0.394 c-0.023-0.123-0.054-0.243-0.084-0.363c-0.026-0.106-0.051-0.212-0.081-0.316c-0.037-0.126-0.079-0.25-0.122-0.374 c-0.034-0.096-0.068-0.192-0.105-0.288c-0.048-0.122-0.101-0.242-0.155-0.36c-0.043-0.095-0.088-0.188-0.135-0.281 c-0.057-0.112-0.117-0.223-0.18-0.332c-0.055-0.096-0.113-0.19-0.172-0.284c-0.064-0.101-0.129-0.201-0.198-0.298 c-0.068-0.096-0.139-0.189-0.212-0.283c-0.07-0.09-0.14-0.18-0.214-0.266c-0.027-0.032-0.051-0.066-0.078-0.097L340.49,44.142V7.5 c0-4.143-3.357-7.5-7.5-7.5H137.01c-4.142,0-7.5,3.357-7.5,7.5v36.642L49.348,134.99c-0.027,0.03-0.05,0.063-0.076,0.094 c-0.077,0.089-0.149,0.182-0.221,0.275c-0.07,0.09-0.139,0.181-0.204,0.273c-0.071,0.101-0.138,0.204-0.205,0.308 c-0.057,0.09-0.113,0.181-0.166,0.274c-0.065,0.112-0.126,0.225-0.185,0.341c-0.046,0.09-0.089,0.181-0.131,0.272 c-0.056,0.121-0.109,0.243-0.158,0.367c-0.037,0.093-0.07,0.187-0.103,0.281c-0.044,0.125-0.087,0.251-0.124,0.379 c-0.03,0.103-0.055,0.207-0.08,0.312c-0.03,0.122-0.061,0.243-0.084,0.367c-0.025,0.129-0.042,0.26-0.06,0.391 c-0.014,0.103-0.032,0.204-0.042,0.308c-0.023,0.238-0.036,0.479-0.036,0.72V462.5c0,4.143,3.358,7.5,7.5,7.5h360.057 c4.143,0,7.5-3.357,7.5-7.5V139.952C422.528,139.71,422.515,139.47,422.492,139.231z M398.408,132.452H267.572l65.418-74.139 L398.408,132.452z M325.49,15v24.478H197.01c-4.142,0-7.5,3.357-7.5,7.5s3.358,7.5,7.5,7.5h119.36l-68.802,77.975H71.592 l68.802-77.975h26.616c4.142,0,7.5-3.357,7.5-7.5s-3.358-7.5-7.5-7.5h-22.5V15H325.49z M62.472,207.452h180.98V395H62.472V207.452z M243.452,192.452H62.472v-45h180.98V192.452z M62.472,410h180.98v45H62.472V410z M258.452,455V147.452h149.076v45H280.952 c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5,7.5,7.5h126.576V395H280.952c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5,7.5,7.5h126.576v45 H258.452z"></path>
			<path d="M195.793,284.743l-36.823-49.28c-1.416-1.895-3.643-3.011-6.008-3.011s-4.592,1.116-6.008,3.011l-36.83,49.29 c-6.9,9.265-10.547,20.282-10.547,31.861c0,29.437,23.949,53.386,53.385,53.386s53.385-23.949,53.385-53.386 C206.347,305.035,202.7,294.018,195.793,284.743z M152.962,355c-21.166,0-38.385-17.22-38.385-38.386 c0-8.327,2.62-16.246,7.57-22.893l30.815-41.239l30.808,41.229c4.957,6.656,7.577,14.576,7.577,22.902 C191.347,337.78,174.127,355,152.962,355z"></path>{" "}
		</svg>
	),
};

export const menuItems = [
	{
		name: "Coq au Vin",
		price: "$28",
		description: "Classic French chicken braised in wine",
		longDescription:
			"A timeless French dish where chicken is slowly braised in wine, mushrooms, and pearl onions. The meat becomes incredibly tender and absorbs all the rich flavors of the sauce.",
		ingredients: [
			"Free-range chicken",
			"Red wine",
			"Pearl onions",
			"Mushrooms",
			"Bacon lardons",
			"Fresh thyme",
			"Bay leaves",
		],
		allergens: ["Alcohol", "Sulfites"],
		dietary: {
			vegetarian: false,
			glutenFree: true,
			dairyFree: true,
		},
		calories: 650,
		image: "/menu1.jpeg",
	},
	{
		name: "Beef Bourguignon",
		price: "$32",
		description: "Tender beef stewed in red wine",
		longDescription:
			"A hearty French stew where prime beef chunks are braised in red wine with root vegetables. The meat becomes fork-tender after hours of slow cooking, creating a rich, deeply flavored sauce.",
		ingredients: [
			"Premium beef chuck",
			"Burgundy wine",
			"Carrots",
			"Baby potatoes",
			"Pearl onions",
			"Fresh herbs",
			"Garlic",
		],
		allergens: ["Alcohol", "Sulfites"],
		dietary: {
			vegetarian: false,
			glutenFree: true,
			dairyFree: true,
		},
		calories: 800,
		image: "/menu2.jpeg",
	},
	{
		name: "Ratatouille",
		price: "$24",
		description: "Traditional Provençal vegetable dish",
		longDescription:
			"A celebration of summer vegetables, layered and baked to perfection. Each vegetable is carefully arranged to create a stunning visual presentation while maintaining authentic Provençal flavors.",
		ingredients: [
			"Eggplant",
			"Zucchini",
			"Bell peppers",
			"Roma tomatoes",
			"Fresh basil",
			"Garlic",
			"Herbes de Provence",
		],
		allergens: [],
		dietary: {
			vegetarian: true,
			glutenFree: true,
			dairyFree: true,
		},
		calories: 300,
		image: "/menu3.jpeg",
	},
	{
		name: "French Onion Soup",
		price: "$18",
		description: "Rich broth with caramelized onions and melted Gruyère",
		longDescription:
			"Sweet caramelized onions simmered in rich beef broth, topped with crusty baguette and bubbling Gruyère cheese. A warming classic that takes patience to perfect.",
		ingredients: [
			"Sweet onions",
			"Beef stock",
			"Gruyère cheese",
			"Crusty baguette",
			"Fresh thyme",
			"Bay leaves",
			"White wine",
		],
		allergens: ["Dairy", "Gluten", "Alcohol"],
		dietary: {
			vegetarian: false,
			glutenFree: false,
			dairyFree: false,
		},
		calories: 450,
		image: "/menu4.jpeg",
	},
	{
		name: "Duck Confit",
		price: "$34",
		description: "Slow-cooked duck leg with crispy skin",
		longDescription:
			"Duck leg preserved and cooked in its own fat until meltingly tender, with perfectly crisp skin. Served with garlic-infused potatoes and seasonal greens.",
		ingredients: [
			"Duck leg",
			"Duck fat",
			"Garlic",
			"Fresh thyme",
			"Bay leaves",
			"Sea salt",
			"Black peppercorns",
		],
		allergens: [],
		dietary: {
			vegetarian: false,
			glutenFree: true,
			dairyFree: true,
		},
		calories: 700,
		image: "/menu5.jpeg",
	},
	{
		name: "Escargots de Bourgogne",
		price: "$26",
		description: "Burgundy snails in garlic herb butter",
		longDescription:
			"Premium Burgundy snails baked in shells with a rich garlic-herb butter. A delicate delicacy that exemplifies French haute cuisine.",
		ingredients: [
			"Burgundy snails",
			"Garlic butter",
			"Fresh parsley",
			"Shallots",
			"White wine",
			"Ground almonds",
			"Fresh breadcrumbs",
		],
		allergens: ["Dairy", "Gluten", "Nuts"],
		dietary: {
			vegetarian: false,
			glutenFree: false,
			dairyFree: false,
		},
		calories: 350,
		image: "/menu6.jpeg",
	},
	{
		name: "Trout Amandine",
		price: "$30",
		description: "Pan-seared trout with toasted almonds",
		longDescription:
			"Fresh river trout delicately pan-seared and topped with brown butter sauce and crispy toasted almonds. Served with haricots verts and lemon.",
		ingredients: [
			"Fresh trout",
			"Sliced almonds",
			"Brown butter",
			"Lemon",
			"Parsley",
			"Haricots verts",
			"Capers",
		],
		allergens: ["Fish", "Nuts", "Dairy"],
		dietary: {
			vegetarian: false,
			glutenFree: true,
			dairyFree: false,
		},
		calories: 500,
		image: "/menu7.jpeg",
	},
	{
		name: "Cassoulet",
		price: "$29",
		description: "Traditional French bean stew with meat",
		longDescription:
			"A rustic, hearty dish from southwest France combining white beans, duck confit, and various sausages, slow-cooked to create a rich, warming meal.",
		ingredients: [
			"White beans",
			"Duck confit",
			"Toulouse sausage",
			"Pork belly",
			"Tomatoes",
			"Fresh herbs",
			"Breadcrumbs",
		],
		allergens: ["Gluten"],
		dietary: {
			vegetarian: false,
			glutenFree: false,
			dairyFree: true,
		},
		calories: 600,
		image: "/menu8.jpeg",
	},
	{
		name: "Quiche Lorraine",
		price: "$22",
		description: "Classic bacon and cheese tart",
		longDescription:
			"A buttery pastry crust filled with a savory custard of eggs, cream, smoky bacon, and Gruyère cheese. A slice of Lorraine tradition.",
		ingredients: [
			"Butter pastry",
			"Farm eggs",
			"Heavy cream",
			"Smoked bacon",
			"Gruyère cheese",
			"Nutmeg",
			"Chives",
		],
		allergens: ["Eggs", "Dairy", "Gluten"],
		dietary: {
			vegetarian: false,
			glutenFree: false,
			dairyFree: false,
		},
		calories: 400,
		image: "/menu9.jpeg",
	},
];

export default function MenuItemPage({ params }) {
	const router = useRouter();
	const unwrappedParams = React.use(params);
	const { slug } = unwrappedParams;
	const item = menuItems.find(
		(item) => item.name.toLowerCase().replace(/ /g, "-") === slug
	);

	if (!item) {
		return <div>Item not found</div>;
	}

	return (
		<div className="min-h-screen bg-amber-50">
			<Navigate />
			{/* Hero Section - updated */}
			<div className="relative h-[50vh] bg-amber-900">
				<div className="absolute inset-0">
					<img
						src={item.image}
						alt={item.name}
						className="w-full h-full object-cover opacity-60"
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
				</div>
				<div className="relative h-full flex flex-col items-center justify-center text-center px-4 pt-16">
					<div className="container mx-auto px-4">
						<div className="flex items-center space-x-4 text-amber-100 mb-8">
							<a
								href="/"
								className="hover:text-amber-200 transition-colors">
								Home
							</a>
							<span>/</span>
							<a
								href="/menu"
								className="hover:text-amber-200 transition-colors">
								Menu
							</a>
							<span>/</span>
							<span className="text-amber-200">{item.name}</span>
						</div>
						<h1 className="text-4xl md:text-6xl font-playfair text-white mb-4">
							{item.name}
						</h1>
						<p className="text-xl text-amber-200 max-w-2xl mx-auto">
							{item.description}
						</p>
					</div>
				</div>
			</div>

			{/* Content Section */}
			<div className="py-16">
				<div className="container mx-auto px-4">
					<button
						onClick={() => router.back()}
						className="mb-8 flex items-center text-amber-800 hover:text-amber-600 transition-colors">
						<ChevronLeft className="mr-2" />
						Back to Menu
					</button>

					<div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
						<div className="relative h-96">
							<img
								src={item.image}
								alt={item.name}
								className="w-full h-full object-cover"
							/>
							<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
								<h1 className="text-4xl font-playfair text-white">
									{item.name}
								</h1>
							</div>
						</div>

						<div className="p-8 space-y-6">
							{/* Price and Calories Section */}
							<div className="flex items-center justify-between">
								<p className="text-3xl text-amber-800">{item.price}</p>
								<div className="flex items-center gap-2 text-amber-600">
									<span className="text-sm font-semibold">Calories:</span>
									<span>{item.calories}</span>
								</div>
							</div>

							<div className="border-t border-amber-100 pt-6">
								<p className="text-lg text-amber-700 leading-relaxed">
									{item.longDescription}
								</p>
							</div>

							<div className="border-t border-amber-100 pt-6">
								<h2 className="text-2xl font-playfair text-amber-900 mb-4">
									Ingredients
								</h2>
								<ul className="grid grid-cols-2 gap-2">
									{item.ingredients.map((ingredient) => (
										<li
											key={ingredient}
											className="flex items-center text-amber-700">
											<span className="mr-2">•</span>
											{ingredient}
										</li>
									))}
								</ul>
							</div>

							{/* Modified Dietary Information Section */}
							<div className="border-t border-amber-100 pt-6">
								<h2 className="text-2xl font-playfair text-amber-900 mb-4">
									Dietary Information
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-4">
										<h3 className="font-semibold text-amber-900">
											Dietary Preferences
										</h3>
										<div className="flex flex-wrap gap-2">
											{Object.entries(item.dietary).map(([key, value]) => (
												<div
													key={key}
													className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
														value
															? "bg-green-50 text-green-700 border border-green-200"
															: "bg-red-50 text-red-700 border border-red-200"
													}`}>
													{dietaryIcons[key]}
													<span className="capitalize">
														{key.replace(/([A-Z])/g, " $1").trim()}
													</span>
													<span className={`ml-1 ${value ? "✓" : "×"}`}></span>
												</div>
											))}
										</div>
									</div>

									{item.allergens.length > 0 && (
										<div className="space-y-4">
											<h3 className="font-semibold text-amber-900">
												Allergen Information
											</h3>
											<div className="flex flex-wrap gap-2">
												{item.allergens.map((allergen) => (
													<span
														key={allergen}
														className="bg-amber-50 text-amber-800 px-4 py-2 rounded-lg border border-amber-200">
														{allergen}
													</span>
												))}
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
