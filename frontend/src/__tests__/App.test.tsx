import App from "../App.tsx";
import {render, screen} from "@testing-library/react";

describe('App', () => {
    it('should render the app', () => {
        render(<App />);
        expect(screen.getByText('FoodYFitness')).toBeVisible()
    })
})