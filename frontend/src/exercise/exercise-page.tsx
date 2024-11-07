import ExerciseForm from "./exercise-form.tsx";
import Box from "@mui/material/Box";
import ExerciseList from "./exercise-list.tsx";
import {Exercise, fetchExercise} from "./exercise-service.ts";
import {useEffect, useState} from "react";

const ExercisePage = () => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

    const getSelectedExercise = (exercise: Exercise | null) => {
        setSelectedExercise(exercise)
    }

    useEffect(() => {
        fetchExercise().then(d => setExercises(d))
    }, [exercises]);

    return (
        <Box className="page-container">
            <h1 className="page-header">Exercises:</h1>
            <ExerciseList exercises={exercises} getSelectedExercise={getSelectedExercise}/>
            <ExerciseForm selectedExercise={selectedExercise} getSelectedExercise={getSelectedExercise}/>
        </Box>
    )
}
export default ExercisePage