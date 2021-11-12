import React, { Component } from 'react'
import Panel from './Panel'
import './Accordion.css'

// https://codepen.io/DNLHC/pen/BRmJrj

export default class Accordion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: 0,
    }

    this.activateTab = this.activateTab.bind(this)
  }

  panels = [
    {
      label: 'What features are you adding in the future?',
      content:
        'The ability to stream with other users using webRTC. Additional streaming destinations such as twitter and linkedin. Being able to respond to your messages in real time. Ability to add overlays on your content in real time.',
    },
    {
      label: 'How much does this cost?',
      content:
        "Right now it's totally free! Will be adding paid plans with advanced features in the future.",
    },
    {
      label: 'Do you have support?',
      content:
        'Yes if you have any additional questions or support issues feel free to reach out to me at toshvelaga@gmail.com',
    },
  ]

  activateTab(index) {
    this.setState((prev) => ({
      activeTab: prev.activeTab === index ? -1 : index,
    }))
  }

  render() {
    // const { panels } = this.props;
    const { activeTab } = this.state
    return (
      <div className='accordion' role='tablist'>
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
    )
  }
}
