import { configureStore } from "@reduxjs/toolkit";
import { reducer as reduxFormReducer } from "redux-form";

export default configureStore({
  reducer: {
    form: reduxFormReducer,
  },
});
