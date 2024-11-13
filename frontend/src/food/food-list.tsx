import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {Food} from "./food-service.ts";
import {useEffect, useState} from "react";

interface FoodProps {
    foods: Food[],
}

const FoodList = ({foods}: FoodProps) => {
const [total, setTotal] = useState(0);

    useEffect(() => {
        const totalCalories = foods.reduce((sum, food) => sum + food.totalCalories, 0);
        setTotal(totalCalories);
    }, [foods]);

    return (
        <Box padding={2}>
            <Typography
                variant={'h5'}
                style={{}}
            >
                Food List
            </Typography>
            <TableContainer>
                <Table sx={{minWidth: 650}} aria-label="food table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name:</TableCell>
                            <TableCell align={"right"}>Servings:</TableCell>
                            <TableCell align={"right"}>Grams/Serving:</TableCell>
                            <TableCell align={"right"}>Calories/Serving:</TableCell>
                            <TableCell align={"right"}>Total Calories:</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {foods.map((food) => (
                            <TableRow
                                key={food.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component={"th"} scope={"row"}>
                                    {food.name}
                                </TableCell>
                                <TableCell align={"right"}>{food.servings}</TableCell>
                                <TableCell align={"right"}>{food.gramsPerServing}</TableCell>
                                <TableCell align={"right"}>{food.caloriesPerServing}</TableCell>
                                <TableCell align={"right"}>{food.totalCalories}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px"
                }}
            >
                <Typography>Total Calories:</Typography>
                <Typography>{total}</Typography>
            </Box>
        </Box>
    )
}
export default FoodList