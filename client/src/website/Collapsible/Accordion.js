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
        'Authentication via twitch, google and facebook instead of having to find your stream key. The ability to stream with other users using webRTC. Ability to add overlays on your content in real time',
    },
    {
      label: 'How much does this cost?',
      content:
        "Right now it's totally free! Will be adding paid plans with advanced features in the future.",
    },
    {
      label: 'Where can I find the source code?',
      content:
        'All of the source code is available on GitHub: https://github.com/toshvelaga/livestream',
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
