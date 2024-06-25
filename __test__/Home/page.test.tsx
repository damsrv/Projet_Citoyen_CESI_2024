

import Page from "../../src/app/page";
import React from 'react'
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer/Footer";


describe("Page", () => {
    it("la div main est bien présente", () => {

      render(<Page />);

      expect(screen.getByTestId("main")).toBeInTheDocument();

    });

  });