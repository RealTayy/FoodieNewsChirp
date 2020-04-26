import React from 'react'
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

const getRandomUsername = () => {
  const randomName: string = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: "",
    style: "capital"
  });

  localStorage.setItem("username", randomName);
  return randomName;
}

if (!localStorage.getItem("username")) getRandomUsername();
const SessionContext = React.createContext({
  username: localStorage.getItem("username"),
  getRandomUsername: getRandomUsername
});

export default SessionContext;

