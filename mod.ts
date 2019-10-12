import transcriptionTable from "./transcription_table.ts";

interface Settings {
  spacing?: "normal" | "cross" | "double" | "single";
  punctuation?: "cross" | "single" | "double";
}

const defaultSettings: Settings = {
  punctuation: "cross",
  spacing: "double"
};

/** Transcripe a single letter.
 *
 *    import { transcribeLetter } from 'runes.ts'
 *    transcribeLetter("n");
 */
export function transcribeLetter(letter: string): string {
  let rune: string = transcriptionTable.hasOwnProperty(letter)
    ? transcriptionTable[letter]
    : null;
  if (!rune) {
    return isNaN(parseInt(letter)) ? letter : "";
  }
  return rune || "";
}

/** Transcripe multiple concurrent letters that makes up a single rune.
 *
 *    import { transcribeLetterCombinations } from 'runes.ts'
 *    transcribeLetterCombinations("eau");
 */
export function transcribeLetterCombinations(letters: string): string {
  let combinations = Object.keys(transcriptionTable)
    .filter(
      key => key.length !== 1 && typeof transcriptionTable[key] === "string"
    )
    .sort((a, b) => b.length - a.length);
  return combinations.reduce(
    (str, key) => (str = str.replace(key, transcribeLetter(key))),
    letters.toLowerCase()
  );
}

function runeReducer(settings: Settings) {
  return (convertedString: string, letter: string): string => {
    let rune: string;
    switch (letter) {
      case ".": {
        rune = transcriptionTable.punctuation.hasOwnProperty(
          settings.punctuation
        )
          ? transcriptionTable.punctuation[settings.punctuation]
          : transcriptionTable.punctuation[defaultSettings.punctuation];
        break;
      }
      case " ": {
        rune = " ";
        if (
          settings.spacing !== "normal" &&
          transcriptionTable.punctuation.hasOwnProperty(settings.spacing)
        ) {
          rune = transcriptionTable.punctuation[settings.spacing];
        }
        break;
      }
      default: {
        rune = transcribeLetter(letter);
      }
    }
    return (convertedString += rune);
  };
}

/** Transcripe as much text as you want.
 *
 *    import { transcribe } from 'runes.ts'
 *    transcribe("You will never be a god.");
 */
export function transcribe(string: string, settings?: Settings): string {
  const mergedSettings = Object.assign({}, defaultSettings, settings);
  return transcribeLetterCombinations(string)
    .split("")
    .reduce(runeReducer(mergedSettings), "");
}

export default transcribe;
