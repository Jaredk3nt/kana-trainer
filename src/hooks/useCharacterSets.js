import useLSCustomValues from "./useLSCustomValues";
import { characterSets } from "../constants";

// TODO: fix lag on LS custom values appearing
export default function useCharacterSets() {
  const [list, add, remove] = useLSCustomValues();

  return [{
    custom: {
      name: 'My Characters', // TODO: rename since custom is used for creating a set
      set: list,
    },
    ...characterSets,
  }, add, remove];
}