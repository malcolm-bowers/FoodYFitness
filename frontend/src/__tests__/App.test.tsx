import App from "../App.tsx";
import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import {userEvent} from "@testing-library/user-event";

describe('App', () => {
    it('should render the app', () => {
        render(<App/>);
        expect(screen.getByRole('heading', {name: /foodyfitness/i})).toBeVisible()
    })
    describe("Links correctly navigate", () => {
        it('should navigate to /home', () => {
            // Arrange
            const user = userEvent.setup()
            render(<App/>);

            // Act
            user.click(screen.getByRole('link', {name: /home/i}))

            // Assert
            expect(screen.getByRole('heading', {name: /welcome to foodyfitness/i})).toBeVisible();
        })
    })
})