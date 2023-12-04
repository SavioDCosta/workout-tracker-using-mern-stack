import { useEffect, useState } from "react";
import ExerciseDetails from "../components/ExerciseDetails";
import ExerciseForm from "../components/ExerciseForm";

// Define a type for the exercise data
type Exercise = {
  _id: string;
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
  createdAt: Date;
};

const Home = () => {
  // Use the Exercise type in your state
  const [exercises, setExercises] = useState<Exercise[] | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await fetch("/api/exercises/");
      const json = await response.json();
      if (response.ok) {
        setExercises(json);
      }
    };
    fetchExercises();
  }, []);

  return (
    <div className="home">
      <div className="exercises">
        {exercises &&
          exercises.map((exercise) => (
            <ExerciseDetails key={exercise._id} exercise={exercise} />
          ))}
      </div>
      <ExerciseForm />
    </div>
  );
};

export default Home;
