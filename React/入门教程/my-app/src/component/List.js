import React from 'react';

class List extends React.Component {
  constructor(porps){
    super(porps);
    this.state = {
      numbers : porps.numbers || []
    };
  }

  render(){
    const numbers = this.state.numbers;
    const listItems = numbers.map((number) =>
      <li key={number.toString()}>{number}</li>
    );
    return listItems;
  }
}

export default List;