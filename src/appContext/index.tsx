import { useContext, createContext, useState } from "react";
import parse from "../grammar/parse";
import { useDebouncedCallback } from "use-debounce";

type Result = {
  equation: string;
  data: any[];
  timestamp: number;
};

const useContextState = () => {
  const [dice, setDice] = useState(DEFAULT_CONTEXT_STATE.dice);
  const [results, setResults] = useState<Result[]>(
    DEFAULT_CONTEXT_STATE.results
  );
  const [equation, setEquation] = useState(DEFAULT_CONTEXT_STATE.equation);
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
  };

  const roll = () => {
    try {
      const data = [];
      for (let index = 0; index < dice; index++) {
        data.push(parse(equation));
      }
      setResults([
        {
          equation: `${dice} * ${equation}`,
          data,
          timestamp: new Date().getTime(),
        },
        ...results,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    results,
    dice,
    equation,
    equationError,
    handleSetDice,
    handleSetEquation,
    roll,
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
