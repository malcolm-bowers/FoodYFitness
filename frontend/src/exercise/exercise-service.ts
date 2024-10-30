import axios from "axios";

export type Exercise = {
    id: number | null;
    name: string;
    type: string;
    calories: number;
}

export type SaveExercise = (data: Partial<Exercise>) => Promise<Exercise>;

export const saveExercise: SaveExercise = (data) => {
    try {
        return axios.post('/api/exercises', data);
    } catch (e) {
        return Promise.reject(e);
    }
}