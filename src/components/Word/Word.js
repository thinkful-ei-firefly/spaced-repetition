import React from 'react';

export default function Word(props) {
  console.log(props);
  return <li key={props.word.id}>{props.word.original}</li>;
}
