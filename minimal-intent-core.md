---
title: "Thoughts on what MathML Core Intent Should Look Like"
layout: wgnote
---

*Author*: Neil Soiffer



## Abstract
We have had a lot of discussion about `intent`'s syntax and functionality. We have also had discussion about what should be in core and also the format for listing what is in core and what isn't. This document focuses on what should be in core, along with defaults.

<nav id="toc" markdown="1">

# Table of Contents
{:.no_toc}

* toc
{:toc}

</nav>

# Basic Premise: Keep It Simple
The original idea is that core intent is what every screen reader should know about and support.
As `intent`'s definition has solidified, it's power in terms of specifying how something should be spoken has increased.
Because of this, I feel a lot of what was originally thought of as core (concepts in K-12 or K-14) no longer need to be in core.
For example, absolute value is a simple concept that clearly should be given an `intent` because its notation is ambiguous and it is a K-12 concept.
However, specifying `intent="absolute-value($arg)"` will cause AT by default to speak "absolute value of _arg_", so there is no need for this to be something specifically listed as core.
It may be something listed in a "suggested names" list or in "open", but it is not something that AT developers need to consult.

By removing intent names from core that AT doesn't need to do anything about, it becomes a smaller list and something simpler (and less scary) for AT to implement.

From the other side, if there is a large burden on authoring MathML with `intent`, then it will be less likely to get used. So a second goal that I feel is important is: MathML should not require `intent` in order for AT to speak unambiguous notations. Note: any notation can be ambiguous, so "unambiguous" in this sense means there is a common way to read a notation (modulo a choice of similar words) that someone knowledgeable in K-14 math would almost always choose. As a simple example, $x^2 + y^2 = 1$ should not need intent to be read as "x squared plus y squared equals 1". This means core should define some defaults that AT should implement.

# What Needs to be in Core
The items that need to be in core are concepts with the following properties:
1. the speech differs depending on the types of the arguments
2. the speech differs depending on the needs of the listener
3. the speech isn't covered by using an `intent` concept@hint and is otherwise a notation that should be in core.

An example of the first case is `mfrac`, where $3/4$, $\frac1x$, $3\frac{\mathrm{m}}{\mathrm{s}}$, and $\frac{1+x}{1-x}$ are all likely to be spoken differently. It is a large burden on authoring software/authors to author these differently. 

An example of the second case is `msqrt`, where someone who is blind might need to hear "end square root" but someone with dyslexia does not need to this extra verbiage. The second case thus includes any non-linear notation. This requirement might be able to be reduced or eliminated by extending the `intent` syntax ([see below](#extending-intent-syntax)).

An example of the third case is "interval" (open, closed, etc). If `intent="open-interval($start, $end)"`, then the speech would be something like "open interval of 3 and 5". This is understandable, but not how it is typically spoken: "open interval from 3 to 5" or "the interval from 3 to 5, not including 3 and not including 5". This more common speech can be accommodated with some additional literals:
```
intent="open-interval@silent(_open-interval-from, $start, _to, $end)"
```
I don't have a strong argument why this explicit use of words as arguments should be avoided, but it seems wrong. If this is considered "good form", then the third case can be dropped.

## Extending `intent` Syntax
The absolute-value example above actually might be an example that needs to be in core because listeners might require an "end absolute value" to signal the end of absolute value. I suggest modifying the "@" syntax to also accept "end" (or "function-end") as a signal to AT that saying "end- _intent-name_" is an option if appropriate for the listener.

"@end" could be used with most of the 2D notation tags such as `msqrt` so that the core list shrinks. This would likely eliminate or at least minimize what is required by '2' above.

## Intent Values not in Core
If an `intent` name is not in core, then it either is listed in the "open" list or not. The goal of the open list is to standardize and suggest names to use for various concepts, but it does not require their use.

This proposal removes a number of names that were proposed for core such as `absolute-value` and `set` because they don't require AT to do anything special with them. These names hence should be part of the open list. _Maybe_ this indicates the open list needs partitioning so these lower-level math names are easier to find or there needs to be a column in the table that allows one to sort/filter on them.


# Defaults
Defaults mean that authoring software needs to use `intent` when the default value doesn't match what the author expects. If we get the defaults right, that means only ambiguous notations need intent.

## Tags in Core
AT should have a specified default interpretation for every MathML Element. That doesn't mean that the exact words are specified, only that they choose words that convey the default meaning. For example, `mfrac` means division by default, and words like "start fraction x over y end fraction" or just "x over y" should be used. The exact wording depends on the audience.

The default meanings and special cases for all the MathML elements are:
* leaf tags speak their contents. Exceptions are:
  * `ms` likely indicates it is a string or speaks its open/close deliminators in addition to its contents.
  * `mglyph` speaks the alt text
  * `mspace`, `malginmark`, `maligngroup`, and `none` are either silent or generate pauses
  * `msline`, indicates that it is a line
* `mrow` is silent
* `mfrac` indicates it is divsion, but might have a number of special case rules depending on the arguments
* `msqrt` indicates it is a square root
* `mroot` indicates it is a root with an index. There should be special cases for at least '2' and '3' as the index
* `merror` indicates there is an error and speaks the contents
* `mfenced` should speak the same as the equivalent `mrow` notation
* `menclose` should indicate the notation attributes along with the contents. Special case speech might be appropriate when menclose looks like a similar notation that has special cases (e.g, `notation="top"` looks the same as `mover` with a "_" (or equivalent) second child).
* `msup` should assume that the notation is a power with the following special cases
  * the power is '2' or '3'
  * the power is '-1' and this is a trig function ([see below](#trig-and-log))
  * the power is one of the pseudo-script characters, in which case the superscript is _not_ spoken (e.g, $x^\prime$ is spoken "x prime")
  * the base is one of the named sets ([see below](#namedsets-ℂ-ℕ-ℚ-ℝ-and-ℤ))
* `msub` indicates a subscript. Special cases:
  * the base is "log"
  * the base is one of the named sets ([see below](#namedsets-ℂ-ℕ-ℚ-ℝ-and-ℤ))
  * the base is a large operator
  * others??? 
* `msubsup` indicates a subscripted variable raised a power with the same special cases as `msup` and `msubsup`. This includes (read the same as for munderover) 
  * the base is a large operator
* `mover` indicates that the second argument is over the first. Special cases:
  * bar, hat, caret, ... (FIX: need to flush the list out)
  * the base is a large operator
* `munder` indicates that the second argument is under the first. Special cases:
  * the base is a large operator
  * the base is "lim" or "limit" (FIX: does this need to be language agnostic?)
* `munderover` indicates there is content above and below the base. Special case:
  * the base is a large operator (speak using "from" and "to" -- [see below](#large-operators))
* `mmultiscripts` indicates the scripts. Special cases???
* `mtable`/`mtr`/`mlabeledtr`/`mtd` say something appropriate for tables. Special cases:
  * row and column tables might have specialized speech
  * small tables with simple entries might have specialized speech
* elementary math elements (`mstack`/`mlongdiv`/`msgroup`/`msrow`/`mscarries`/`mscarry`) say something appropriate
* `maction` speaks the selected child with maybe some indication of the action
* `semantics` speaks the presentation child

## Self-voicing Characters
In general, AT should know how to speak all Unicode code points. That's not really practical, but certainly any STEM-aware AT should know how to speak important characters used in math. For example, AT should know how to speak "=" ("equals" or "is equal to" in English), "→" ("right arrow"), "|" ( "vertical bar"). Many characters might be spoken differently in some contexts (e.,g "→" might be "yields" in a chemical equation), but intent should be used whenever an author is concerned about how a symbol is spoken.

It would be helpful for the group to provide a list, potentially two -- most important followed by less important. A list of speech (in English and/or other languages) could be given somewhere for those characters so translators feel confident about when they need to provide an `intent` value for a character.

## Units
This would be a (long, separate) list of SI units, (common) English units, and likely other units (e.g., astronomical and geological units) that AT should know about. AT should figure out whether to singular or plural speech for the units. For example, $3 \mathrm{cm}$ is "3 centimeters", but $1 \mathrm{cm}$ is "1 centimeter" (singular).

Unlike the other examples, these need to marked with 'intent'. A single intent (`unit`?) could be used, in which case AT would decide whether to say "centimeter" or "centimeters". Or an intent can be given to specify what to say. However, AT would need to know how to covert to singular/plural if the generator isn't responsible for this. My guess is that a `\unit{}` macro is easier to implement and use than having a macro for every possible unit (it would visually use a roman font along with generating an intent).

## Currency
Although currency symbols are self-voicing a few of them such as "$" and "€" are usually spoken at the end of number. Hence, AT needs to be aware of them and adjust the speech accordingly.

Potentially, this is something that can be left up to speech engines as many (most?) know how to pronounce "$12" correctly. Some investigation needs to be done as to the state of speech engines used by AT.

# Special Notations

## Trig (and log)
The list of trig functions (and hyperbolic trig functions) would be a known list of names that would be spoken differently from their name. This would include variants used in other languages such as "tg". What the known trig function names are would be left to the language-specific AT implementation although the group should provide a list of standard trig function names.

For example, "csc" would be "co-secant" in English; "sinh" would be "hyperbolic sine", etc.

"log" and "ln" maybe should be lumped in here. They are a little different in that $\log_n x$ (subscripted log) is particular to "log".

Note: AT should know that a trig function raised to a "-1" power should have special speech such as $sin^{-1} x$ might be spoken as "inverse sin of x". Actually, this might apply to all function names. Knowing what is a function name requires software to use U+2061 (invisible function application).

This list might be increased because things like "gcd" and "lcm" should be spelled out;  AT needs to know that. That argues either they become part of core or they require an intent name and that name is `g-c-d` and `l-c-m`. The latter is ugly, but does fit with how things should be named (they should be understandable given the names used). 

## Large Operators
As indicated in the list of known tags, `munder`, `mover`, `munderover`, `msub`, `msup`, and `msubsup` should have special speech when the base is a large operator (listed in operator dictionary or specified on an `mo` base). In English, these would typically spoken as  "... from ... to ... of ...".

## Functions
Sometimes you speak the parens, sometimes not. One criteria might be that a simple single argument tends not to get spoken. The decision is likely based on the listener (learning vs expert). Hence, this is something that should be left to AT.

If U+2061 (invisible function application) is used, then a list of function names is not required.

## Parens, Brackets, ...
AT might want to speak the nesting level to make the expression more understandable. This is simply a case where AT might override the default speech for parens, etc.

## Matrix, Determinant, Vector
I'm not sure if matrix and vector require an intent. If they don't this would be (I think) the only case where AT needs to do some work finding the parens/brackets around an `mtable`. Vertical bars around an `mtable` is clear. Unlike $|x|y|z|$ where $x$, $y$, $z$ are scalars, if they are `mtable`s, it doesn't make sense. Thus it isn't a large ask that AT figure these out. On the other hand, I don't think it would be a big ask for authors to use `\matrix{...}`.

Matrices might have special speech if they are row/column matrices, or if the matrix is small. For example "the 2 by 2 matrix a b c d" avoids saying the row and column numbers before each entry.

## NamedSets: ℂ, ℕ, ℚ, ℝ, and ℤ  
These are spoken in a special way, although maybe that is just the default way to speak those Unicode characters.

However, adding subscripts and superscripts of various types (e.g., $\mathbb {Z}^2$,  $\mathbb {Z}^+$, and $\mathbb {Z}_2$) have special speech.

## Intervals
Intervals get spoken with "from ... to ..." words as opposed "open interval of ... comma ...". Hence, it seems that AT should know about the intent names `open-interval`, `closed-interval`, `open-closed-interval`, and `closed-open-interval`.

## Others?
I need to take another pass through the MathPlayer, MathCAT, and SRE rule sets to see if there are more cases where there is speech for an intent that doesn't match that which would be generated from the _name_@_hint_ `intent` syntax. This pass was based on the needs of the ClearSpeak speech style, something that MathPlayer, MathCAT, and SRE implement.


# Internationalization
A **major** question to resolve is: who/what is responsible for internationalization?

In this proposal, I feel that for anything in core, AT is responsible for internationalization. For anything outside of core, it is the author's responsibility to use the appropriate language for intents.

This approach may be controversial. The reason I take this approach is because when someone writes math, it is in the context of a document (textbook, homework, paper, ...). The reader is reading the math in the context/language of the document, so the author should be responsible for any speech that is not a default.

Where I can see there might be controversy is for "common" notations not in core such as `absolute-value` and `set`. For example, if there is a \abs{x} macro, does the macro need to produce an `intent` value with `absolute-value` when the math is in an English language document and `valeur-absolue` in a French language document? Or should the AT be responsible for knowing that it needs to translate `absolute-value` into `valeur-absolue` if the user indicated their primary language is French?

If the feeling is that AT is responsible for the translation, then how does AT know when to translate something? In higher level math, some concepts are always expressed in the language in which they were initially created. Does there need to be a list separate from the open list of intent names to translate? Does there need to be a column in the open list that says "translate this name"? Does the open list need to provide translations for lots of languages?

Lots of questions to answer...