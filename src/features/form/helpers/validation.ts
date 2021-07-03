import { IFormValues } from "../types/types";

export const validateForm = (formValues: IFormValues) => {
  const {
    name,
    prepTime,
    foodType,
    spiciness,
    breadSlices,
    pizzaSlices,
    pizzaDiameter,
  } = formValues;

  const min: number = Number(prepTime?.slice(3, 5));
  const sec: number = Number(prepTime?.slice(6, 8));
  const prepTimeLen: number | undefined = prepTime?.length;

  const errors: IFormValues = {};

  if (!name) {
    errors.name = "Name is required";
  }

  if (!prepTime) {
    errors.prepTime = "Preparation time is required";
  }

  if (min > 59 || sec > 59) {
    errors.prepTime = "Please correct the time";
  }

  if (prepTimeLen !== 8) {
    errors.prepTime = "Time format is not correct";
  }

  if (!foodType) {
    errors.foodType = "Choose food type";
  }

  if (foodType === "soup") {
    if (!spiciness) {
      errors.spiciness = "Choose spiciness";
    }
  }

  if (foodType === "pizza") {
    if (!pizzaSlices) {
      errors.pizzaSlices = "Choose slices";
    }
    if (!pizzaDiameter) {
      errors.pizzaDiameter = "Choose diameter";
    }
  }

  if (foodType === "sandwich") {
    if (!breadSlices) {
      errors.breadSlices = "Choose bread slices";
    }
  }

  return errors;
};
