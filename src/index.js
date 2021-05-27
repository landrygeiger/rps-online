import React from 'react';
import ReactDOM from 'react-dom';
import PageHeading from './components/page-heading';
import MainPageContent from './components/main-page-content';

class App extends React.Component {
  render() {
    return (
      <div>
        <PageHeading />
        <MainPageContent />
      </div>
    );
  }
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
