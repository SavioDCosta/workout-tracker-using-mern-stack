import React, { useState, FormEvent } from "react";

const ExerciseForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [muscle, setMuscle] = useState<string>("");
  const [equipment, setEquipment] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

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
      console.log("Error", error);
    } else {
      setName("");
      setType("");
      setMuscle("");
      setEquipment("");
      setDifficulty("");
      setInstructions("");
      setError(null);
      console.log("Exercise added", json);
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
      />
      <label>Type:</label>
      <input
        type="text"
        onChange={(e) => setType(e.target.value)}
        value={type}
      />
      <label>Muscle:</label>
      <input
        type="text"
        onChange={(e) => setMuscle(e.target.value)}
        value={muscle}
      />
      <label>Equipment:</label>
      <input
        type="text"
        onChange={(e) => setEquipment(e.target.value)}
        value={equipment}
      />
      <label>Difficulty:</label>
      <input
        type="text"
        onChange={(e) => setDifficulty(e.target.value)}
        value={difficulty}
      />
      <label>Instructions:</label>
      <input
        type="text"
        onChange={(e) => setInstructions(e.target.value)}
        value={instructions}
      />
      <button>Add Exercise</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ExerciseForm;
