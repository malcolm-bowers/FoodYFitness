import axios, {AxiosResponse} from "axios";

export type Exercise = {
    id: number | null;
    name: string;
    type: string;
    calories: number;
}
type DeleteExercise = (id: number | null) => Promise<void>;

export const saveExercise = async (data: Partial<Exercise>) => {
    try {
        const r = await axios.post('/api/exercise', data);
        return r.data;
    } catch (e) {
        return Promise.reject(e);
    }
}

export const fetchExercise = async () => {
    try {
        const r = await axios.get<Exercise[]>('/api/exercise');
        return r.data;
    } catch (e) {
        return Promise.reject(e);
    }
}

export const deleteExercise: DeleteExercise = (id: number | null) => (
    axios.delete(`/api/exercise/${id}`)
        .then((r: AxiosResponse) => r.data)
);

export const updateExercise = async (data: Exercise): Promise<Exercise> => {
    try {
        const r = await axios.put(`/api/exercise/${data.id}`, data);
        return r.data;
    } catch (e) {
        return Promise.reject(e);
    }
}