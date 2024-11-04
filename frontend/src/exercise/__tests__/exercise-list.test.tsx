import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import ExerciseList from "../exercise-list.tsx";

describe("ExerciseList", () => {
    it("should render header", () => {
        render(<ExerciseList />);
        expect(screen.getByRole('heading', {name: /exercise list/i})).toBeVisible();
    })
    it("should render the exercise list", () => {
        render(<ExerciseList />);

    })
})