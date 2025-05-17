import { createContext, useContext, useState } from 'react';

const UserSettingsContext = createContext();

export const UserSettingsProvider = ({ children }) => {
  const [goal, setGoal] = useState(null);                // 'muscle' | 'fatburn'
  const [trainingTime, setTrainingTime] = useState(new Date(2023, 1, 1, 17, 0)); // default 17:00
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <UserSettingsContext.Provider
      value={{
        goal,
        setGoal,
        trainingTime,
        setTrainingTime,
        notificationsEnabled,
        setNotificationsEnabled
      }}
    >
      {children}
    </UserSettingsContext.Provider>
  );
};

export const useUserSettings = () => useContext(UserSettingsContext);
