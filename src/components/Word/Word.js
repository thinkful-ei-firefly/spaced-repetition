import React from 'react';

export default function Word(props) {
  return (
    <li>
      <h4 lang="ja">{props.word.original}</h4>
      correct answer count: {props.word.correct_count}
      <br />
      incorrect answer count: {props.word.incorrect_count}
    </li>
  );
}
