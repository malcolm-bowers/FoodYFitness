import ExerciseForm from "./exercise-form.tsx";
import Box from "@mui/material/Box";
import ExerciseList from "./exercise-list.tsx";

const ExercisePage = () => {
    return (
        <Box className="page-container">
            <h1 className="page-header">Exercise Page</h1>
            <ExerciseList />
            <ExerciseForm />
        </Box>
    )
}
export default ExercisePage