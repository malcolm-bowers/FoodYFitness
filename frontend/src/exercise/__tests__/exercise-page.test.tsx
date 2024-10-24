import {describe, expect, it} from "vitest";
import ExercisePage from "../exercise-page.tsx";
import {render, screen} from "@testing-library/react";

describe("Exercise Page", () => {
    it("renders correctly", () => {
        render(<ExercisePage/>);
        expect(screen.getByRole('heading', {name: /exercise page/i})).toBeVisible();
    });


});