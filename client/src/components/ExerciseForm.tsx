import React, { useState, FormEvent } from "react";
import { useExerciseContext } from "../hooks/useExerciseContext";

const ExerciseForm: React.FC = () => {
  const { dispatch } = useExerciseContext();
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [muscle, setMuscle] = useState<string>("");
  const [equipment, setEquipment] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

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
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new exercise</h3>
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
      <button>Add Exercise</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ExerciseForm;
