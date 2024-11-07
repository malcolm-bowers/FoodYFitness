import {describe, expect, it} from "vitest";
import ExerciseForm from "../exercise-form.tsx";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import * as exerciseService from "../exercise-service";
import {Exercise} from "../exercise-service";

const mockExercise = {
    id: 1,
    name: "pushups",
    type: "Upper-Body",
    calories: 1.0
}

let nameInput: HTMLElement;
let typeInput: HTMLElement;
let calorieInput: HTMLElement;
let submitButton: HTMLElement;
let clearButton: HTMLElement;

const doRender = (updateExercise: Exercise | null = null) => {
    render(<ExerciseForm selectedExercise={updateExercise} getSelectedExercise={vi.fn()}/>)
    nameInput = screen.getByLabelText(/name/i)
    typeInput = screen.getByRole('combobox', {name: /type/i})
    calorieInput = screen.getByLabelText(/calories\/rep/i)
    submitButton = screen.getByRole('button', {name: /add/i})
    clearButton = screen.getByRole('button', {name: /clear/i})
}

describe("Exercise Form", () => {
    describe("Render Form", () => {
        it("should render the form with heading", () => {
            doRender()
            expect(screen.getByRole('heading', {name: /add new exercise/i})).toBeVisible()
        });
        it("should show the exercise name input field", () => {
            doRender()
            expect(nameInput).toBeVisible()
        })
        it("should show the exercise type input field", () => {
            doRender()
            expect(typeInput).toBeVisible()
        })
        it("should show the calories burned per rep input field", () => {
            doRender()
            expect(calorieInput).toBeVisible()
        })
        it("should show the add button", () => {
            doRender()
            expect(submitButton).toBeVisible()
        })
        it("should show the clear button", () => {
            doRender()
            expect(clearButton).toBeVisible()
        })
    })
    describe("Render Form With Update Props", () => {
        it("should show the the edit heading an exercise is passed in", () => {
            doRender(mockExercise)
            expect(screen.getByRole('heading', {name: /edit exercise/i})).toBeVisible()
        })
        it("should show the selected exercises information in the inputs when a exercise is passed in", () => {
            doRender(mockExercise)
            expect(nameInput).toHaveValue(mockExercise.name);
            expect(typeInput).toHaveTextContent(mockExercise.type);
            expect(calorieInput).toHaveValue(mockExercise.calories)
        })
    })
    describe("Clear Button Functionality", () => {
        it("should clear the form entries", async () => {
            doRender()

            await userEvent.type(nameInput, mockExercise.name);
            await userEvent.click(typeInput);
            await userEvent.click(screen.getByRole('option', {name: /upper-body/i}))
            await userEvent.type(calorieInput, mockExercise.calories.toString());

            expect(nameInput).toHaveValue(mockExercise.name);
            expect(typeInput).toHaveTextContent("Upper-Body");
            expect(calorieInput).toHaveValue(mockExercise.calories);

            await userEvent.click(clearButton);

            expect(nameInput).toHaveValue("");
            expect(screen.queryByText(/upper body/i)).not.toBeInTheDocument();
            expect(calorieInput).toHaveValue(0);
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
            doRender()
            const selectElement = (screen.getByRole('combobox', {name: /type/i}))
            await user.type(nameInput, mockExercise.name);
            await user.click(selectElement);
            await user.click(screen.getByRole('option', {name: /upper-body/i}));
            await user.type(calorieInput, mockExercise.calories.toString());
            await user.click(submitButton);

            expect(saveExerciseSpy).toHaveBeenCalledWith({
                name: mockExercise.name,
                type: mockExercise.type,
                calories: mockExercise.calories
            })
        })
        it('should submit with exercise data for an update call if an exercise is passed in as a prop', async () => {
            const updateExerciseSpy = vi.spyOn(exerciseService, 'updateExercise')
                .mockResolvedValue(mockExercise);
            doRender(mockExercise)
            await userEvent.click(submitButton);
            expect(updateExerciseSpy).toHaveBeenCalledTimes(1);
            expect(updateExerciseSpy).toHaveBeenCalledWith(mockExercise)
            updateExerciseSpy.mockRestore()
        })
    })
})