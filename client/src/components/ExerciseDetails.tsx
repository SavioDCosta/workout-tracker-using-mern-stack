import React from "react";
import { useExerciseContext } from "../hooks/useExerciseContext";

// Define the type for the exercise prop
type ExerciseProps = {
  exercise: {
    _id: string;
    name: string;
    type: string;
    muscle: string;
    equipment: string;
    difficulty: string;
    instructions: string;
    createdAt: Date;
  };
};

const ExerciseDetails: React.FC<ExerciseProps> = ({ exercise }) => {
  const { dispatch } = useExerciseContext();

  const handleClick = async () => {
    const response = await fetch("/api/exercises/" + exercise._id, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_EXERCISE", payload: json });
    }
  };

  return (
    <div className="exercise-details">
      <h4>{exercise.name}</h4>
      <p>
        <strong>Exercise Type: </strong>
        {exercise.type}
      </p>
      <p>
        <strong>Muscle: </strong>
        {exercise.muscle}
      </p>
      <p>
        <strong>Equipment Required: </strong>
        {exercise.equipment}
      </p>
      <p>
        <strong>Difficulty: </strong>
        {exercise.difficulty}
      </p>
      <p>
        <strong>Instructions: </strong>
        <br />
        {exercise.instructions}
      </p>
      <p>
        <strong>Created at: </strong>
        {exercise.createdAt.toString()}
      </p>
      <span className="edit-button" onClick={handleClick}>
        Edit
      </span>
      <span className="delete-button" onClick={handleClick}>
        Delete
      </span>
    </div>
  );
};

export default ExerciseDetails;
