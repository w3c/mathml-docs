
Notes on MathML,
a non-normative companion the MathML 4 Recommendation draft.

<div id="editing" class="ednote">

Notes on editing the notes

* There are Markdown files for each chaper loosely following the chapters in [[MathML4]]

* In addition to standard  Markdown and [respec markup](https://respec.org/docs)

  You can mix html eg `<div id="editing" class="ednote">` produces this note.
  
  This document can reference [[MathML4]], [[MathML-Core]] and [[Entities]] via ReSpec shorthands
  `[[\MathML4]]`, `[[\MathML-Core]]`  and `[[\Entities]]` also as an extra filter, custom links to
  specific id within the documents can be made with Markdown links using `full`, `core` and `entities` as the URI
   so 
   * `[characters](full#chars_intro)`  produces [characters](full#chars_intro), and
   * `[MathML Core Formating model](core#visual-formatting-model)` produces [MathML Core Formating model](core#visual-formatting-model)
   * `[Script and Calligraphic](entities/script)` produces [Script and Calligraphic](https://w3c.github.io/xml-entities/script)

* You may wish to copy text from MathML3. Depending on the context it is sometimes easier to copy plain text directly from the browser, or to copy the respec html source from https://mathml-refresh.github.io/notes-on-mathml (source https://github.com/mathml-refresh/notes-on-mathml), in either case requiring some hand edits to respec markdown.
</div>
