

import React from 'react'
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer/Footer";


describe("Footer", () => {
    it("all images of the footer have an alt attribute", () => {

      const { queryAllByRole } = render(<Footer />);

      const imgElements = queryAllByRole('img');

      imgElements.forEach(img => {
        expect(img).toHaveAttribute('alt');
      });
    
    });
  });