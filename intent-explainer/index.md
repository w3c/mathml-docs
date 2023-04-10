---
title: "MathML Intent"
layout: wgnote
---

<nav id="toc" markdown="1">

## Table of Contents
{:.no_toc}

* toc
{:toc}

</nav>



## Introduction

MathML is supported by all major browsers for displaying math on the web. Even before widespread browser support, MathML was used by VoiceOver, Orca, JAWS, and NVDA to provide accessible math on the web. This document focuses on ways to improve the *accessibility* of MathML in cases where the presentation of the mathematical expression is ambiguous; notational ambiguity is discussed below. 

Since its beginnings in 1998, MathML has had two parts: Presentation MathML which describes the arrangement of math symbols, and Content MathML describes the composition of math operators.  These two subsets of MathML carry complementary information and can be used separately, or combined using [Parallel Markup](https://w3c.github.io/mathml/#mixing_parallel).  Neither of these forms carries adequate information to provide unambiguous accessible output in all cases. While some mathematical concepts are explicit or can be inferred, the general problem of understanding mathematical notation is too hard for present-day systems. For the hard cases, annotations need to be provided by an author. This document explains the Math Working Group's current ideas on how to allow authors to indicate how they want a notation to be spoken.

The goal is to allow authors/authoring tools the ability to capture, in MathML, enough information so that an expression can be correctly rendered by screen reader applications. It is likely that further applications such as search, computation, and conversion to other formats may benefit from the same annotations, but the focus of this document is on enhancing accessibility.

The Working Group is committed to backwards compatibility. Any solution to these problems should not invalidate old documents, but should allow progressive enhancement of existing content. Moreover, to allow flexible and progressive adoption, authors should be able to enhance the math contained in their documents as little or as much as they choose.

Note: this is an updated, shortened version of the [Math Working Group's Accessibility Gap Analysis](https://w3c.github.io/mathml-docs/gap-analysis/). This document assumes the reader has some familiarity math accessibility. 

## Semantic Reading Considerations

Most AT can do a good job reading high school and lower college level math. However, problems occur because mathematical notations can be ambiguous. For example, $(x,y)$ could be the coordinate of a point or it could be the open interval from x to y. Braille math codes such as Nemeth and UEB encode them the same. Speech could do so also with the literal reading "open paren x comma y close paren". However, this is not how someone would typically read it. Instead, they would say something like "the point x comma y" or "the open interval from x to y". There is a supposition that semantic readings are "better", but this has not been confirmed by research for people that are blind; studies do show that semantic reading styles are better for individuals with dyslexia and other non-visual print disabilities. Nonetheless, it is widely assumed that semantic speech is important because people/teachers use such readings often and listeners are used to hearing them. In many cases, the semantic reading is shorter and therefore uses less working memory. Some examples are:
* $x^2$ -- "x squared" versus "x superscript 2 end superscript"
* $\hat{x}$ -- "x hat" versus "x modified above with circumflex"
* $\big(\begin{smallmatrix} 1 & 0\\\\ 0 & 1\end{smallmatrix}\big)$ -- "the 2 by 2 identity matrix" vs "open paren start 2 by 2 table;  row 1, column 1, 1, column 2, 0, row 2, column 1 0, column 2 1, end table, close paren"

While all AT speaks $x^2$ semantically, some do not speak $\hat{x}$ semantically, and none currently recognize an identity matrix. Recognizing special matrix forms such as identity matrices requires significant work on the part of AT. While a sighted person can instantly recognize an identity matrix, someone using a screen reader would have to linearly listen to all of the entries which is an extra burden for the AT user.

Higher mathematics adds an additional tier of complexity. In it, even $x^2$ can be ambiguous, and may warrant a different reading than ordinary. One such case is $L^2$ read simply "L2" in the domain of Lebesgue spaces. In such texts, the author can often find themselves to be one of a only a handful of practitioners who have full grasp of their technical terminology, making frequent manual annotations important for accessibility of the content.

Some notations, such as fractions and square roots, may require bracketing words or tones to indicate the start and end of an expression, for readers who can't see the presentation. For example, $\sqrt{x+1}$ is unambiguously spoken as "the square root of x plus 1 end root". Without these bracketing words, "the square root of x plus 1" could also be interpreted as $\sqrt{x}+1$. However, for someone who is dyslexic and uses AT, the extra words are a distraction and shouldn't be used. This difference between the needs of users means that a full solution should allow flexibility based on the reader -- literal text strings annotated by authors may be inappropriate for some readers.


### Ambiguity in Speech and Braille

Common mathematical expressions such as $ax^2+bx+c=0$ are mostly unambiguous. However there are some notations that are ambiguous which makes interpretation difficult. As mentioned above $(a,b)$ could represent a point, or the open interval from ‘a’ to ‘b’, or the gcd of ‘a’ and ‘b’. There are several other potential interpretations. It is also the case that different notations can be used to represent the same concept. For example $]a,b[$ is also sometimes used to represent the open interval from ‘a’ to ‘b’ (but not the gcd, etc). These ambiguities present difficulties for AT that wishes to provide semantic speech.

In general, math braille is presentational in that the braille describes the math that is seen, so problems with Presentation MathML are _much_ fewer for braille generation.
The MathML WG has identified three examples where braille is not presentational in Nemeth code (a common braille math code in the US and some other countries) inside of a mathematical expression.
<details>
<summary>
Examples of semantic differences in Nemeth Code
</summary>
<ul>
<li>The combinatorial symbol $\binom{n}{k}$ is easily confused with a 2x1 column vector. Note that Nemeth braille can express these two cases unambiguously, so a “best practices” doc can help distinguish these. The braille for that binomial coefficient is ⠷⠝⠩⠅⠾ and the braille for the similar 2x1 column vector is ⠠⠷⠝⠠⠾⠠⠷⠅⠠⠾.</li>
<li>“:” either is a ratio (which has spaces on either side in Nemeth) or something else (mapping, field extension, …) which is prefixed with a punctuation indicator and has no spacing. Note there is a ratio code point in Unicode (U+2236), but its use is not common in MathML.</li>
<li>Vertical Bar ( | ) has many meanings. When used as a sign of comparison as defined by Nemeth code, it has spaces around, otherwise it doesn’t. Examples of a sign of comparison: $\lbrace x \mid x \in ℝ\rbrace$ and $P(A\vert B)$. Examples where it is not a sign of comparison: $\vert x\vert$ and $x|3$ (x divides 3).</li>
</ul>
</details>

## Allowing Authors to Express Their Intent

Content MathML is one way to encode intent in MathML. It's goal is to capture mathematical semantics. However, because of the vast range of mathematical semantics, it is not feasible for AT to understand even a small amount of what is allowed in content MathML, even when restricted to OpenMath dictionaries. Instead, what is important for AT is to allow authors to give strong hints to AT how to speak expressions. Because of varying disabilities, specifying exact speech should be discouraged (see blindness and dyslexia discussion above).

### Leveraging Existing Technology
The Web platform has support for a number of ideas related to some of our goals. Below a list of technologies and a summary of their suitability in MathML. A fuller discussion is in the [Accessibility Gap Analysis](https://w3c.github.io/mathml-docs/gap-analysis/):

#### ARIA
ARIA was designed to allow adding additional information to a tag when a tag does not convey the intended semantics/speech. There are a number of issues unique to math that make the use of ARIA problematic without changes to the ARIA spec:
* The value of the label is a plain text string. Speech cues (such as pauses) can not be added nor can forced pronunciation. In particular, in English, mathematics always uses the long ‘a’ sound, but speech engines have no way to know they are speaking math and so often use the short ‘a’ sound which can make it difficult to understand math content.
* Mathematics has its own braille code. [aria-label](https://w3c.github.io/aria/#aria-label) affects the braille produced. The braille used for math differs significantly from the text used for speech and so the use of aria-label would interfere with proper braille generation.
The ARIA 1.3 draft adds the attribute [aria-braillelabel](aria-braillelabel), but there are multiple braille codes for some languages (in English, UEB and Nemeth); it is not possible for the author to know which braille code to generate. The ARIA spec would need to change for aria-label to be an option.
* aria-label does not allow flexible speech based on a reader's disability 
* Mathematical expressions can often be long enough that a user needs to explore/navigate them. This means the simple approach of using aria-label only on a math tag is too simple -- it needs to be placed on all the parts of the expression where the normal reading would be incorrect (at a minimum, from the deepest point in the tree where there is ambiguity to the root). This is a viable approach and SRE in MathJaX does something similar (it doesn’t use aria-label because screen readers don’t support aria-label on MathML elements; it uses JavaScript to read its private attributes, including ones that create a navigation hierarchy). 

#### CSS
CSS provides a way to associate rendering properties with a node. A CSS-like approach that potentially attaches speech rules a MathML element is an option. This avoids the repetition and navigation challenges with 'aria-label', along with being flexible to generate speech appropriate for people with different impairments assuming either the AT can choose among different CSS-like rules based on the intended user. 

A potential problem is that MathML is used for accessibility in contexts beyond the web (e.g., Word documents and PowerPoint slides). It is also used in XML workflows in publishing. CSS-like system is problematic in those contexts. Copying math from one place to another likely breaks accessibility unless the CSS is embedded in the MathML markup via the 'style` attribute.

#### Parallel MathML Markup
The MathML standard includes presentation and content elements. These can be combined using [Parallel Markup](https://w3c.github.io/mathml/#mixing_parallel) inside of a `semantics` element. While content MathML defaults to using [OpenMath](https://openmath.org/standard/om20-2019-07-01/omstd20.html) to give meaning to a symbol, it is possible to specify a different location such as [this page that describes an open interval](https://www.wikidata.org/wiki/Q78240747). These pages often have pronunciation guidelines and could be gathered offline to produce keys to use for speech generation.

The `semantics` element has been part of the MathML standard since 1998, so no new technology is needed to support this solution.  Despite being present since MathML's inception, content markup is only rarely used in web pages, electronic documents, or math authoring tools; parallel markup is used even less frequently.


## A MathML-specific Solution
Each of the solutions above have problems when applied to math. This has led the Math WG to explore a new MathML-specific solution. The largest drawback to any MathML-specific solution is that it would expand any “MathML exists in its own world” criticism and wouldn’t leverage work done on the web to support existing web technologies, now or in the future. The generic advantage is that the solution would (mostly) not be held hostage hoping for changes to other specifications.

### Intent
To allow authors to express how they would like their notations read, the Math WG group proposes adding an `intent` attribute to all MathML elements. This is an optional argument that allows authors to annotate the generated MathML. The full details can be found in the [MathML Working Draft](https://w3c.github.io/mathml/#mixing_intent). `intent` is meant to offer a lightweight solution for partial annotation of an expression so it can be spoken appropriately by AT. The intent syntax borrows concepts from Content MathML to encode the structure of mathematical operations (a “syntax tree”), allowing for incremental narration and navigation that follows the argument structure of a formula. The basic format of intent is like a function call. For example, here is how intent could be used to disambiguate $(0,5)$:
```xml
<mrow intent="point($x,$y)">
  <mo>(</mo>
  <mi arg="x">0</mi>
  <mo>,</mo>
  <mi arg="y">5</mi>
  <mo>)</mo>
</mrow>
```
Here, "point" gives a hint how this should be read. It has two arguments given by "$x" and "$y" (found by looking at the children with an `arg` attribute). This could then be read "point 1 comma 2" or if the arguments were complicated, with bracketing words.

The Working Group plans to develop a list of "core" intent names that all AT should understand along with a registry for "open" names where there is no expectation that AT will understand them. Other software however, might be able to make use of these "crowd sourced" names.

Names in the core set will include "fraction" and "power", where the speech might vary depending on the type of fraction ("three fifths", kilometers per hour") or value of the arguments ("x squared", "x to the fourth power").
The open set of names are meant to be chosen so that they will speak sensibly even if AT knows nothing about them. For example, if "transpose" is an open name, then $M^T$ with MathML
```xml
<msup intent="transpose($x)">
  <mi arg="x">M</mi>
  <mi>T</mi>
</msup>
```
will read something like "transpose of M".

In addition to function names and references ("$x"), "properties" are supported via a `:property` syntax. To give flexibility to the reading, the following properties can be given: "prefix", "infix", "postfix", "silent", and "function" (default). If instead of a functional reading, the author feels the above MathML should be read as "M transpose", then the intent could have been written as `intent="transpose:postfix($x)"`. Although discouraged, speech can be forced through the use of literals -- see the spec for details.

Function and property names can have `-` and `_` in them. Those should be replaced with a space for speech. That allows multiple word names such as "open-interval" to be function names and still be read correctly. 
                                              
Properties differ from function names in that they influence speech but are not meant to be spoken.
In addition to the "arity" properties listed above, the group has discussed a number of other properties such as "unit" (so "m" can be spoken as "meter") and "chemical-element". We have also discussed `mtable` properties such as "system-of-equations", "cases", and "matrix" that govern the way a table is spoken ("Three equations, equation 1 ..." even if there are multiple columns used for alignment). "identity-matrix" is another possibility which would make it easy for AT to speak the example in the introduction well. As with function names, the Math Working Group intends to develop a list of core properties all AT should know about and an open registry that AT or other software might make use of.

### Intent Generation
A goal for "intent" is that it can be avoided for most examples and only included when needed for disambiguation.
A number of members of the Math Working Group are authors of TeX-to-MathML software and feel that there is a relatively straight forward path for TeX authors to associate speech/intent values with macros. For example, `\abs{x}` could generate the display $\vert x \vert$ and the MathML
```xml
<mrow intent="absolute-value($x)">
  <mo>|</mo>
  <mi arg="x">x</mi>
  <mo>|</mo>
</mrow>
```
AT could then speak this as "absolute value of x". If $x$ were complicated and bracketing words are appropriate for the user, it could speak this as "absolute value of x, end absolute value". `intent` allows AT to tailor the speech to the needs of the listener.

`intent` can also be used to direct speech for ambiguous characters. For example, $\times$ might be spoken as "times" or "cross product". In TeX, it is produced by the macro `\times` which could generate `<mo intent="times">×</mo>`, but it is pretty easy to create another macro `\xprod` which could generate `<mo intent="cross-product">×</mo>`.

### Other Uses
Although "intent" is primarily meant to help AT generate speech, it could be helpful for search and computation. Members of the working group have discussed the possibility of Content MathML to Presentation MathML with `intent` and vice-versa. The later only works is there is a clear mapping between intent names and `csymbol` and probably works best for the non-strict parts of Content MathML.

Properties can be useful to provide additional information about a variable such as `<mi intent=":rational">x</rational>` to indicate that "x" is a rational number. For sighted users, potentially a MathML renderer or browser extension might display the properties as a popup.