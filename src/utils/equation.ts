import { v4 as uuid } from "uuid";
import storage from "./storage";

type EquationData = {
  definition: string;
  name?: string;
};

export interface Equation extends EquationData {
  name: string;
  createdAt: number;
  updatedAt?: number;
}

const EQUATION_NAMESPACE = "equation";

export const buildEquation = ({ definition, name }: EquationData): Equation => {
  return {
    name: name || uuid(),
    definition,
    createdAt: new Date().getTime(),
  };
};

export const saveEquation = async (equation: Equation, isNew?: boolean) => {
  const updatedEquation = {
    ...equation,
  };
  if (!isNew) updatedEquation.updatedAt = new Date().getTime();
  const key = `${EQUATION_NAMESPACE}:${updatedEquation.name}`;
  await storage.set(key, updatedEquation);
  return updatedEquation;
};

export const checkExistEquationByName = async (name: string) => {
  const key = `${EQUATION_NAMESPACE}:${name}`;
  return await storage.get<Equation>(key);
};

export const getEquationByName = async (name: string) => {
  const key = `${EQUATION_NAMESPACE}:${name}`;
  return await storage.get<Equation>(key);
};

export const getAllEquations = async () => {
  const keys = await storage.keys();
  const equationKeys = keys.filter((name) =>
    new RegExp(EQUATION_NAMESPACE + "*").test(name)
  );
  return await storage.getMany<Equation>(equationKeys);
};

export const deleteEquation = async (equation: Equation) => {
  const key = `${EQUATION_NAMESPACE}:${equation.name}`;
  return await storage.remove(key);
};
