import React from "react";
import { useExerciseContext } from "../hooks/useExerciseContext";
import {
  // format, parseISO,
  formatDistanceToNow,
} from "date-fns";
import { useAuthContext } from "../hooks/useAuthContext";
import { Exercise } from "../utils/ExerciseProps";

// Define the type for the exercise prop
export type ExerciseProps = {
  exercise: Exercise;
};

const ExerciseDetails: React.FC<ExerciseProps> = ({ exercise }) => {
  const { dispatch, setEditingExercise } = useExerciseContext();
  const userState = useAuthContext();

  const handleEdit = async () => {
    if (!userState.state.userAndToken) {
      return;
    }
    const response = await fetch("/api/exercises/" + exercise._id, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userState.state.userAndToken.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      setEditingExercise(json as Exercise);
    }
  };

  const handleDelete = async () => {
    if (!userState.state.userAndToken) {
      return;
    }
    const response = await fetch("/api/exercises/" + exercise._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userState.state.userAndToken.token}`,
      },
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
        <strong>Created : </strong>
        {/* {format(parseISO(exercise.createdAt.toString()), "MM-dd-yyyy HH:mm")} */}
        {formatDistanceToNow(new Date(exercise.createdAt), { addSuffix: true })}
      </p>
      <span
        className="material-symbols-outlined edit-button"
        onClick={handleEdit}
      >
        edit
      </span>
      <span
        className="material-symbols-outlined delete-button"
        onClick={handleDelete}
      >
        delete
      </span>
    </div>
  );
};

export default ExerciseDetails;
