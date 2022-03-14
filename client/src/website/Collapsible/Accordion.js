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
      label: 'How is this different than OBS?',
      content:
        'Ohmystream is completely in the browser. You do not need to download anything. Additionally you can stream to multiple services at the same time without the need to download complicated extensions.',
    },
    {
      label: 'What are the benefits of multistreaming?',
      content:
        'Multistreaming allows you to grow your audience across multiple platforms at the same time, enables cross channel discovery and saves you time and money by instantly uploading your content.',
    },
    {
      label: 'What custom RTMP destinations do you support?',
      content:
        'We support any RTMP destination that gives you a stream key. For example TikTok, Instagram Live, Dlive, Fansly, or your own personal website.',
    },
    {
      label: 'How much does this cost?',
      content:
        'Right now there is a free two week trial and then it is $10/month. We do not ask for credit card upfront. If you cannot afford this please reach out to us at ohmystreamer@gmail.com',
    },
    {
      label: 'Do you have support?',
      content:
        'Yes if you have any additional questions or support issues feel free to reach out to us at ohmystreamer@gmail.com',
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
