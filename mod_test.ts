import { runTests, test } from "https://deno.land/std/testing/mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import {
  transcribe,
  transcribeLetterCombinations,
  transcribeLetter
} from "./mod.ts";

test({
  name:
    "should return the correct run corresponding to the given letter or combination of letters",
  fn() {
    assertEquals(
      transcribeLetter("a"),
      "ᚨ",
      "returns corrosponding rune if it exists"
    );
    assertEquals(
      transcribeLetter("+"),
      "+",
      "returns empty string if there's no corrosponding rune to the given letter"
    );
    assertEquals(
      transcribeLetter("eau"),
      "ᛟ",
      "is able to convert multiple letters to a single rune"
    );
    assertEquals(
      transcribeLetter("x"),
      "ᚲᛋ",
      "is able to convert single letter to multiple runes"
    );
  }
});

test({
  name: "should convert letter combinations into proper rune(s)",
  fn() {
    const longestFirstTestString = "chris chan";
    const longestFirstTestStringReplaced = "ᚺᚱis ᚷan";
    assertEquals(
      transcribeLetterCombinations(longestFirstTestString),
      longestFirstTestStringReplaced,
      "should longest letter combinations first"
    );
  }
});

test({
  name: "should convert a string of text to elder futhark.",
  fn() {
    const testString = "Lorem ipsum dolor sit amet.";
    const defaultResultString = "ᛚᛟᚱᛖᛗ᛬ᛁᛈᛋᚢᛗ᛬ᛞᛟᛚᛟᚱ᛬ᛋᛁᛏ᛬ᚨᛗᛖᛏ᛭";
    const singlePunctuationResultString = "ᛚᛟᚱᛖᛗ᛬ᛁᛈᛋᚢᛗ᛬ᛞᛟᛚᛟᚱ᛬ᛋᛁᛏ᛬ᚨᛗᛖᛏ᛫";
    const normalSpacingResultString = "ᛚᛟᚱᛖᛗ ᛁᛈᛋᚢᛗ ᛞᛟᛚᛟᚱ ᛋᛁᛏ ᚨᛗᛖᛏ᛭";

    assertEquals(
      transcribe(testString),
      defaultResultString,
      "returns converted string"
    );
    assertEquals(
      transcribe(testString, { punctuation: "single" }),
      singlePunctuationResultString,
      "punctuation is changable"
    );
    assertEquals(
      transcribe(testString, { spacing: "normal" }),
      normalSpacingResultString,
      "spacing can be set to normal"
    );
  }
});

runTests();
