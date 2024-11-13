import Box from "@mui/material/Box";
import FoodList from "./food-list.tsx";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import FoodForm from "./food-form.tsx";
import {Dialog} from "@mui/material";
import {getFoods} from "./food-service.ts";

const FoodPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [foods, setFoods] = useState(getFoods());

    const refreshFoods = () => {
        setFoods([...getFoods()]); // Spread to trigger re-render
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
            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                }}
            >
                <FoodList foods={foods} />
            </Box>
            <Box style={{display: "flex", justifyContent: "flex-end"}}>
                <Button variant={"contained"} onClick={handleOpenForm}>Add Food</Button>
            </Box>
            <Dialog
                open={showForm}
                onClose={handleCloseForm}
            >
                <FoodForm handleCloseForm={handleCloseForm} refreshFoods={refreshFoods} />
            </Dialog>
        </Box>
    )
}
export default FoodPage