import App from "../App.tsx";
import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";

describe('App', () => {
    it('should render the app', () => {
        render(<App/>);
        expect(screen.getByRole('heading', {name: /foodyfitness/i})).toBeVisible()
    })
})