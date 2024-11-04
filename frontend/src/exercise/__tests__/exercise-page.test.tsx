import {beforeEach, describe, expect, it} from "vitest";
import ExercisePage from "../exercise-page.tsx";
import {render, screen} from "@testing-library/react";

describe("Exercise Page", () => {
    describe("Rendering Components", () => {
        beforeEach(() => {
            render(<ExercisePage/>);
        })
        it("should render correctly with heading", () => {
            expect(screen.getByRole('heading', {name: /exercise page/i})).toBeVisible();
        });
        it("should show the exercise list component", () => {
            expect(screen.getByRole('heading', {name: /exercise list/i})).toBeVisible()
        })

        it("should render the exercise form", () => {
            expect(screen.getByRole('heading', {name: /add new exercise/i})).toBeVisible();
        })
    })
});