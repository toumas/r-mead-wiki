import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export const Context = createContext<PlaceholderContext>({
  showPlaceholder: false,
  setShowPlaceholder: () => {},
  timeoutId: undefined,
  setTimeoutId: () => {},
});

export interface PlaceholderContext {
  showPlaceholder: boolean;
  setShowPlaceholder: Dispatch<SetStateAction<boolean>>;
  timeoutId: NodeJS.Timeout | undefined;
  setTimeoutId: Dispatch<SetStateAction<NodeJS.Timeout | undefined>>;
}

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
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(
    undefined
  );
  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(false);
  return (
    <Context.Provider
      value={{ showPlaceholder, setShowPlaceholder, timeoutId, setTimeoutId }}
    >
      {children}
    </Context.Provider>
  );
};
