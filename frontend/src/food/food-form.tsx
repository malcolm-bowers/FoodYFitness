import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {TextField} from "@mui/material";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import {useState} from "react";
import {foodSearch, saveFood} from "./food-service.ts";
import Button from "@mui/material/Button";


const createMockFoodFromAPI = (
    name: string,
    gramsPerServing: number,
    caloriesPerServing: number,
) => {
    return {name, gramsPerServing, caloriesPerServing};
}

const results = [
    createMockFoodFromAPI('Glazed Donut', 23, 275),
    createMockFoodFromAPI('Chocolate Donut', 35, 325),
]

interface FoodFormProps {
    handleCloseForm?: () => void,
    refreshFoods?: () => void
}

const FoodForm = ({handleCloseForm, refreshFoods}: FoodFormProps) => {
    const [searchText, setSearchText] = useState("");
    const [name, setName] = useState("");
    const [servings, setServings] = useState(1);
    const [gramsPerServing, setGramsPerServing] = useState(0);
    const [caloriesPerServing, setCaloriesPerServing] = useState(0);

    const handleSearch = (searchText: string) => {
        foodSearch(searchText);
    }

    const handleSubmit = () => {
        saveFood(
            name,
            servings,
            gramsPerServing,
            caloriesPerServing
        )
        if (refreshFoods) {
            refreshFoods()
        }
        if (handleCloseForm) {
            handleCloseForm();
        }
    }

    return (
        <Box className={"foodFormPopup"} justifyContent={"center"}>
            <Typography variant={"h4"}>Add Food Form:</Typography>
            <Box
                component="form"
                display="flex"
                autoComplete="off"
                noValidate
                alignItems="center"
                paddingY={'10px'}
                onSubmit={() => handleSearch(searchText)}
            >
                <TextField
                    style={{flex: "1"}}
                    id="search"
                    label="Search"
                    variant="outlined"
                    onChange={(e) => setSearchText(e.target.value)}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position={"end"}>
                                    <IconButton aria-label="search" onClick={() => handleSearch(searchText)}>
                                        <SearchIcon/>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    }}

                />
            </Box>
            <Box>
                <Typography variant={"h6"}>Results:</Typography>
                <TableContainer sx={{border: '1px solid grey', borderRadius: '4px', overflow: 'true', height: '150px'}}>
                    <Table stickyHeader sx={{minWidth: 400}} aria-label="result table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Grams/Serving</TableCell>
                                <TableCell align="right">Calories/Serving</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {results.map((result) => (
                                <TableRow
                                    key={result.name}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component={"th"} scope={"row"}>
                                        {result.name}
                                    </TableCell>
                                    <TableCell>{result.gramsPerServing}</TableCell>
                                    <TableCell>{result.caloriesPerServing}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box
                component="form"
                display="flex"
                flexDirection="column"
                autoComplete="off"
                noValidate
                alignItems="center"
                gap="10px"
            >
                <Typography variant={"h6"} style={{paddingTop: "15px"}}>New Food:</Typography>
                <TextField
                    style={{flex: "1"}}
                    id="name"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    style={{flex: "1"}}
                    id="servings"
                    label="Servings"
                    variant="outlined"
                    type="number"
                    fullWidth
                    onChange={(e) => setServings(parseInt(e.target.value))}
                />
                <TextField
                    style={{flex: "1"}}
                    id="gramsPerServing"
                    label="Grams/Serving"
                    variant="outlined"
                    type="number"
                    fullWidth
                    onChange={(e) => setGramsPerServing(parseInt(e.target.value))}
                />
                <TextField
                    style={{flex: "1"}}
                    id="caloriesPerServing"
                    label="Calories/Serving"
                    variant="outlined"
                    type="number"
                    fullWidth
                    onChange={(e) => setCaloriesPerServing(parseInt(e.target.value))}
                />
                <Box
                    paddingTop={'15px'}
                    display="flex"
                    flexDirection="row"
                    gap="10px"
                    width="100%"
                >
                    <Button
                        style={{flex: "1"}}
                        variant="contained"
                        color="primary"
                        onClick={handleCloseForm}
                    >
                        Cancel
                    </Button>
                    <Button
                        style={{flex: "1"}}
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Add Food
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
export default FoodForm