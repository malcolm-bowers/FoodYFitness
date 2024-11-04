import axios, {AxiosResponse} from "axios";

export type Exercise = {
    id: number | null;
    name: string;
    type: string;
    calories: number;
}
type DeleteExercise = (id: number | null) => Promise<void>;

export const saveExercise = (data: Partial<Exercise>) => {
    try {
        return axios.post('/api/exercise', data)
            .then((r: AxiosResponse<Exercise>) => r.data);
    } catch (e) {
        return Promise.reject(e);
    }
}

export const fetchExercise = () => {
    try {
        return axios.get<Exercise[]>('/api/exercise')
            .then((r: AxiosResponse<Exercise[]>) => r.data);
    } catch (e) {
        return Promise.reject(e);
    }
}

export const deleteExercise: DeleteExercise = (id: number | null) => (
    axios.delete(`/api/exercise/${id}`)
        .then((r: AxiosResponse) => r.data)
);

export const updateExercise = (id: number, data: Partial<Exercise>): Promise<Exercise> => {
    try {
        return axios.put(`/api/exercise/${id}`, data)
            .then((r: AxiosResponse<Exercise>) => r.data);
    } catch (e) {
        return Promise.reject(e);
    }
}