import { useEffect, useState } from "react"
import React from "react"
import { api } from "../App"
import { LayoutContext } from "./Layout";

const CustomLink = React.lazy(() => import('../components/CustomLink'));
const Dimmer = React.lazy(() => import('../components/Dimmer'));
const Alert = React.lazy(() => import('../components/Alert'));

function Section(props) {

	return (
		<div className="m-2 grow">
			<Dimmer className=" shadow-cool">
				<div className="divider text-xl sm:text-2xl before:bg-base-content after:bg-base-content text-base-content">{props.title}</div>
				<div className="flex flex-row flex-wrap">
					{
						props.cards?.map((card, index) => (
							<div key={card.id} className="m-2 grow">
								<div className="collapse collapse-arrow bg-base-content">
									<input id={`cardCheck${card.id}`} type="checkbox" aria-label={`${props.title} - ${card.title}`} />
									<div className="collapse-title text-xl font-medium text-base-100">
										{card.title}
									</div>
									<div className="collapse-content">
										<ul className="menu p-0">
											{card.pages?.map((page, index) => (
												<li key={page.id}>
													<CustomLink to={"page/" + page.id} className="block break-all text-base-200 focus:!text-base-content focus:!bg-base-100 hover:bg-base-100 hover:text-base-content ">
														{page.title}
													</CustomLink>
												</li>
											))}
										</ul>
									</div>
								</div>
							</div>
						))
					}
				</div>
			</Dimmer>
		</div>
	)
}

export default function Home(props) {

	const [sections, setSections] = useState([])
	const layoutContext = React.useContext(LayoutContext);

	useEffect(() => {
		api.get("/sections").then(res => {
			document.title = "El Cato";
			let sec = res.data;
			// order each section by order
			sec.sort((a, b) => a.order - b.order);
			// order each card and page by order
			sec.forEach(section => {
				section.cards.sort((a, b) => a.order - b.order);
				section.cards.forEach(card => {
					card.pages.sort((a, b) => a.order - b.order);
				});
			});
			setSections(sec);
			layoutContext.setLinks([]);
		}).catch(err => {
			console.log(err);
		});
	}, [])

	function random(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function skeletonSections() {
		let secs = [
			{
				id: 1,
				title:
					<div role="status" className="max-w-sm animate-pulse">
						<div className="h-2.5 bg-base-content rounded-full w-52 mb-4"></div>
					</div>,
				subtitle: <div role="status" className="max-w-sm animate-pulse">
					<div className="h-2.5 bg-base-content rounded-full w-52 mb-4"></div>
				</div>,
				cards: [
					{
						id: 1,
						title: <div role="status" className="max-w-sm animate-pulse">
							<div className="h-2.5 bg-base-100 rounded-full w-40 mb-4"></div>
						</div>,
						pages: []
					},
					{
						id: 2,
						title: <div role="status" className="max-w-sm animate-pulse">
							<div className="h-2.5 bg-base-100 rounded-full w-32 mb-4"></div>
						</div>,
						pages: []
					}
				]
			},
		];

		for (let i = 1; i <= random(2, 5); i++) {
			let sec = {
				id: i,
				title:
					<div role="status" className="max-w-sm animate-pulse">
						<div className="h-2.5 bg-base-content rounded-full mb-4" style={{ width: random(100, 200) }}></div>
					</div>,
				cards: []
			};
			for (let j = 1; j <= random(2, 5); j++) {
				sec.cards.push({
					id: j * i,
					title: <div role="status" className="max-w-sm animate-pulse">
						<div className="h-2.5 bg-base-100 rounded-full mb-4" style={{ width: random(100, 250) }}></div>
					</div>
				});
			}
			secs.push(sec);
		}

		return secs.map((section, index) => {
			return (
				<Section key={index} cards={section.cards} title={section.title} subtitle={section.subtitle} />
			)
		})
	}

	return (
		<>
			<Alert>
				You can contribute by visiting the <CustomLink to="/admin" className="link">admin panel</CustomLink>
			</Alert>
			<div className="flex flex-row flex-wrap">
				{
					sections.length > 0 || skeletonSections()
				}
				{
					sections.map((section, index) => {
						return section.cards.length > 0 && section.cards.some(c => c.pages.length > 0) && (
							<Section key={index} cards={section.cards} title={section.title} subtitle={section.subtitle} />
						)
					})
				}
			</div>
		</>
	)
}