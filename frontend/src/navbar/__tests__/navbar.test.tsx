import {beforeEach, describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import Navbar from "../navbar.tsx";
import {MemoryRouter} from "react-router-dom";

describe("Navbar", () => {
    describe("Render", () => {
        beforeEach(() => {
            render(
                <MemoryRouter>
                    <Navbar/>
                </MemoryRouter>
            );
        })
        it("should render correctly with proper logo", () => {
            // expect(screen.getByRole('link', {name: /fyf/i})).toBeVisible()
            expect(screen.getByLabelText(/logo link mobile/i)).toBeVisible()
        })
        it("should render the links correctly", () => {
            expect(screen.getByRole('link', {name: /home/i})).toBeVisible()
            expect(screen.getByRole('link', {name: /exercise/i})).toBeVisible()
            expect(screen.getByRole('link', {name: /food/i})).toBeVisible()
        })
    })
})