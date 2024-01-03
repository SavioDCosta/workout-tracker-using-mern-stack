import React from "react";
// import { useWorkoutPlanContext } from "../hooks/useWorkoutPlanContext";
import {
  // format, parseISO,
  formatDistanceToNow,
} from "date-fns";
import { WorkoutPlan } from "../utils/WorkoutPlanProps";
// import { useAuthContext } from "../hooks/useAuthContext";

// Define the type for the workout plan prop
export type WorkoutPlanProps = {
  workoutPlan: WorkoutPlan;
};

const WorkoutPlanDetails: React.FC<WorkoutPlanProps> = ({ workoutPlan }) => {
  // const { dispatch, setEditingExercise } = useWorkoutPlanContext();
  // const userState = useAuthContext();

  //   const handleEdit = async () => {
  //     if (!userState.state.userAndToken) {
  //       return;
  //     }
  //     const response = await fetch("/api/exercises/" + exercise._id, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${userState.state.userAndToken.token}`,
  //       },
  //     });
  //     const json = await response.json();
  //     if (response.ok) {
  //       setEditingExercise(json as Exercise);
  //     }
  //   };

  //   const handleDelete = async () => {
  //     if (!userState.state.userAndToken) {
  //       return;
  //     }
  //     const response = await fetch("/api/exercises/" + exercise._id, {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${userState.state.userAndToken.token}`,
  //       },
  //     });
  //     const json = await response.json();
  //     if (response.ok) {
  //       dispatch({ type: "DELETE_EXERCISE", payload: json });
  //     }
  //   };
  console.log(workoutPlan.workouts.map((workout) => workout.workout._id));

  return (
    <div className="exercise-details">
      <h4>{workoutPlan.name}</h4>
      <ul>
        {workoutPlan.workouts &&
          workoutPlan.workouts.map((workout) => (
            <li key={workout.workout._id}>{workout.workout.name}</li>
          ))}
      </ul>
      <p>
        <strong>Description: </strong>
        {workoutPlan.description}
      </p>
      <p>
        <strong>Created By : </strong>
        {workoutPlan.createdBy.email}
      </p>
      <p>
        <strong>Created At: </strong>
        {/* {format(parseISO(exercise.createdAt.toString()), "MM-dd-yyyy HH:mm")} */}
        {formatDistanceToNow(new Date(workoutPlan.createdAt), {
          addSuffix: true,
        })}
      </p>
      {/* <span
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
      </span> */}
    </div>
  );
};

export default WorkoutPlanDetails;
