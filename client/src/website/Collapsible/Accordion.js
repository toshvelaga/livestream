import React, { Component } from "react";
import Panel from "./Panel";
import "./Accordion.css";

// https://codepen.io/DNLHC/pen/BRmJrj

export default class Accordion extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeTab: 0,
		};

		this.activateTab = this.activateTab.bind(this);
	}

	panels = [
		{
			label: "How many episodes can I host on the free plan?",
			content:
				"All users who sign up now will be able to upload as many episodes as they want. Even in the future if there are price changes you will be able to still upload as many as you like without having to pay.",
		},
		{
			label: "Can I get a discount?",
			content:
				"Possibly! Please send us a message and we can discuss your case.",
		},
		{
			label: "Can I share my account with my co-host?",
			content: "Yes. We are working on adding contributors.",
		},
	];

	activateTab(index) {
		this.setState((prev) => ({
			activeTab: prev.activeTab === index ? -1 : index,
		}));
	}

	render() {
		// const { panels } = this.props;
		const { activeTab } = this.state;
		return (
			<div className="accordion" role="tablist">
				{this.panels.map((panel, index) => (
					<Panel
						key={index}
						activeTab={activeTab}
						index={index}
						{...panel}
						activateTab={this.activateTab.bind(null, index)}
					/>
				))}
			</div>
		);
	}
}
