import { useContext, createContext, useState } from "react";
import parse from "../grammar/parse";
import { useDebouncedCallback } from "use-debounce";
import {
  checkExistEquationByName,
  getEquationByName,
  saveEquation,
  buildEquation,
  Equation,
} from "../utils/equation";

export type Result = {
  dice: number;
  equation: string;
  data: any[];
  timestamp: number;
  name?: string;
};

export enum Page {
  HOME = "HOME",
  QUERY_EDIT = "QUERY_EDIT",
}

const useContextState = () => {
  const [page, setPage] = useState(Page.HOME);
  const [dice, setDice] = useState(DEFAULT_CONTEXT_STATE.dice);
  const [results, setResults] = useState<Result[]>(
    DEFAULT_CONTEXT_STATE.results
  );
  const [equation, setEquation] = useState(DEFAULT_CONTEXT_STATE.equation);
  const [name, setName] = useState<string>("");
  const [equationError, setEquationError] = useState<string | undefined>(
    DEFAULT_CONTEXT_STATE.equationError
  );
  const validateEquation = useDebouncedCallback((testEquation: string) => {
    try {
      parse(testEquation);
      setEquationError(undefined);
    } catch (error) {
      setEquationError(error.message);
    }
  }, 500);

  const handleSetDice = (value: number) => {
    setDice(value > 0 ? value : 1);
  };

  const handleSetEquation = (newEquation: string) => {
    setEquation(newEquation);
    validateEquation(newEquation);
    setName("");
  };

  const handleSetName = (newName: string) => {
    setName(newName);
  };

  const roll = () => {
    try {
      const data = [];
      for (let index = 0; index < dice; index++) {
        data.push(parse(equation));
      }
      setResults([
        {
          dice,
          equation,
          data,
          timestamp: new Date().getTime(),
          name,
        },
        ...results,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUseEquation = (savedEquation: Equation) => {
    setEquation(savedEquation.definition);
    setName(savedEquation.name);
  };

  const upsertEquation = async () => {
    if (!name) return "Name must be defined";
    if (await checkExistEquationByName(name)) {
      console.log("updating", name);
      const existingEquation = await getEquationByName(name);
      await saveEquation({
        ...existingEquation,
        definition: equation,
        name,
      });
    } else {
      console.log("creating", name);
      await saveEquation(
        buildEquation({
          name,
          definition: equation,
        }),
        true
      );
    }
  };

  return {
    results,
    name,
    dice,
    equation,
    equationError,
    page,
    setPage,
    handleSetDice,
    handleSetEquation,
    handleSetName,
    roll,
    upsertEquation,
    handleUseEquation,
  };
};

const DEFAULT_CONTEXT_STATE = {
  dice: 1,
  equation: "D10",
  results: [],
} as any;

const AppContext = createContext<ReturnType<typeof useContextState>>(
  DEFAULT_CONTEXT_STATE
);

export const AppProvider = ({ children }: { children: JSX.Element }) => {
  const state = useContextState();
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);
export default useAppContext;
