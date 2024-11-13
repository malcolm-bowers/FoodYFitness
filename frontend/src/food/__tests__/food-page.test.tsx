import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import FoodPage from "../food-page.tsx";
import {userEvent} from "@testing-library/user-event";

const doRender = () => {
    render(<FoodPage/>)
}

describe("Food Page", () => {
    describe("Render", () => {
        it("should render the food page header", async () => {
            doRender()
            expect(screen.getByRole('heading', {name: /food page/i})).toBeVisible()
        })
        it('should render the food list header', async () => {
            doRender()
            expect(screen.getByRole('heading', {name: /food list/i})).toBeVisible()
        })
        it('should show the button at the bottom of the food list to add a new food to the list', () => {
            doRender()
            expect(screen.getByRole('button', {name: /add food/i})).toBeVisible()
        })
    })
    describe("Add food button", () => {
        it('should create the popup to add a new food to the food list', async () => {
            doRender()
            await userEvent.click(screen.getByRole('button', {name: /add food/i}))
            expect(screen.getByRole('heading', {name: /add food form/i})).toBeVisible()
        })
    })
})