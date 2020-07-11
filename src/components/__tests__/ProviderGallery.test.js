/**

@jest-environment jsdom
*/
import React from "react";
import { render } from "@testing-library/react";
import Gallery from "../ProviderGallery";

describe("Gallery", () => {
  test("should display providers", async () => {
    const items = [
      {
        id: 1,
        imageUrl: "",
        name: "test",
        description: "testing providers",
      },
    ];
    const { findByText } = render(<Gallery items={items} />);
    const el = await findByText(items[0].description);
    expect(el).toBeInTheDocument();
  });
});
