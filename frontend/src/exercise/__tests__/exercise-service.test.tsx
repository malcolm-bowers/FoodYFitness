import axios from "axios";
import {setupServer} from "msw/node";
import {describe, it} from "vitest";
import {http, HttpResponse} from "msw";
import {deleteExercise, Exercise, fetchExercise, saveExercise, updateExercise} from "../exercise-service.ts";

describe("ExerciseService", () => {

    axios.defaults.baseURL = "http://localhost:3000"

    const server = setupServer()
    beforeAll(() => server.listen({onUnhandledRequest: 'error'}))
    afterAll(() => server.close())
    afterEach(() => server.resetHandlers())

    it("Should make a call to the exercise api with a partial exercise", async () => {
        const expected: Exercise = {
            id: 1,
            name: "pushups",
            type: "upperbody",
            calories: 10
        }

        server.use(http.post('/api/exercise', () =>
            HttpResponse.json(expected, {status: 201})
        ))

        const response = await saveExercise(expected)
        expect(response).toStrictEqual(expected);
    })
    it('should send a get request to fetch existing exercises', async () => {
        const expected: Exercise[] = [
            {id: 1, name: 'pushups', type: 'upperbody', calories: 10},
            {id: 2, name: 'situps', type: 'core', calories: 5},
            {id: 3, name: 'squats', type: 'lowerbody', calories: 20},
        ];

        server.use(http.get('/api/exercise', () =>
            HttpResponse.json(expected, {status: 201})
        ))

        expect(await fetchExercise()).toStrictEqual(expected)
    })
    it('should send a delete request to delete existing exercise by id', async () => {
        const mockId = 1;

        const axiosDeleteMock = vi.spyOn(axios, 'delete').mockResolvedValueOnce({
            data: mockId,
            status: 200,
        });

        const result: void = await deleteExercise(mockId);

        expect(axiosDeleteMock).toHaveBeenCalledWith(`/api/exercise/${mockId}`);

        expect(result).toBe(mockId);

        axiosDeleteMock.mockRestore();
    })

    it('should send an update request to update existing exercise by id', async () => {
        const mockExercise = {
            id: 1,
            name: 'pushups',
            type: 'upperbody',
            calories: 20
        };

        const axiosPutMock = vi.spyOn(axios, 'put').mockResolvedValueOnce({
            data: mockExercise,
            status: 200,
        })

        const result = await updateExercise(mockExercise.id, mockExercise);

        expect(axiosPutMock).toHaveBeenCalledWith(`/api/exercise/${mockExercise.id}`, mockExercise);

        expect(result).toBe(mockExercise);

        axiosPutMock.mockRestore();
    })
})