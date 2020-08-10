import React from 'react';
import SALBoard from './sal-board';
import { generateBlocks } from './utils';

export default class App extends React.Component {
  state = {
    blocks: generateBlocks(),
  };
  render() {
    const { blocks } = this.state;
    return (
      <>
        <SALBoard blocks={blocks} />
      </>
    );
  }
}
