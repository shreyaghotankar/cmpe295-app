import React from "react";
import { act, render, cleanup } from '@testing-library/react'

import CustomModal from "./custom-modal";

it("renders with or without a item/image", () => {

     const handleClose = jest.fn()

     /* not shown*/
     act(() => {
          const { queryByTestId  } = render(<CustomModal onHide={handleClose} />)

          expect(queryByTestId('modalContent')).toBeNull()
       
          cleanup()
     });

     act(() => {
          const { queryByTestId  } = render(<CustomModal onHide={handleClose} show={true} />)

          expect(queryByTestId('modalContent')).toBeTruthy()
     
          cleanup()
     });
     
});