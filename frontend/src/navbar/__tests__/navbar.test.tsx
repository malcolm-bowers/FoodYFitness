import {beforeEach, describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import Navbar from "../navbar.tsx";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {userEvent} from "@testing-library/user-event";

describe("Navbar", () => {
    describe("Render", () => {
        beforeEach(() => {
            render(
                <MemoryRouter>
                    <Navbar/>
                    <Routes>
                        <Route index element={<div>Fake Home Page</div>} />
                        <Route path="/exercise" element={<div>Fake Exercise Page</div>} />
                        <Route path="/food" element={<div>Fake Food Page</div>} />
                    </Routes>
                </MemoryRouter>
            );
        })

        it('should navigate to exercise page', async () => {
            expect(screen.queryByText('Fake Exercise Page')).toBeNull()
            await userEvent.click(screen.getByRole('link', {name: /exercise/i}))
            expect(screen.getByText('Fake Exercise Page')).toBeVisible()
        });

        it('should navigate to the home page', async () => {
            await userEvent.click(screen.getByRole('link', {name: /exercise/i}))
            expect(screen.queryByText('Fake Home Page')).toBeNull()
            await userEvent.click(screen.getByRole('link', {name: /home/i}))
            expect(screen.getByText('Fake Home Page')).toBeVisible()
        })

        it('should navigate to the food page', async () => {
            expect(screen.queryByText('Fake Food Page')).toBeNull()
            await userEvent.click(screen.getByRole('link', {name: /food/i}))
            expect(screen.getByText('Fake Food Page')).toBeVisible()
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