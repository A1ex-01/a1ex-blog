import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

test("test", () => {
  render(<Footer />);
  expect(screen.getByText(`[${siteConfig.ICP}]`)).toBeDefined();
});
