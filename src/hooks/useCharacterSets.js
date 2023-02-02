import { useContext } from "react";

import { characterSets } from "../constants";
import MyCharactersContext from "../context/myCharactersContext";
import MySetsContext from "../context/mySetsContext";

export default function useCharacterSets() {
  const { list } = useContext(MyCharactersContext);
  const { sets, add, remove, update } = useContext(MySetsContext);

  return {
    sets: {
      custom: {
        name: 'My Characters',
        set: list,
      },
      ...sets,
      ...characterSets,
    },
    add,
    remove,
    update,
  };
}