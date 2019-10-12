# deno_rune_converter

A small deno module for converting text to the elder futhark runic alphabet.

Mostly stolen from [fbosch](https://github.com/fbosch)s' cool package [rune-converter](https://github.com/fbosch/rune-converter).

## Import
``` typescript

  import { transcribe } from "https://denopkg.com/lasseborly/deno_rune_converter@0.0.2/mod.ts";

```

## transcribe(string, options)
`transcribe()` is the default function to convert a given string to elder futhark.

### Arguments 
* **string** - the string you wish to convert
* **options** - options that determine the conversion of the string
    * **punctuation**  - determines what symbol to transcribe ' . ' to
    
      key | value
      ---- | -----
      cross **(default)** | ᛭
      double | ᛬
      single | ᛫
    * **spacing** - determines what symbol to transcribe spacing to
    
      key | value 
      --- | -----
      normal | `whitespace`
       cross | ᛭
      double **(default)** | ᛬
      single | ᛫

### Example
``` typescript

  import { transcribe } from "https://denopkg.com/lasseborly/deno_rune_converter@0.0.2/mod.ts";

  const lokisLastWords = "You will never be a god.";

  transcribe(lokisLastWords); // ᛃᛟᚢ᛬ᚹᛁᛚᛚ᛬ᚾᛖᚠᛖᚱ᛬ᛒᛖ᛬ᚨ᛬ᚷᛟᛞ᛭

  transcribe(lokisLastWords, { punctuation: "single" }); // ᛃᛟᚢ᛬ᚹᛁᛚᛚ᛬ᚾᛖᚠᛖᚱ᛬ᛒᛖ᛬ᚨ᛬ᚷᛟᛞ᛫

  transcribe(lokisLastWords, { spacing: "normal" }); // ᛃᛟᚢ ᚹᛁᛚᛚ ᚾᛖᚠᛖᚱ ᛒᛖ ᚨ ᚷᛟᛞ᛭

```