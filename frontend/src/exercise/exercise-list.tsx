import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteExercise, Exercise} from './exercise-service.ts';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface ExerciseTableProps {
    exercises: Exercise[];
    getSelectedExercise: (exercise: Exercise) => void
}

export default function ExerciseList({exercises, getSelectedExercise}: ExerciseTableProps) {
    const handleDelete = (exercise: Exercise) => {
        if (confirm(`Are you sure you want to delete this "${exercise.name}"?`)){
            deleteExercise(exercise.id);
        }
    }
    const handleEdit = (exercise: Exercise) => {
        getSelectedExercise(exercise)
    }

    return (
        <Box>
            <Typography variant={"h5"}>
                Exercise List
            </Typography>
            <TableContainer component={Paper} style={{backgroundColor: "rgba(255, 255, 255, 0.5)"}}>
                <Table sx={{minWidth: 650}} aria-label="exercise table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Exercise Name</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Calories per Rep</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {exercises.map((exercise) => (
                            <TableRow key={exercise.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell component="th" scope="row">
                                    {exercise.name}
                                </TableCell>
                                <TableCell align="right">{exercise.type}</TableCell>
                                <TableCell align="right">{exercise.calories}</TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="edit" onClick={() => handleEdit(exercise)}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => handleDelete(exercise)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}