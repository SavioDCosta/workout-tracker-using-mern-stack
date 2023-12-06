import { useEffect } from "react";
import ExerciseDetails from "../components/ExerciseDetails";
import ExerciseForm from "../components/ExerciseForm";
import { useExerciseContext } from "../hooks/useExerciseContext";

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

const Home: React.FC = () => {
  const { state, dispatch } = useExerciseContext();
  const { exercises } = state;

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await fetch("/api/exercises/");
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_EXERCISES", payload: json as Exercise[] });
      }
    };
    fetchExercises();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="exercises">
        {exercises &&
          exercises.map((exercise: Exercise) => (
            <ExerciseDetails key={exercise._id} exercise={exercise} />
          ))}
      </div>
      <ExerciseForm />
    </div>
  );
};

export default Home;
