import React from "react";
import { act, render, cleanup } from '@testing-library/react'

import WelcomePage from "./welcome-page";

it("renders with or without a item/image", () => {

     /* no input*/
     act(() => {
          const { getByTestId } = render(<WelcomePage />)
          expect(getByTestId('welcomePage')).toBeDefined();
          cleanup()
     });

});
