## Notes on Unicode in MathML

### Historical Background

Notation and symbols have proved very important for
mathematics. Mathematics has grown in part because its notation
continually changes toward being succinct and suggestive. Many new
signs have been developed for use in mathematical notation, and many
have been adopted that were originally introduced elsewhere.The result
is that mathematics makes use of a very large collection of
symbols. It is difficult to write mathematics fluently if these
characters are not available for use. It is difficult to read
mathematics if corresponding glyphs are not available for presentation
on specific display devices.

The W3C Math Working Group therefore took on the job of specifying
part of the mechanism needed to proceed from notation to final
presentation, and has collaborated with the Unicode Technical
Committee (UTC) and the STIX Fonts Project in undertaking
specification of the rest.

Unless otherwise stated, the mappings
discussed in this chapter and elsewhere in the [[MathML4]] and [[MathML-Core]]
recommendations are based on Unicode 14.or later.

While a long process of review and adoption by UTC and ISO/IEC of the
characters of special interest to mathematics and MathML is now
complete, more characters may be added in the future. For the latest
character tables and font information, see the [[[xml-entity-names]]] and
the [Unicode Home Page](http://www.unicode.org/), notably 
[Technical Report #25 “Unicode Support for Mathematics”](http://www.unicode.org/reports/tr25/tr25-8.html).

A MathML token element takes
as content a sequence of MathML characters or `<mglyph/>` elements. The
latter are used to represent characters that do not have a Unicode
encoding. The need for mglyph should be rare because Unicode 3.1
provided approximately one thousand alphabetic characters for
mathematics, and Unicode 3.2 added over 900 more special mathematical
symbols.

###  Unicode Character Data

There are essentially three different ways of encoding character data in an XML document.

 * Using characters directly: For example, the '→' (character U+2192
   [RIGHTWARDS ARROW]) may have been inserted. Note if using this form
   it is advisable to use UTF-8 encoding that allows the full Unicode range.
   

 * Using numeric XML character references: For example, '→' may be
   represented as `&amp;amp;#8594;` (decimal) or `&amp;amp;#x2192;` (hex). Note that the
   numbers in the character references always refer to the Unicode
   encoding (and not to the character encoding used in the XML
   file). By using character references it is always possible to
   access the entire Unicode range.

 * Using entity references: The [MathML4 DTD](full#parsing_usingdtd)
   references the [HTML/MathML entity
   collection](entities/2007/htmlmathml-f.ent) which defines internal
   entities that expand to character data. Thus for example the entity
   reference `&amp;amp;rightarrow;` may be used rather than the character
   reference `&amp;amp;#x2192;`. An XML fragment that uses an entity reference
   which is not defined in a DTD is not well-formed; therefore it will
   be rejected by an XML parser. For this reason every fragment using
   entity references must use a DOCTYPE declaration which specifies
   the MathML DTD, or a DTD that at least declares any entity
   reference used in the MathML instance. Note that this does _not_
   apply to fragments parsed as HTML, in which this fixed set of
   entity definitions is always defined.
   
### Mathematical Alphanumeric Symbols

In mathematical and scientific writing, single letters often denote
variables and constants in a given context. The increasing complexity
of science has led to the use of certain common alphabet and font
variations to provide enough special symbols of this letter-like
type. These denotations are generally not letters that may be used to
make up words with recognized meanings, but individual carriers of
semantics themselves. Writing a string of such symbols is usually
interpreted in terms of some composition law, for instance,
multiplication. Many letter-like symbols may be quickly interpreted as
of a certain mathematical type by specialists in a given area: for
instance, bold symbols, whether based on Latin or Greek letters, as
vectors in physics or engineering, or Fraktur symbols as Lie algebras
in part of pure mathematics.

The additional Mathematical Alphanumeric Symbols provided in Unicode
3.1 have code points in the range U+1D400 to U+1D7FF in Plane 1, that
is, in the first plane with Unicode values higher than 216. This plane
of characters is also known as the Secondary Multilingual Plane (SMP),
in contrast to the Basic Multilingual Plane (BMP) which was originally
the entire extent of Unicode. Support for Plane 1 characters in
currently deployed software is not always reliable, but it should be
possible in multilingual operating systems, since Plane 2 has many
Chinese characters that must be displayable in East Asian locales.

As discussed in [Mathematics style attributes common to token
elements](full#presm_commatt), MathML offers an alternative mechanism
to specify mathematical alphanumeric characters. This alternative
mechanism spans the gap between the specification of the mathematical
alphanumeric symbols as Unicode code points, and the deployment of
software and fonts that support them. Namely, one uses the mathvariant
attribute on a token element such as mi to indicate that the character
data in the token element selects a mathematical alphanumeric symbol.

In principle, any mathvariant value may be used with any character
data to define a specific symbolic token. In practice, only certain
combinations of character data and mathvariant values will be visually
distinguished by a given renderer. In this section we explain the
correspondence between certain characters in Plane 0 that, when
modified by the mathvariant attribute, are considered equivalent to
mathematical alphanumeric symbol characters.

The mathematical alphanumeric symbol characters in Plane 1 include
alphabets for Latin upper-case and lower-case letters, including
dotless i and j, Greek upper-case and lower-case letters, Greek
symbols (also known as variants), including upper-case and lower-case
digamma, and Latin digits. These alphabets provide Plane 1 Unicode
code points that differ from corresponding Plane 0 characters only by
a variation in font that carries mathematical semantics when used in a
formula.

The mathvariant attribute uses exactly this correspondence to provide
an alternate markup encoding that selects these Plane 1
characters. For example, the Mathematical Italic alphabet runs from
U+1D434 ("A") to U+1D467 ("z"). Thus, a typical example of an
identifier for a variable, marked up as

```
<mi>a</mi>
```

and rendered in a mathematical italic font could equivalently be marked up as


```
<mi>&amp;amp;#x1D44E;<!--MATHEMATICAL ITALIC SMALL A--></mi>
```

which invokes the Mathematical Italic lower-case a explicitly.

An important use of the mathematical alphanumeric symbols in Plane 1
is for identifiers normally printed in special mathematical fonts,
such as Fraktur, Greek, Boldface, or Script. As another example, the
Mathematical Fraktur alphabet runs from U+1D504 ("A") to U+1D537
("z"). Thus, an identifier for a variable that uses Fraktur characters
could be marked up as

```
<mi>&amp;amp;#x1D504;<!--BLACK-LETTER CAPITAL A--></mi>
```

An alternative, equivalent markup for this example is to use the
common upper-case A, modified by using the mathvariant attribute:

```
<mi mathvariant="fraktur">A</mi>
```

A MathML processor must treat a mathematical alphanumeric character
(when it appears) as identical to the corresponding combination of the
unstyled character and mathvariant attribute value. It is important to
note that the mathvariant attribute specifies a semantic class of
characters, each of which has a specific appearance that should be
protected from document-wide style changes, so the intended meaning of
the character may be preserved. The use of a mathematical alphanumeric
character is also intended to preserve this specific appearance, and
so these characters are also not to be affected by surrounding style
changes.

Not all combinations of character data and mathvariant values have
assigned Unicode code points. For example, sans-serif Greek alphabets
are omitted, while bold sans-serif Greek alphabets are included, and
bold digits are included, while bold-italic digits are excluded. A
renderer should visually distinguish those combinations of character
data and mathvariant attribute values that it can subject to the
availability of font characters. It is intended that renderers
distinghish at least those combinations that have equivalent Unicode
code points, and renderers are free to ignore those combinations that
have no assigned Unicode code point or for which adequate font support
is unavailable.

Mathematical Alphanumeric Symbol characters should not be used for
styled prose. For example, Mathematical Fraktur A must not be used to
just select a blackletter font for an uppercase A as it would create
problems for searching, restyling (e.g. for accessibility), and many
other kinds of processing.

   
### Special Characters Not in Unicode

For special purposes, one may need a symbol which does not have a
Unicode representation. In these cases one may use the `<mglyph/>`
element for direct access to a glyph as an image, All MathML token
elements accept characters in their content and also accept an mglyph
there. Note that `<mglyph/>` is not supported in [[MathML-Core]]
however HTML elements may be nested inside MathML token elements so
you can use a standard HTML `<img/>` in that case.
