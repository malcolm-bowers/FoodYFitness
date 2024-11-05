import Box from "@mui/material/Box";
import {FormControl, InputLabel, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {FormEvent, useState} from "react";
import {Exercise, saveExercise} from "./exercise-service.ts";
import MenuItem from "@mui/material/MenuItem";

const ExerciseForm = () => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [calories, setCalories] = useState(0.0);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let exercise: Partial<Exercise> = {
            name: name,
            type: type,
            calories: calories,
        }
        await saveExercise(exercise);
        setName("");
        setType("");
        setCalories(0);
    }

    const handleClear = () => {
        setName("");
        setType("");
        setCalories(0);
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
                <Typography variant={"h5"}>Add new exercise:</Typography>
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
                        id="type"
                        label="Type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <MenuItem value={"upperbody"}>Upper Body</MenuItem>
                        <MenuItem value={"lowerbody"}>Lower Body</MenuItem>
                        <MenuItem value={"core"}>Core</MenuItem>
                        <MenuItem value={"fullbody"}>Full Body</MenuItem>
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
                    onChange={(e) => setCalories(parseFloat(e.target.value))}
                />
                <Button id="sumbit" type="submit" variant="contained">
                    Add
                </Button>
            </Box>
        </Box>
    )
}
export default ExerciseForm;