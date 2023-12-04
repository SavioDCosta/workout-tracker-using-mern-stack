import React from "react";

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
    </div>
  );
};

export default ExerciseDetails;
