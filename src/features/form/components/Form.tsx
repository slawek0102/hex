import React from "react";
import { connect, useSelector } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import normalizeTime from "../helpers/normalize";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { makeAntField } from "../helpers/makeAntField";
import { IOrder, IProps, IRootState } from "../types/types";
import { validateForm } from "../helpers/validation";
import { placeOrder } from "../helpers/restCalls";

const { Option } = Select;
const AntInput = makeAntField(Input);
const AntInputNumber = makeAntField(InputNumber);
const AntSelect = makeAntField(Select);

let HexOceanForm: any = (props: IProps) => {
  const {
    name,
    prepTime,
    breadSlices,
    pizzaSlices,
    pizzaDiameter,
    spiciness,
    foodType,
    pristine,
    reset,
    submitting,
  } = props;

  const areInputErrors: boolean =
    Object.keys(
      useSelector(
        (state: IRootState) => state.form.foodOrderForm?.syncErrors || {}
      )
    ).length > 0;

  const onSubmit = () => {
    const order: IOrder = {
      name: name,
      preparation_time: prepTime,
      type: foodType,
    };

    if (foodType === "pizza") {
      order.no_of_slices = Number(pizzaSlices);
      order.diameter = parseFloat(pizzaDiameter);
    }
    if (foodType === "soup") {
      order.spiciness_scale = Number(spiciness);
    }
    if (foodType === "sandwich") {
      order.slices_of_bread = Number(breadSlices);
    }

    placeOrder(order).then((data: any) => console.log(data));
  };

  return (
    <Form>
      <Field
        label="Name"
        name="name"
        type="text"
        placeholder="Name"
        component={AntInput}
        hasFeedback
      />
      <Field
        label="Preparation Time"
        name="prepTime"
        component={AntInput}
        type="text"
        placeholder="__ : __ : __"
        normalize={normalizeTime}
        style={{ width: 150 }}
      />

      <Field
        label="Food type"
        name="foodType"
        component={AntSelect}
        style={{ width: 150 }}
      >
        <Option value="pizza">Pizza</Option>
        <Option value="soup">Soup</Option>
        <Option value="sandwich">Sandwich</Option>
      </Field>

      {foodType === "soup" ? (
        <div>
          <Field
            label="Spiciness"
            name="spiciness"
            component={AntSelect}
            style={{ width: 80 }}
          >
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
            <Option value="6">6</Option>
            <Option value="7">7</Option>
            <Option value="8">8</Option>
            <Option value="9">9</Option>
            <Option value="10">10</Option>
          </Field>
        </div>
      ) : null}

      {foodType === "sandwich" ? (
        <div>
          <Field
            label="No of Slices"
            name="breadSlices"
            component={AntInputNumber}
            min={1}
          />
        </div>
      ) : null}

      {foodType === "pizza" ? (
        <div>
          <Field
            style={{ width: 90 }}
            label="No of Slices"
            name="pizzaSlices"
            component={AntInputNumber}
            min={1}
          />
          <Field
            label="Diameter"
            name="pizzaDiameter"
            component={AntInputNumber}
            step={0.1}
            min={1}
          />
        </div>
      ) : null}

      <div style={{ textAlign: "center" }}>
        <Button
          type="primary"
          style={{ marginRight: "10px" }}
          disabled={areInputErrors}
          onClick={onSubmit}
        >
          Submit
        </Button>
        <Button disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </Button>
      </div>
    </Form>
  );
};

HexOceanForm = reduxForm({
  form: "foodOrderForm",
  validate: (values) => validateForm(values),
})(HexOceanForm);

const selector = formValueSelector("foodOrderForm");

HexOceanForm = connect((state: IRootState) => {
  const name = selector(state, "name");
  const prepTime = selector(state, "prepTime");
  const foodType = selector(state, "foodType");

  const spiciness = selector(state, "spiciness");
  const breadSlices = selector(state, "breadSlices");
  const pizzaSlices = selector(state, "pizzaSlices");
  const pizzaDiameter = selector(state, "pizzaDiameter");

  return {
    name,
    prepTime,
    foodType,
    spiciness,
    breadSlices,
    pizzaSlices,
    pizzaDiameter,
  };
})(HexOceanForm);

export default HexOceanForm;
