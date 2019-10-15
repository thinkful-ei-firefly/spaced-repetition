import React from 'react';

export default function Word(props) {
  return (
    <li>
      {props.word.original} ({props.word.correct_count}/
      {props.word.incorrect_count})
    </li>
  );
}
