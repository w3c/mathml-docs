## Notes on the Operator Dictionary

### Normative status

The MathML Operator dictionary gives the suggested dictionary of
rendering properties for operators, fences, separators, and accents in
MathML, all of which are represented by `<mo>` elements.


In earlier versions of MathML, the operator dictionary was
implementation dependent wih the values given in the Recommendation
text being non normative suggestions.  In [[MathML-Core]] the values
given are **Normative** for web platform implementations implementing
Core, so in MathML4 it is strongly recommended that these spacing
values are
used even for non-core implemntations to ensure compatibility with
renderings of MathML on the web. Conversely some attributes contained in
the dictionary are not used by MathML Core level 1 and not listed in the
Core document, but are listed in the presentation in [MathML
4](full#oper-dict).

### Source data

The data for the dictionary presented in both [[MathML-Core]] and
[[MathML4]] is extracted from the
[`unicode.xml`](https://github.com/w3c/xml-entities/blob/gh-pages/unicode.xml?raw=true)
file which is maintained as part of the sources for [[Entities]]. If you need
to process the information programatically, you may find processing
`unicode.xml` directly may be more convenient than the human-oriented
presentations in the Recommendation documents.
