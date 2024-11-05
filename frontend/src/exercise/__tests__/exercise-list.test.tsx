import {beforeEach, describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import ExerciseList from "../exercise-list.tsx";
import {Exercise} from "../exercise-service.ts";

describe("ExerciseList", () => {
    beforeEach(() => {
        const exercises: Exercise[] = [
            {id: 1, name: "pushups", type: "Upper-Body", calories: 0.5},
            {id: 2, name: "situps", type: "Core", calories: 0.1}
        ]
        render(<ExerciseList exercises={exercises}/>);
    })
    it("should show header", () => {
        expect(screen.getByRole('heading', {name: /exercise list/i})).toBeVisible();
    })
    it("should show the exercise list values for the first exercise", () => {
        expect(screen.getByText(/pushups/i)).toBeVisible();
        expect(screen.getByText(/Upper-Body/i)).toBeVisible();
        expect(screen.getByText(/0.5/i)).toBeVisible()
    })
    it("should show the exercise list values for the second exercise", () => {
        expect(screen.getByText(/situps/i)).toBeVisible()
        expect(screen.getByText(/Core/i)).toBeVisible();
        expect(screen.getByText(/0.1/i)).toBeVisible()
    })
})