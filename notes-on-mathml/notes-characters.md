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
   
   
### Special Characters Not in Unicode

For special purposes, one may need a symbol which does not have a
Unicode representation. In these cases one may use the `<mglyph/>`
element for direct access to a glyph as an image, All MathML token
elements accept characters in their content and also accept an mglyph
there. Note that `<mglyph/>` is not supported in [[MathML-Core]]
however HTML elements may be nested inside MathML token elements so
you can use a standard HTML `<img/>` in that case.
