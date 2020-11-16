import React, { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const MostVotes = ({ anecdote, votes }) => {
  if (votes === 0) {
    return <p>No votes casted yet.</p>;
  }

  return (
    <p>
      {anecdote}
      <br />
      This anecdote has {votes} votes.
    </p>
  );
};

const App = ({ anecdotes }) => {
  const points = new Array(anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(points);
  const [mostVotes, setMostVotes] = useState(0);

  const handleAnecdoteButton = () => {
    let randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const handleVoteButton = () => {
    const pointsCopy = [...votes];
    pointsCopy[selected] += 1;
    setVotes(pointsCopy);

    if (pointsCopy[selected] > pointsCopy[mostVotes]) {
      setMostVotes(selected);
    }
  };
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected]}
        <br />
        This has {votes[selected]} votes.
      </p>
      <Button onClick={handleAnecdoteButton} text="New Anecdote" />
      <Button onClick={handleVoteButton} text="Vote" />
      <h2>Anecdote with the most votes</h2>
      <MostVotes anecdote={anecdotes[mostVotes]} votes={votes[mostVotes]} />
    </div>
  );
};

export default App;
