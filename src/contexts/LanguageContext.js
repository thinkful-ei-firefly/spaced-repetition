import React from 'react';

const LanguageContext = React.createContext({
  language: null,
  words: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setUser: () => {}
});

export default LanguageContext;
