import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";
import {Slider} from "@mui/material";
import {useEffect, useState} from "react";

const exerciseArray = [
    {
        name: "Push-ups",
        caloriesPerRep: 0.36,
    },
    {
        name: "Sit-ups",
        caloriesPerRep: 0.25,
    },
    {
        name: "Squats",
        caloriesPerRep: 0.45,
    }
]

const valuetext = (value: number) => {
    return `${value}%`;
}

interface ExerciseCalculatorProps {
    totalCalories: number;
}

export const ExerciseCalculator = ({totalCalories}: ExerciseCalculatorProps) => {
    const [percentages, setPercentages] = useState<number[]>(Array(exerciseArray.length).fill(0));
    const [totalPercentage, setTotalPercentage] = useState(0);

    const handleSliderChange = (index: number, value: number) => {
        const newPercentages = [...percentages];
        newPercentages[index] = value;
        setPercentages(newPercentages);
    };

    // Calculate required reps
    const calculateReps = (caloriesPerRep: number, percentage: number) => {
        const targetCalories = (totalCalories * percentage) / 100;
        return Math.ceil(targetCalories / caloriesPerRep);
    };

    useEffect(() => {
        const total = percentages.reduce((sum, percentage) => sum + percentage, 0);
        setTotalPercentage(total);
    }, [percentages]);

    return (
        <Box padding={2}>
            <Typography variant={"h6"}>Exercise Calculator</Typography>
            <TableContainer>
                <Table sx={{minWidth: 650}} aria-label="exercise calculate table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name:</TableCell>
                            <TableCell>Calories/Rep:</TableCell>
                            <TableCell>Adjustment:</TableCell>
                            <TableCell align={"right"}>Reps:</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {exerciseArray.map((item, index) => (
                            <TableRow
                                key={item.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component={"th"} scope={"row"}>
                                    {item.name}
                                </TableCell>
                                <TableCell>{item.caloriesPerRep}</TableCell>
                                <TableCell>
                                    <Slider
                                        aria-label="percentage"
                                        value={percentages[index]}
                                        getAriaValueText={valuetext}
                                        valueLabelDisplay="auto"
                                        onChange={(_e, value) => handleSliderChange(index, value as number)}
                                        min={0}
                                        max={100}
                                    />
                                </TableCell>
                                <TableCell align={"right"}>
                                    {calculateReps(item.caloriesPerRep, percentages[index])}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box mt={2}>
                <Typography
                    variant="h6"
                    style={{color: totalPercentage > 100 ? "red" : "inherit"}}
                >
                    Total Percentage: {totalPercentage}%
                </Typography>
            </Box>
        </Box>
    )
}