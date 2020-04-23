import React, { PureComponent } from 'react'
import { v4 as uuidv4 } from 'uuid'
import List from './List'
import '../App.css'
export default class Input extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      age: '',
      list: ''
    }

  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if(this.state.username === "" || this.state.email === "" || this.state.age === "") {
      return
    }
    const dataObj = {
      0: this.state.username,
      1: this.state.email,
      2: this.state.age
    }
    const dataList = [dataObj]
    const finalList = dataList.map(key => {
      return(
        <div key={uuidv4()} id={uuidv4()} className="list" onClick={(event) => {
          event.target.classList.toggle("mystyle")
          }}>
          {key[0]}<br></br>
          {key[1]}<br></br>
          {key[2]}<br></br>
          <p></p>
        </div>
      )
    })
    this.state.list !== "" && finalList.push(...this.state.list)
    
    this.setState({
      list: finalList,
      username: '',
      email: '',
      age: ''
    })

  }

  render() {
    return (
      <div>
        <form id="myForm" onSubmit={this.handleSubmit} className="form">
          <h1>Input users</h1>
          <input type="text" value={this.state.username} name="username" onChange={this.handleInput} placeholder="username"/>
          <input type="email" value={this.state.email} name="email" onChange={this.handleInput} placeholder="email"/>
          <input type="number" value={this.state.age} name="age" onChange={this.handleInput} placeholder="age"/>
          <input type="submit" value="Submit" />
          <button type="button" onClick={() => {
            const marked = document.getElementsByClassName("mystyle")
            const keys = Object.entries(marked)
            const values = keys.map(key => {
              return key[1].id
            })
            
            if(values.length === 0) {
              return
            }

            const listToBeModified = this.state.list
            
            
          
            const objectIndex = listToBeModified.map((key, index) => {
              
              if(values.includes(key.props.id) === true){
                return index
              }
              
            })

            const filteredObjectIndex = objectIndex.filter((e) => {return e !== undefined })
            filteredObjectIndex.sort((a,b) => {
              return b - a
            })
            
            
            filteredObjectIndex.forEach(element => listToBeModified.splice(element, 1))
            
            
            this.setState({list: [...listToBeModified]})
            
            
            
            
          }}>Delete</button>
          <button type="button" onClick={() => {
            if (this.state.username === "" || this.state.email === "" || this.state.age === "") {
              return
            }
            const {username, email, age} = this.state 
            const marked = document.getElementsByClassName("mystyle")
            const keys = Object.entries(marked)
      
            for (let index = 0; index < keys.length; index++) {
              keys[index][1].innerHTML = `${username} ${"<br />"} ${email} ${"<br />"} ${age} ${"<br />"} ${"<p />"}`
            }
            this.setState({
              username: '',
              email: '',
              age: ''
            })
            
          }}>Change</button>
        </form>

        <List className="list" list={this.state.list} />
        
      </div>
    )
  }
}
