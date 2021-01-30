import {AppState, AppStateStatus} from 'react-native';
import {useEffect, useState} from 'react';

export default function useAppState(): AppStateStatus {
  const currentState = AppState.currentState;
  const [appState, setAppState] = useState(currentState);

  function onChange(newState: AppStateStatus): void {
    setAppState(newState);
  }

  useEffect(() => {
    AppState.addEventListener('change', onChange);

    return (): void => {
      AppState.removeEventListener('change', onChange);
    };
  });

  return appState;
}
