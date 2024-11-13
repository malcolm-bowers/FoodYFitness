import {describe, expect, it} from "vitest";
import FoodList from "../food-list.tsx";
import {render, screen} from "@testing-library/react";

const doRender = () => {
    render(<FoodList/>)
}

describe('Food List', () => {
    describe('Render List Elements', () => {
        it('should rend the heading for the list component', () => {
            doRender()
            expect(screen.getByRole('heading', {name: /food list/i})).toBeVisible()
        })
        it('should show the list headers', () => {
            doRender()
            expect(screen.getByRole('columnheader', {name: /name/i})).toBeVisible()
            expect(screen.getByRole('columnheader', {name: /servings/i})).toBeVisible()
            expect(screen.getByRole('columnheader', {name: /grams\/serving/i})).toBeVisible()
            expect(screen.getByRole('columnheader', {name: /calories\/serving/i})).toBeVisible()
            expect(screen.getByRole('columnheader', {name: /total calories/i})).toBeVisible()
        })
        it('should show the first food row and related fields', () => {
            doRender()
            expect(screen.getByRole('rowheader', {name: /donut/i})).toBeVisible()
            expect(screen.getAllByRole('cell', {name: /1/i})[0]).toBeVisible()
            expect(screen.getAllByRole('cell', {name: /23/i})[0]).toBeVisible()
            expect(screen.getAllByRole('cell', {name: /275/i})[0]).toBeVisible()
            expect(screen.getAllByRole('cell', {name: /275/i})[1]).toBeVisible()
        })
    })
})