import axios from "axios";
import {setupServer} from "msw/node";
import {afterAll, describe, it} from "vitest";
import {http, HttpResponse} from "msw";
import {saveExercise} from "../exercise-service.ts";

describe("ExerciseService", () => {

    axios.defaults.baseURL ="http://localhost:3000"

    const server = setupServer()
    beforeAll(() => server.listen({onUnhandledRequest: 'error'}))
    afterAll(() => server.close())
    afterEach(() => server.resetHandlers())

    describe("saveExercise", () => {
        it("Should make a call to the exercise api with a partial exercise", async () => {
            const expected = {
                id: 1,
                name: "pushups",
                type: "upperbody",
                calories: 10
            }

            server.use(http.post('/api/exercises', () =>
                HttpResponse.json(expected, {status: 201})
            ))
            expect(await saveExercise('pushups')).toStrictEqual(expected);
        })
    })
})