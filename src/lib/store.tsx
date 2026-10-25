import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import {
  freshState,
  loadState,
  persist,
  type StudyState,
  STORAGE_KEY,
} from "./storage";
interface StudyContext {
  state: StudyState;
  setState: Dispatch<SetStateAction<StudyState>>;
  storageError?: string;
  repairStorage: () => void;
}
const Context = createContext<StudyContext | null>(null);
function read() {
  try {
    return loadState(window.localStorage);
  } catch {
    return {
      state: freshState(),
      error:
        "Selaintallennus ei ole käytettävissä. Vie varmuuskopio ennen sulkemista.",
    };
  }
}
export function StudyProvider({ children }: { children: ReactNode }) {
  const [initial] = useState(read);
  const [state, setState] = useState(initial.state);
  const [storageError, setStorageError] = useState(initial.error);
  const blocked = useRef(!!initial.error);
  useEffect(() => {
    if (blocked.current) return;
    const error = persist(window.localStorage, state);
    setStorageError(error);
  }, [state]);
  // A second tab must reload rather than silently overwrite newly saved work.
  useEffect(() => {
    const changed = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        blocked.current = true;
        setStorageError(
          "Edistyminen muuttui toisessa välilehdessä. Vie tämän välilehden varmuuskopio ja lataa sivu uudelleen ennen jatkamista.",
        );
      }
    };
    window.addEventListener("storage", changed);
    return () => window.removeEventListener("storage", changed);
  }, []);
  const repairStorage = () => {
    blocked.current = false;
    const error = persist(window.localStorage, state);
    setStorageError(error);
  };
  return (
    <Context.Provider value={{ state, setState, storageError, repairStorage }}>
      {children}
    </Context.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useStudy() {
  const context = useContext(Context);
  if (!context) throw new Error("StudyProvider missing");
  return context;
}
