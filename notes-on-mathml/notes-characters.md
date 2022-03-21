## Notes on Unicode in MathML

### Introduction

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
