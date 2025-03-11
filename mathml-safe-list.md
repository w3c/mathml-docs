## MathML Safe List

### Short Version
MathML-core considers all elements and attributes of MathML-core (as listed in [section 2.1 of MathML-core](https://w3c.github.io/mathml-core/#mathml-elements-and-attributes)) as safe and not needing a sanitization except the following elements.

We recommend the [Sanitzer API](https://wicg.github.io/sanitizer-api/) to sanitize MathML by keeping all elements and attributes except the follwing:
- any common attribute with HTML attributes for which need a sanitzation as done in HTML,
- the `mphantom` elements which should, ideally, be kept or replaced by an empty `mspace` element; if these replacements are not possible, the element should be removed.
- the `maction`  elements which should, ideally, be replaced by an `mrow` element with the same children or, if this replacement is not possible, should be replaced by its child nodes and
- any `annotation` or `annotation-xml` element whose `encoding` attribute is of a media-type that is is either absent or is not among the trusted types or if it contains an `href` attribute: the element should be removed.

### Detailed Version
MathML-core considers the following elements and attributes of MathML-core as safe and not needing sanitization:

Safe "as-is" Elements of MathML-core:
`math, merror, mfrac, mi, mmultiscripts, mn, mo, mover, mpadded, mprescripts, mroot,  mrow, ms, mspace, msqrt, mstyle, msub, msubsup, msup, mtable, mtd, mtext, mtr, munder, munderover, semantics`

Safe "as-is" attributes of MathML-core:
`dir, displaystyle, mathbackground, mathcolor, mathsize, scriptlevel, encoding, display, linethickness, intent and arg`; on `mo` elements: `form, fence, separator, lspace, rspace, stretchy, symmetric, maxsize, minsize, largeop, movablelimits`; on `mpadded` elements: `width, height, depth, lspace, voffset`, on `mspace` elements: `width, height, depth`, on `munderover` elements `accent` and `accentunder`; on `mtd` elements `columnspan` and `rowspan`.

Moreover, the following attributes have their syntax and semantics specified in the HTML specification. The sanitizer behaviour on these attributes should be as is done on HTML elements: `on*, id, class, style, data-*, autofocus, nonce,tabindex` (for example any javascript should be removed).

The elements of MathML-core which need treatment by the sanitizers are the following. The proposed replacements are expressed in order of preference:
- the `mphantom` elements which should, ideally, be kept or replaced by an empty `mspace` element; if this replacement is not possible,  the element should be removed it,
- the `maction`  elements which should, ideally, be replaced by an `mrow` element with the same children; if this replacement does not exist, then replace by its child nodes, and
- any `annotation` or `annotation-xml` element whose `encoding` attribute is of a media-type that is is either absent or is not among the trusted types or if it contains an `href` attribute: the element should be removed.