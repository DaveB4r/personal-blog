import { FormEvent } from "react";

export type FormControl = {
  label: string;
  type: string;
  state: string;
  setState: Function;
};

export interface FormProps {
  formControl: FormControl[];
  handleSubmit: (e: FormEvent) => void;
}