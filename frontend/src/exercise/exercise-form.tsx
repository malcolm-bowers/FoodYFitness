import Box from "@mui/material/Box";
import {FormControl, InputLabel, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {FormEvent, useEffect, useState} from "react";
import {Exercise, saveExercise, updateExercise} from "./exercise-service.ts";
import MenuItem from "@mui/material/MenuItem";

interface ExerciseFromProps {
    selectedExercise?: Exercise | null,
    getSelectedExercise: (exercise: (Exercise | null)) => void
}

const ExerciseForm = ({selectedExercise, getSelectedExercise}: ExerciseFromProps) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [calories, setCalories] = useState(0.0);

    useEffect(() => {
        if (selectedExercise) {
            setName(selectedExercise.name);
            setType(selectedExercise.type);
            setCalories(selectedExercise.calories);
        }
    }, [selectedExercise]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(selectedExercise) {
            const exercise = {
                id: selectedExercise.id,
                name,
                type,
                calories
            }
            await updateExercise(exercise);
        } else {
            const newExercise = {
                name,
                type,
                calories,
            }
            await saveExercise(newExercise);
        }
        handleClear()
    }

    const handleClear = () => {
        setName("");
        setType("");
        setCalories(0.0);
        if(selectedExercise) {
            getSelectedExercise(null);
        }
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px",
                }}
            >
                <Typography variant={"h5"}>
                    {selectedExercise ? `Edit Exercise: "${selectedExercise.name}"` : 'Add new exercise:'}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClear}
                >
                    Clear
                </Button>
            </Box>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                display="flex"
                alignItems="center"
                gap="20px"
                padding='10px'
                onSubmit={handleSubmit}
            >
                <TextField
                    style={{flex: "2"}}
                    id="name"
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <FormControl fullWidth sx={{flex: 2}}>
                    <InputLabel id="type" htmlFor="type">Type</InputLabel>
                    <Select
                        labelId="type"
                        label="Type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                     variant={'outlined'}>
                        <MenuItem value={"Upper-Body"}>Upper-Body</MenuItem>
                        <MenuItem value={"Lower-Body"}>Lower-Body</MenuItem>
                        <MenuItem value={"Core"}>Core</MenuItem>
                        <MenuItem value={"Full-Body"}>Full-Body</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    style={{flex: "1"}}
                    id="calories"
                    label="Calories/Rep"
                    variant="outlined"
                    slotProps={{
                        htmlInput: {
                            type: "number",
                            step: "any"
                        }
                    }}
                    value={calories}
                    onChange={(e) => {
                        const value = parseFloat(e.target.value)
                        setCalories(isNaN(value) ? 0 : value)
                    }}
                />
                <Button id="sumbit" type="submit" variant="contained">
                    Add
                </Button>
            </Box>
        </Box>
    )
}
export default ExerciseForm;