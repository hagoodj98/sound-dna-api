import { render, screen } from "@testing-library/react-native";

import Index from "../app/index";

describe("Index screen", () => {
  it("renders the starter message", () => {
    render(<Index />);

    expect(
      screen.getByText("Edit app/index.tsx to edit this screen."),
    ).toBeTruthy();
  });
});
