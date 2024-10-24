import {describe, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import FoodPage from "../food-page.tsx";

describe("Food Page", () => {
    it("Should render correctly", async () => {
        render(<FoodPage/>);
        expect(screen.getByRole('heading', {name: /food page/i})).toBeVisible()
    })
})