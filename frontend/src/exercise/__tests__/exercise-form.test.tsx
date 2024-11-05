import {beforeEach, describe, expect, it} from "vitest";
import ExerciseForm from "../exercise-form.tsx";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import * as exerciseService from "../exercise-service";

describe("Exercise Form", () => {
    const mockExercise = {
        id: 1,
        name: "pushups",
        type: "Upper-Body",
        calories: 1.0
    }

    describe("Render Form", () => {
        beforeEach(() => {
            render(<ExerciseForm/>);
        })
        it("should render the form with heading", () => {
            expect(screen.getByRole('heading', {name: /add new exercise/i})).toBeVisible()
        });
        it("should show the exercise name input field", () => {
            expect(screen.getByLabelText(/name/i)).toBeVisible()
        })
        it("should show the exercise type input field", () => {
            expect(screen.getByLabelText(/type/i)).toBeVisible()
        })
        it("should show the calories burned per rep input field", () => {
            expect(screen.getByLabelText(/calories\/rep/i)).toBeVisible()
        })
        it("should show the add button", () => {
            expect(screen.getByRole('button', {name: /add/i})).toBeVisible()
        })
        it("should show the clear button", () => {
            expect(screen.getByRole('button', {name: /clear/i})).toBeVisible()
        })
    })
    describe("Clear Button Functionality", () => {
        it("should clear the form entries", async () => {
            render(<ExerciseForm/>);
            const nameInput = screen.getByLabelText(/name/i);
            const typeSelect = screen.getByLabelText(/type/i)
            const caloriesInput = screen.getByLabelText(/calories/i);

            await userEvent.type(nameInput, mockExercise.name);
            await userEvent.click(typeSelect);
            await userEvent.click(screen.getByRole('option', {name: /upper-body/i}))
            await userEvent.type(caloriesInput, mockExercise.calories.toString());

            expect(nameInput).toHaveValue(mockExercise.name);
            expect(typeSelect).toHaveTextContent("Upper-Body");
            expect(caloriesInput).toHaveValue(mockExercise.calories);

            await userEvent.click(screen.getByRole('button', {name: /clear/i}));

            expect(nameInput).toHaveValue("");
            expect(screen.queryByText(/upper body/i)).not.toBeInTheDocument();
            expect(caloriesInput).toHaveValue(0);
        })
    })
    describe("Form Submission", () => {
        it("should submit with exercise data for a create new exercise", async () => {

            const saveExerciseSpy = vi.spyOn(exerciseService, 'saveExercise')
                .mockResolvedValue({
                    id: 1,
                    name: "pushups",
                    type: "Upper-Body",
                    calories: 1.0
                })
            const user = userEvent.setup()
            render(<ExerciseForm/>);
            const selectElement = (screen.getByRole('combobox', {name: /type/i}))
            await user.type(screen.getByLabelText(/name/i), mockExercise.name);
            await user.click(selectElement);
            await user.click(screen.getByRole('option', {name: /upper-body/i}));
            await user.type(screen.getByLabelText(/calories/i), mockExercise.calories.toString());
            await user.click(screen.getByRole('button', {name: /add/i}));

            expect(saveExerciseSpy).toHaveBeenCalledWith({
                name: mockExercise.name,
                type: mockExercise.type,
                calories: 1.0
            })
        })
    })
})