import Footer from "@/components/Footer";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

test("test", () => {
  render(<Footer />);
  expect(screen.getByText("[赣ICP备2022002397号]")).toBeDefined();
});
