export type Food = {
    name: string;
    servings: number;
    gramsPerServing: number;
    caloriesPerServing: number;
    totalCalories: number;
}

const foods: Food[] = [
    { name: 'Glazed Donut', servings: 1, gramsPerServing: 55, caloriesPerServing: 275, totalCalories: 275 }
];

export const getFoods = () => foods;

export const foodSearch = (searchText: string) => {
    confirm(`Searching for ${searchText}`);
}

export const saveFood = (
    name: string,
    servings: number,
    gramsPerServing: number,
    caloriesPerServing: number,
) => {
    const totalCalories: number = servings * caloriesPerServing;
    const newFood = {name, servings, gramsPerServing, caloriesPerServing, totalCalories};
    foods.push(newFood);
    return newFood;
}
