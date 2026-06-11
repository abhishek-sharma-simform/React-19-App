import React from "react";

interface DeveloperProps {
  name: string;
  age: number;
}

interface DeveloperState {
  count: number;
}

class Developer extends React.Component<DeveloperProps, DeveloperState> {
  constructor(props: DeveloperProps) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  render() {
    const { name, age } = this.props;
    return (
      <>
        <h1>Developer Component</h1>
        <p>{this.state.count}</p>
        <button
          onClick={() => {
            this.setState({ count: this.state.count + 1 });
          }}
        >
          INC Count
        </button>
        <p>Name: {name}</p>
        <p>Age: {age}</p>
      </>
    );
  }
}
export default Developer;
