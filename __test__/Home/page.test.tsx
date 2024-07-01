

import Page from "../../src/app/page";
import React from 'react'
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer/Footer";


describe("Page", () => {
    it("the main div is in the document", () => {

      render(<Page />);

      expect(screen.getByTestId("main")).toBeInTheDocument();

    });

  });