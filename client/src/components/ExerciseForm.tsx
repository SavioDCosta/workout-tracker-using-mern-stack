import React, { FormEvent, useEffect } from "react";
import { useExerciseContext } from "../hooks/useExerciseContext";
import { Exercise } from "../pages/ExercisePage";

interface ExerciseFormProps {
  name: string;
  setName: (value: string) => void;
  type: string;
  setType: (value: string) => void;
  muscle: string;
  setMuscle: (value: string) => void;
  equipment: string;
  setEquipment: (value: string) => void;
  difficulty: string;
  setDifficulty: (value: string) => void;
  instructions: string;
  setInstructions: (value: string) => void;
  buttonName: "Add" | "Edit";
  setButtonName: (value: "Add" | "Edit") => void;
  error: string | null;
  setError: (value: string | null) => void;
  emptyFields: string[];
  setEmptyFields: (value: string[] | []) => void;
  setEditingExercise: (exercise: Exercise | null) => void;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({
  name,
  setName,
  type,
  setType,
  muscle,
  setMuscle,
  equipment,
  setEquipment,
  difficulty,
  setDifficulty,
  instructions,
  setInstructions,
  buttonName,
  setButtonName,
  error,
  setError,
  emptyFields,
  setEmptyFields,
  setEditingExercise,
}) => {
  const { dispatch, editingExercise } = useExerciseContext();

  useEffect(() => {
    if (editingExercise) {
      setName(editingExercise.name);
      setType(editingExercise.type);
      setMuscle(editingExercise.muscle);
      setEquipment(editingExercise.equipment);
      setDifficulty(editingExercise.difficulty);
      setInstructions(editingExercise.instructions);
      setError(null);
      setEmptyFields([]);
      setEditingExercise(editingExercise);
      setButtonName("Edit");
    }
  }, [editingExercise]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const exercise = {
      name,
      type,
      muscle,
      equipment,
      difficulty,
      instructions,
    };

    if (exercise.name === "") {
      emptyFields.push("name");
    }
    if (exercise.type === "") {
      emptyFields.push("type");
    }
    if (exercise.muscle === "") {
      emptyFields.push("muscle");
    }
    if (exercise.equipment === "") {
      emptyFields.push("equipment");
    }
    if (exercise.difficulty === "") {
      emptyFields.push("difficulty");
    }
    if (exercise.instructions === "") {
      emptyFields.push("instructions");
    }

    if (editingExercise) {
      const response = await fetch("/api/exercises/" + editingExercise._id, {
        method: "PATCH",
        body: JSON.stringify(exercise),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
        setEmptyFields(emptyFields);
      } else {
        setName("");
        setType("");
        setMuscle("");
        setEquipment("");
        setDifficulty("");
        setInstructions("");
        setError(null);
        setEmptyFields([]);
        setEditingExercise(null);
        setButtonName("Add");
        console.log("Exercise edited", json);
        dispatch({ type: "UPDATE_EXERCISE", payload: json });
      }
    } else {
      const response = await fetch("/api/exercises/", {
        method: "POST",
        body: JSON.stringify(exercise),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
        setEmptyFields(emptyFields);
      } else {
        setName("");
        setType("");
        setMuscle("");
        setEquipment("");
        setDifficulty("");
        setInstructions("");
        setError(null);
        setEmptyFields([]);
        console.log("Exercise added", json);
        dispatch({ type: "CREATE_EXERCISE", payload: json });
      }
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>{buttonName} an exercise</h3>
      <label>Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes("name") ? "error" : ""}
      />
      <label>Type:</label>
      <input
        type="text"
        onChange={(e) => setType(e.target.value)}
        value={type}
        className={emptyFields.includes("type") ? "error" : ""}
      />
      <label>Muscle:</label>
      <input
        type="text"
        onChange={(e) => setMuscle(e.target.value)}
        value={muscle}
        className={emptyFields.includes("muscle") ? "error" : ""}
      />
      <label>Equipment:</label>
      <input
        type="text"
        onChange={(e) => setEquipment(e.target.value)}
        value={equipment}
        className={emptyFields.includes("equipment") ? "error" : ""}
      />
      <label>Difficulty:</label>
      <input
        type="text"
        onChange={(e) => setDifficulty(e.target.value)}
        value={difficulty}
        className={emptyFields.includes("difficulty") ? "error" : ""}
      />
      <label>Instructions:</label>
      <input
        type="text"
        onChange={(e) => setInstructions(e.target.value)}
        value={instructions}
        className={emptyFields.includes("instructions") ? "error" : ""}
      />
      <button>{buttonName} Exercise</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ExerciseForm;
