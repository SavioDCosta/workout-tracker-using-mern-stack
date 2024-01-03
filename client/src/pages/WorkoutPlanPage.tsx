import {
  useEffect,
  //useState
} from "react";
import WorkoutPlanDetails from "../components/WorkoutPlanDetails";
// import ExerciseForm from "../components/ExerciseForm";
import { useWorkoutPlanContext } from "../hooks/useWorkoutPlanContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { WorkoutPlan } from "../utils/WorkoutPlanProps";

export const WorkoutPlanPage: React.FC = () => {
  const {
    state,
    dispatch,
    // setEditingExercise
  } = useWorkoutPlanContext();
  const userState = useAuthContext();
  const { workoutPlans } = state;

  //   const [name, setName] = useState<string>("");
  //   const [type, setType] = useState<string>("");
  //   const [muscle, setMuscle] = useState<string>("");
  //   const [equipment, setEquipment] = useState<string>("");
  //   const [difficulty, setDifficulty] = useState<string>("");
  //   const [instructions, setInstructions] = useState<string>("");
  //   const [buttonName, setButtonName] = useState<"Add" | "Edit">("Add");
  //   const [error, setError] = useState<string | null>(null);
  //   const [emptyFields, setEmptyFields] = useState<string[]>([]);

  //   const handleAdd = () => {
  //     setName("");
  //     setType("");
  //     setMuscle("");
  //     setEquipment("");
  //     setDifficulty("");
  //     setInstructions("");
  //     setButtonName("Add");
  //     setError(null);
  //     setEmptyFields([]);
  //   };

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      const response = await fetch(
        "/api/workout_plans/user/" + userState.state.userAndToken?.user._id,
        {
          headers: {
            Authorization: `Bearer ${userState.state.userAndToken?.token}`,
          },
        }
      );
      const json = await response.json();
      console.log(json as WorkoutPlan[]);
      if (response.ok) {
        dispatch({ type: "SET_WORKOUT_PLANS", payload: json as WorkoutPlan[] });
      }
    };
    if (userState.state.userAndToken) {
      fetchWorkoutPlans();
    }
  }, [dispatch, userState]);

  return (
    <div className="exercise-page">
      <div className="exercises">
        <div className="exercises-header">
          <h2>Workout Plans</h2>
          <span
            className="material-symbols-outlined add-button"
            // onClick={handleAdd}
          >
            add
          </span>
        </div>
        {workoutPlans &&
          workoutPlans.map((workoutPlan: WorkoutPlan) => (
            <WorkoutPlanDetails
              key={workoutPlan._id}
              workoutPlan={workoutPlan}
            />
          ))}
      </div>
      {/* <ExerciseForm
        name={name}
        setName={setName}
        type={type}
        setType={setType}
        muscle={muscle}
        setMuscle={setMuscle}
        equipment={equipment}
        setEquipment={setEquipment}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        instructions={instructions}
        setInstructions={setInstructions}
        buttonName={buttonName}
        setButtonName={setButtonName}
        error={error}
        setError={setError}
        emptyFields={emptyFields}
        setEmptyFields={setEmptyFields}
        setEditingExercise={setEditingExercise}
      /> */}
    </div>
  );
};
