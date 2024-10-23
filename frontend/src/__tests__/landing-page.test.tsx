import {beforeEach, describe, it} from "vitest";
import {render, screen} from "@testing-library/react";
import LandingPage from "../landing-page.tsx";

describe ("Landing Page", () => {
    beforeEach(() => {
        render(<LandingPage />);
    })
    it('should render the page', () => {
        expect(screen.getByRole('heading', {name: /welcome to foodyfitness/i})).toBeVisible()
    });
})