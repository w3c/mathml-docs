---
title: "literal and common core properties: details"
---

# literal and common core properties: details

[Core properties](intent-core-properties)

------


<nav id="toc" markdown="1">

## Table of Contents
{:.no_toc}

* toc
{:toc}

</nav>

## Defaults

The `:literal` and `:common` core properties establish a set of defaults for speaking every MathML element that MathML intent generators can assume and that AT should implement. That does not mean that the exact words are specified, only that AT chooses words that convey the default meaning. For example: `msup` is spoken as "super" or "superscript" or some similar words if that element or some ancestor includes the `:literal` property. The exact words may depend upon both the audience and the children of node. In particular, for someone who is blind, it may be important to indicate the start and end of fractions, roots, etc.

## `literal` property

The default meanings and special cases for all the MathML elements are:

* leaf tags speak their contents. Exceptions are:
  * `ms` speaks its open/close deliminators in addition to its contents.
  * `mglyph` speaks the alt text
  * `mspace`, `malginmark`, `maligngroup`, and `none` are either silent or generate pauses
  * `msline`, indicates that it is a line
  * [trig function names](#trig) might be expanded
* `mrow` -- speaks the children
* `mfrac` -- _arg1_ "over" _arg2_
* `msqrt` -- "root" _arg_
* `mroot` -- "root with" _index_ "and contents" _contents_
* `merror` -- indicates there is an error and speaks the contents
* `mfenced` -- should speak the same as the equivalent `mrow` notation
* `menclose` -- should indicate the notation attributes along with the contents. For example, "box around _arg_" or "line under _arg_"
* `msup` -- _arg1_ "superscript" _arg2_. The exceptions are when the superscript is a [pseudo-script character](https://w3c.github.io/mathml/#chars_pseudo-scripts), in which case "superscript" is _not_ spoken (e.g, $x^\prime$ is spoken "x prime"). See below for a list of pseudo-script characters.
* `msub` -- _arg1_ "subscript" _arg2_.
* `msubsup` -- _arg1_ "subscript" _arg2_"superscript" _arg3_. As with `msup`, exceptions are made when the superscript is a [pseudo-script character](https://w3c.github.io/mathml/#chars_pseudo-scripts).
* `mover` -- _arg1_ "with" _arg2_ "above". When _arg2_ is bar, hat, caret, tilde, dot (1-4 of them), acute, or grave, the speech is abbreviated to _arg1_ _arg2_ as in "x bar".
* `munder` -- _arg1_ "with" _arg2_ "below". When _arg2_ is bar, the speech is abbreviated to _arg1_ _arg2_ as in "x underbar"
* `munderover` -- _arg1_ "with" _arg2_ "below and" _arg3_ "above. When _arg3_ is one of the special cases for `mover`, then the speech is abbreviated to _arg1_ _arg3_ "with" _arg2_ "below" as in "x bar with cup below"
* `mmultiscripts` --  indicates the scripts and their position in some way. E.g., "start-scripted ... pre-subscript ... pre-superscript ... base ... post-subscript ... post-superscript ...  end-scripted"
* `mtable`/`mtr`/`mlabeledtr`/`mtd` -- say something appropriate for tables (no recognition of determinants, matrices, vectors, etc)
* elementary math elements (`mstack`/`mlongdiv`/`msgroup`/`msrow`/`mscarries`/`mscarry`) -- say something about the layout, but not that it is addition, long division, repeated decimals, etc.
* `maction` -- speaks the selected child with maybe some indication of the action
* `semantics` -- speaks the presentation child

## `common` property

The default meanings and special cases for all the MathML elements are:

* leaf tags speak their contents. Exceptions are:
  * `ms` speaks its open/close deliminators in addition to its contents.
  * `mglyph` speaks the alt text
  * `mspace`, `malginmark`, `maligngroup`, and `none` are either silent or generate pauses
  * `msline`, indicates that it is a line
  * "gcd" and "lcm" should be spelled out
  * [trig function names](#trig) might be expanded
* `mrow` -- speaks the children
  * the mrow consists of parens, brackets around an mtable -- speak as a matrix
  * the mrow consists of vertical bars around an mtable -- speak as a determinant
* `mfrac` -- indicates it is division, but might have a number of special case rules depending on the arguments. For example "three quarters", "x over y", "a over b all over c"
* `msqrt` -- indicates it is a square root
* `mroot` -- indicates it is a root with an index. There should be special cases for at least '2' and '3' as the index
* `merror` -- indicates there is an error and speaks the contents
* `mfenced` -- should speak the same as the equivalent `mrow` notation
* `menclose` -- should indicate the notation attributes along with the contents. Special case speech might be appropriate when menclose looks like a similar notation that has special cases (e.g, `notation="top"` looks the same as `mover` with a "_" (or equivalent) second child).
* `msup` -- should assume that the notation is a power with the following special cases
  * the power is '2' or '3'
  * the power is '-1' and this is a [trig function](#trig) or log function
  * the power is one of the [pseudo-script character](https://w3c.github.io/mathml/#chars_pseudo-scripts), in which case the superscript is _not_ spoken (e.g, $x^\prime$ is spoken "x prime")
  * the base is one of the [named sets](#namedsets-ℂ-ℕ-ℚ-ℝ-and-ℤ)
* `msub` -- indicates a subscript. Special cases:
  * the base is "log" or "lg"
  * the base is one of the [named sets](#namedsets-ℂ-ℕ-ℚ-ℝ-and-ℤ)
  * the base is a large operator (either because it is an `mo` that has an explicit or default [largeop attribute](https://w3c.github.io/mathml/#presm_mo_dict_attrs) or because it has the [`:largeop` intent property](https://w3c.github.io/mathml-docs/intent-core-properties/#prop-largeop))
* `msubsup` -- indicates a subscripted variable raised a power with the same special cases as `msup` and `msubsup`. This includes (read the same as for munderover) 
  * the base is a large operator
* `mover` -- indicates that the second argument is over the first.
Special cases:
  * bar, hat, caret, tilde, dot (1-4 of them), acute, or grave
  * the base is a large operator
* `munder` -- indicates that the second argument is under the first. Special cases:
  * the base is a large operator
  * the base is "lim",  "limit", "liminf", or "limsup"
* `munderover` -- indicates there is content above and below the base. Special case:
  * those listed for mover
  * the base is a large operator (speak using "from" and "to" -- [see below](#large-operators))
* `mmultiscripts` --  indicates the scripts
* `mtable`/`mtr`/`mlabeledtr`/`mtd` -- say something appropriate for tables, making it clear which row and column each entry is in. Special cases:
  * $1 \times n$ and $n \times 1$  tables might have specialized speech
  * small tables with simple entries might have specialized speech
* elementary math elements (`mstack`/`mlongdiv`/`msgroup`/`msrow`/`mscarries`/`mscarry`) -- say something appropriate. This might be something like "math stack 323 plus 61 horizontal line 384"
* `maction` -- speaks the selected child with maybe some indication of the action
* `semantics` -- speaks the presentation child

### Special Notations

#### Trig

The following is a minimum list of trig functions that should be recognized and spoken appropriately:
"cos", "cosec", "cosech", "cosh", "cot", "cotan", "cotanh", "coth", "csc", "csch",
"sec", "sech", "sin", "sinh", "tan", "tang", "tanh", "tg", "ln", "log", "lg".
Other languages may add localized versions to this list.

If these names are encountered, they typically are expanded to their full name: "csc" would be "co-secant" in English; "sinh" would be "hyperbolic sine", etc.

As noted above, a trig function raised to a "-1" power should have special speech. For example, $sin^{-1} x$ might be spoken as "inverse sine of x", "arc sine of x", or "sine inverse of x".

#### NamedSets: ℂ, ℕ, ℚ, ℝ, and ℤ  

These are spoken in a special way, although maybe that is just the default way to speak those Unicode characters.

However, adding subscripts and superscripts of various types (e.g., $\mathbb {Z}^2$,  $\mathbb {Z}^+$, and $\mathbb {Z}_2$) often have specialized speech such as "Z 2".
