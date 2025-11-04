import { useState } from "react";
import FieldService from "../../services/MockFieldService";
import Button from "../Button";
import FormInput from "../FormInput";
import FormChoicesField from "../FormChoicesField";
import SelectField from "../SelectField/SelectFIeld";
import Switch from "../Switch";
import InfoIcon from "../../assets/info_icon.svg";
import QuickLogo from "../../assets/quickbase_logo.png";
import { sanitizeInput } from "../../utils/sanitizeInput";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import styles from "./FormBuilder.module.scss";

const INITIAL_VALUES = {
  label: "",
  required: true,
  default: "",
  choices: [],
  displayAlpha: false,
};

const STORAGE_KEY = "formBuilderValues";

const FormBuilder = () => {
  let [values, setValues] = useLocalStorage(STORAGE_KEY, INITIAL_VALUES);
  let [isLoading, setIsLoading] = useState(false);

  let buildElements = [
    {
      id: 1,
      label: "Label",
      element: FormInput,
      handler: onInputHandler,
      extraProps: {
        name: "label",
        placeholder: "Select Region",
        type: "text",
        required: true,
      },
    },
    {
      id: 2,
      label: "Type",
      element: SelectField,
      handler: onTypeHandler,
      extraProps: {
        name: "required",
        options: [
          { value: "multiple", label: "Multi Select" },
          { value: "single", label: "Single Select" }, // disabled: true
        ],
      },
    },
    {
      id: 3,
      label: "Default Value",
      element: FormInput,
      handler: onInputHandler,
      extraProps: {
        name: "default",
        placeholder: "Select Region",
        type: "text",
      },
    },
    {
      id: 4,
      label: "Choices",
      element: FormChoicesField,
      handler: onChoicesHandler,
      extraProps: {
        name: "choices",
        placeholder: "Type a choice and press Enter",
        type: "text",
      },
    },
    {
      id: 5,
      label: "Order Alphabetically",
      element: Switch,
      handler: onAlphabetHandler,
      extraProps: {
        name: "displayAlpha",
      },
    },
  ];

  function onInputHandler(e) {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function onTypeHandler(e) {
    setValues((prev) => ({
      ...prev,
      required: e.target.value === "multiple",
    }));
  }

  function onAlphabetHandler(newVal) {
    setValues((prev) => ({ ...prev, displayAlpha: newVal }));
  }

  function onChoicesHandler(choicesArr) {
    setValues((prev) => ({ ...prev, choices: choicesArr }));
  }

  function onResetHandler(e) {
    e.preventDefault();
    setValues(INITIAL_VALUES);
    localStorage.removeItem(STORAGE_KEY);
  }

  async function onSaveHandler(e) {
    e.preventDefault();
    let safeValues = {
      ...values,
      label: sanitizeInput(values.label),
      default: sanitizeInput(values.default),
      choices: values.choices.map((choice) => sanitizeInput(choice)),
    };
    let payload = safeValues;

    if (
      safeValues.default !== "" &&
      !safeValues.choices.includes(safeValues.default) &&
      safeValues.choices.length < 50
    ) {
      const updatedChoices = [safeValues.default, ...safeValues.choices];
      onChoicesHandler(updatedChoices);
      payload = { ...safeValues, choices: updatedChoices };
    }

    await FieldService.saveField(payload, setIsLoading);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleBox}>
        <img src={QuickLogo} alt="logo" className={styles.logo} />
        <h1 className={styles.title}>Form Builder</h1>
      </div>
      <form
        className={styles.formWrapper}
        onSubmit={(e) => onSaveHandler(e)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.tagName === "INPUT") {
            e.preventDefault();
          }
        }}
      >
        {buildElements.map((field) => {
          const { element, handler, id, label, extraProps } = field;
          const Component = element;
          return (
            <div className={styles.elementWrapper} key={id}>
              <label>{label}</label>
              <div className={styles.spacer}>
                <Component
                  onChangeHandler={handler}
                  value={values[extraProps.name]}
                  {...extraProps}
                />
                {/* select type */}
                {extraProps.name === "required" && (
                  <img
                    src={InfoIcon}
                    className={styles.infoIcon}
                    title="If multiple choice option is selected, the end user will be required to pick a choice before they could submit the form."
                    alt="If multiple choice option is selected, the end user will be required to pick a choice before they could submit the form."
                  />
                )}
              </div>
            </div>
          );
        })}
        <div className={styles.buttonGroup}>
          <Button
            size="large"
            variant="primary"
            isLoading={isLoading}
            type="submit"
          >
            Save changes
          </Button>
          <Button
            variant="secondary"
            onClick={(e) => onResetHandler(e)}
            type="button"
            size="large"
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormBuilder;
