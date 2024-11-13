import Box from "@mui/material/Box";
import FoodList from "./food-list.tsx";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import FoodForm from "./food-form.tsx";
import {Dialog} from "@mui/material";
import {getFoods} from "./food-service.ts";
import {ExerciseCalculator} from "../exercise/exercise-calculator.tsx";

const FoodPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [foods, setFoods] = useState(getFoods());
    const [totalCalories, setTotalCalories] = useState(0);

    const refreshFoods = () => {
        const updatedFoods = getFoods();
        setFoods([...updatedFoods]);

        const total = updatedFoods.reduce((sum, food) => sum + food.totalCalories, 0);
        setTotalCalories(total);
    };

    useEffect(() => {
        refreshFoods();
    }, []); // Initial load

    const handleOpenForm = () => {
        setShowForm(true);
    }

    const handleCloseForm = () => {
        setShowForm(false);
    }

    return (
        <Box className="food-page" style={{padding: "20px"}}>
            <h1 className="page-header">Food Page</h1>
            <FoodList foods={foods} />
            <Box style={{display: "flex", justifyContent: "flex-end"}}>
                <Button variant={"contained"} onClick={handleOpenForm}>Add Food</Button>
            </Box>
            <Dialog
                open={showForm}
                onClose={handleCloseForm}
            >
                <FoodForm handleCloseForm={handleCloseForm} refreshFoods={refreshFoods} />
            </Dialog>
            <ExerciseCalculator totalCalories={totalCalories} />
        </Box>
    )
}
export default FoodPage