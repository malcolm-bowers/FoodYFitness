import {describe, expect, it, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import FoodForm from "../food-form.tsx";
import * as foodService from "../food-service";

function doRender() {
    render(<FoodForm/>)
}

describe("Add Food Form", () => {
    it("should show the food form heading", () => {
        doRender();
        expect(screen.getAllByRole('heading', {name: /add food form/i})[0]).toBeVisible()
    })
    it("should show the search bar", () => {
        doRender();
        expect(screen.getByRole('textbox', {name: /search/i})).toBeVisible()
        expect(screen.getByRole('button', {name: /search/i})).toBeVisible()
    })
    it("should show the list to be populated by the search bar", () => {
        doRender();
        expect(screen.getByRole('heading', {name: /results/i})).toBeVisible()
    })
    it("should show the table headings to be populated by the search bar from the api", () => {
        doRender();
        expect(screen.getByRole('columnheader', {name: /name/i})).toBeVisible()
        expect(screen.getByRole('columnheader', {name: /grams\/serving/i})).toBeVisible()
        expect(screen.getByRole('columnheader', {name: /calories\/serving/i})).toBeVisible()
    })
    it('should show the first result from the search', () => {
        doRender()
        expect(screen.getByRole('rowheader', {name: /glazed donut/i})).toBeVisible()
        expect(screen.getByRole('cell', {name: /55/i})).toBeVisible()
        expect(screen.getByRole('cell', {name: /275/i})).toBeVisible()
    })
    it('should show the new food header', () => {
        doRender()
        expect(screen.getByRole('heading', {name: /new food/i})).toBeVisible()
    })
    it('should show the name input box', () => {
        doRender()
        expect(screen.getByRole('textbox', {name: /name/i})).toBeVisible()
    })
    it('should show the serving input', () => {
        doRender()
        expect(screen.getByRole('spinbutton', {name: /servings/i})).toBeVisible()
    })
    it('should show the serving input', () => {
        doRender()
        expect(screen.getByRole('spinbutton', {name: /grams\/serving/i})).toBeVisible()
    })
    it('should show the serving input', () => {
        doRender()
        expect(screen.getByRole('spinbutton', {name: /calories\/serving/i})).toBeVisible()
    })
    it('should show the add food button', () => {
        doRender()
        expect(screen.getByRole('button', {name: /add food/i})).toBeVisible()
    })
    it('should show the cancel button', () => {
        doRender()
        expect(screen.getByRole('button', {name: /cancel/i})).toBeVisible()
    })
    describe('Search button', () => {
        it('should call handle search with the search text when the search button is clicked', async () => {
            doRender()
            const mockSearchFood = vi.spyOn(foodService, 'foodSearch')
                .mockResolvedValue();
            await userEvent.type(screen.getByRole('textbox', {name: /search/i}), "Donut")
            await userEvent.click(screen.getByRole('button', {name: /search/i}))
            expect(mockSearchFood).toHaveBeenCalledTimes(1)
            expect(mockSearchFood).toHaveBeenCalledWith("Donut")
        })
    })
    describe('Cancel button', () => {
        it('should call handle close when the cancel button is clicked', async () => {
            doRender()
            await userEvent.click(screen.getByRole('button', {name: /cancel/i}))
            expect(screen.getByRole('textbox', {name: /name/i})).toBeDisabled()
        })
    })
    describe('Submit button', () => {
        it('should submit the data for a new food', async () => {
            doRender()
            const saveFoodSpy = vi.spyOn(foodService, 'saveFood')
                .mockResolvedValue({
                    name: 'donut',
                    servings: 1,
                    gramsPerServing: 20,
                    caloriesPerServing: 200,
                    totalCalories: 200
                });
            await userEvent.click(screen.getByRole('button', {name: /add food/i}))
            expect(saveFoodSpy).toHaveBeenCalledOnce()
        })
    })
})