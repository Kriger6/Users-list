import React, { PureComponent } from 'react'
export default class List extends PureComponent {
  render() {
    const items = this.props.list
  
    return (
      <div className={this.props.className}>
        {items}
      </div>
    )
  }
}


