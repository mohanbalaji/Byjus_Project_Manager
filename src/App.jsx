import './App.css';
import React, { Component } from 'react';
import Board from 'react-trello';

const data = require('./data.json');

const handleDragStart = (cardId, laneId) => {
  console.log('drag started')
  console.log(`cardId: ${cardId}`)
  console.log(`laneId: ${laneId}`)
}

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
  console.log('drag ended')
  console.log(`cardId: ${cardId}`)
  console.log(`sourceLaneId: ${sourceLaneId}`)
  console.log(`targetLaneId: ${targetLaneId}`)
}

class App extends Component {
  state = { boardData: { lanes: [] } }

  setEventBus = (eventBus) => {
    this.setState({ eventBus })
  }

  async componentWillMount() {
    const response = await this.getBoard()
    this.setState({ boardData: response })
  }

  getBoard() {
    return new Promise((resolve) => {
      resolve(data)
    })
  }

  addCard = () => {
    this.state.eventBus.publish({
      type: 'ADD_CARD',
      laneId: 'BLOCKED',
      card: {
        id: 'Ec2Error',
        title: 'EC2 Instance Down',
        label: '30 mins',
        description: 'Main EC2 instance down',
      },
    })
  }

  shouldReceiveNewData = (nextData) => {
    console.log('New card has been added')
    console.log(nextData)
  }

  handleCardAdd = (card, laneId) => {
    console.log(`New card added to lane ${laneId}`)
    console.dir(card)
  }

  render() {
    return (

      <div className="App">
        <div className="App-header">
          <div className="logo">
            <img className="blogo" src={require('./img/blogo.png')} alt="" />
          </div>

          <div className="menu">
            <h5>CBSE Grade 5 Maths Algebra</h5>
            <ul>
              <li><a className="active" href="#">Task</a></li>
              <li><a href="#">Conversation</a></li>
              <li><a href="#">Files</a></li>
            </ul>
          </div>

          <div className="menu-user">
            <ul>
              <li><img className="sheader" src={require('./img/search.png')} alt="" /></li>
              <li><img className="sheader" src={require('./img/user.png')} alt="" /> Tom</li>

            </ul>
          </div>
        </div>

        <div className="clear"></div>

        <div className="side-bar">
          <ul>
            <li><img className="activesidebar" src={require('./img/home.png')} alt="" /></li>
            <li><img src={require('./img/analysis.jpg')} alt="" /></li>
            <li><img src={require('./img/setting.jpg')} alt="" /></li>
          </ul>
        </div>

        <div className="App-intro">
          <div className="breadcrumb">
            <ul>
              <li><a href="#">List</a></li>
              <li><a className="active" href="#">Board</a></li>
              <li><a href="#">Calendar</a></li>
              <li><img className="filter" src={require('./img/filter.jpg')} alt="" /></li>
            </ul>
          </div>

          <div className="container">
            <Board
              editable
              onCardAdd={this.handleCardAdd}
              data={this.state.boardData}
              draggable
              onDataChange={this.shouldReceiveNewData}
              eventBusHandle={this.setEventBus}
              handleDragStart={handleDragStart}
              handleDragEnd={handleDragEnd}

            />
          </div>

          <div className="footer">
            copyright © 2020,<a href="#"> BYJU'S.</a> All rights reserved.
          </div>
        </div>
      </div>
    )
  }
}

export default App
