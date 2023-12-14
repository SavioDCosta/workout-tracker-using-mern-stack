import { useEffect, useState } from "react";
import ExerciseDetails from "../components/ExerciseDetails";
import ExerciseForm from "../components/ExerciseForm";
import { useExerciseContext } from "../hooks/useExerciseContext";
import { useAuthContext } from "../hooks/useAuthContext";

export type Exercise = {
  _id: string;
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
  createdAt: Date;
};

export const ExercisePage: React.FC = () => {
  const { state, dispatch, setEditingExercise } = useExerciseContext();
  const userState = useAuthContext();
  const { exercises } = state;

  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [muscle, setMuscle] = useState<string>("");
  const [equipment, setEquipment] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [buttonName, setButtonName] = useState<"Add" | "Edit">("Add");
  const [error, setError] = useState<string | null>(null);
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

  const handleAdd = () => {
    setName("");
    setType("");
    setMuscle("");
    setEquipment("");
    setDifficulty("");
    setInstructions("");
    setButtonName("Add");
    setError(null);
    setEmptyFields([]);
  };

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await fetch("/api/exercises", {
        headers: {
          Authorization: `Bearer ${userState.state.userAndToken?.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_EXERCISES", payload: json as Exercise[] });
      }
    };
    if (userState.state.userAndToken) {
      fetchExercises();
    }
  }, [dispatch, userState]);

  return (
    <div className="exercise-page">
      <div className="exercises">
        <div className="exercises-header">
          <h2>Exercises</h2>
          <span
            className="material-symbols-outlined add-button"
            onClick={handleAdd}
          >
            add
          </span>
        </div>
        {exercises &&
          exercises.map((exercise: Exercise) => (
            <ExerciseDetails key={exercise._id} exercise={exercise} />
          ))}
      </div>
      <ExerciseForm
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
      />
    </div>
  );
};
