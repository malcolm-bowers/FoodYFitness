import {beforeEach, describe, expect, it} from "vitest";
import {render, screen, within} from "@testing-library/react";
import ExerciseList from "../exercise-list.tsx";
import {Exercise} from "../exercise-service.ts";
import * as exerciseService from "../exercise-service.ts"
import {userEvent} from "@testing-library/user-event";

let mockExercises: Exercise[] ;

describe("ExerciseList", () => {
    beforeEach(() => {
        mockExercises = [
            {id: 1, name: "pushups", type: "Upper-Body", calories: 0.5},
            {id: 2, name: "situps", type: "Core", calories: 0.1}
        ]
        render(<ExerciseList exercises={mockExercises}/>);
    })
    describe("Renders correctly", () => {
        it("should show header", () => {
            expect(screen.getByRole('heading', {name: /exercise list/i})).toBeVisible();
        })
        it("should show the exercise list values for the first exercise", () => {
            expect(screen.getByText(/pushups/i)).toBeVisible();
            expect(screen.getByText(/Upper-Body/i)).toBeVisible();
            expect(screen.getByText(/0.5/i)).toBeVisible();
            expect(screen.getAllByRole('button', {name: /edit/i})[0]).toBeVisible();
            expect(screen.getAllByRole('button', {name: /delete/i})[0]).toBeVisible();
        })
        it("should show the exercise list values for the second exercise", () => {
            expect(screen.getByText(/situps/i)).toBeVisible();
            expect(screen.getByText(/Core/i)).toBeVisible();
            expect(screen.getByText(/0.1/i)).toBeVisible();
            expect(screen.getAllByRole('button', {name: /edit/i})[1]).toBeVisible();
            expect(screen.getAllByRole('button', {name: /delete/i})[1]).toBeVisible();
        })
    })
    describe("Delete button", () => {
        it('should call delete exercise when delete button is clicked', async () => {
            const mockDeleteExercise = vi.spyOn(exerciseService, 'deleteExercise')
                .mockResolvedValue();
            vi.spyOn(window, 'confirm').mockReturnValueOnce(true)
            render(<ExerciseList exercises={mockExercises}/>);

            const listItems = await screen.getAllByRole('row');
            const exerciseToDelete = listItems[1];

            await userEvent.click(within(exerciseToDelete).getByRole('button', {name: /delete/i}));

            expect(mockDeleteExercise).toHaveBeenCalledOnce();
            expect(mockDeleteExercise).toHaveBeenCalledWith(1);
        })
    })
})