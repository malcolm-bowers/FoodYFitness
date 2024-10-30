import ExerciseForm from "./exercise-form.tsx";
import Box from "@mui/material/Box";

const ExercisePage = () => {
    return (
        <Box className="page-container">
            <h1 className="page-header">Exercise Page</h1>
            <ExerciseForm />
        </Box>
    )
}
export default ExercisePage