import React from "react";

// Define the type for the exercise prop
type ExerciseProps = {
  exercise: {
    _id: string;
    name: string;
    type: string;
    description: string;
    createdAt: Date; // Change the type if the format is different, e.g., Date
  };
};

const ExerciseDetails: React.FC<ExerciseProps> = ({ exercise }) => {
  return (
    <div className="exercise-details">
      <h4>{exercise.name}</h4>
      <p>
        <strong>{exercise.type}</strong>
      </p>
      <p>
        <strong>{exercise.description}</strong>
      </p>
      <p>{exercise.createdAt.toString()}</p>
    </div>
  );
};

export default ExerciseDetails;
