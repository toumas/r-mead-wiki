import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export const Context = createContext([false, () => {}] as [
  boolean,
  Dispatch<SetStateAction<boolean>>
]);

export function usePlaceholderContext() {
  const value = useContext(Context);
  return value;
}

export interface PlaceholderContextProviderProps {
  children: ReactNode;
}

export const PlaceholderContextProvider = ({
  children,
}: PlaceholderContextProviderProps) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <Context.Provider value={[show, setShow]}>{children}</Context.Provider>
  );
};
