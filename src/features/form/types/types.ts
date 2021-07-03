export interface IFormValues {
  name?: string;
  prepTime?: string;
  foodType?: string;
  spiciness?: string;
  pizzaDiameter?: string;
  breadSlices?: string;
  pizzaSlices?: string;
}

export interface IOrder {
  name: string;
  preparation_time: string;
  type: string;
  no_of_slices?: number;
  diameter?: number;
  spiciness_scale?: string;
  slices_of_bread?: number;
}

export interface IRootState {
  form: {
    foodOrderForm: {
      syncErrors?: IFormValues;
      registeredFields: {};
    };
  };
}

export interface IProps {
  name: string;
  prepTime: string;
  foodType: string;
  pristine: boolean;
  reset: () => void;
  pizzaDiameter: string;
  spiciness: string;
  submitting: boolean;
  breadSlices: string;
  pizzaSlices: string;
}
