import React from 'react';
import SwitchNavigator from './components/navigation/SwitchNavigator';
import { AppProvider } from './providers/AppProvider';

class App extends React.Component {
  public render() {
    return (
      <AppProvider>
        <SwitchNavigator/>
      </AppProvider>
    );
  }
}

export default App;
