
# MathML3 Alignment Markers, malignmark and maligngroup





`malignmark` and `maligngroup` are not supported in [[MathML-Core]].
For most purposes it is recommended that alignment is implemented
directly using `mtable` columns.


For existing MathML using `malignmark` a [Javascript
polyfill](https://github.io/mathml-polyfills/) is provided.



## Description



Alignment markers are space-like elements (see
[space-like](#presm_mspace))) that can be used to horizontally align
specified points within a column of MathML expressions by the
automatic insertion of the necessary amount of horizontal space
between specified sub-expressions.




The expressions whose parts are to be aligned (each equation, in the
example at the end of this section) must be given as the table elements (i.e. as the `mtd` elements) of one column of an
`mtable`. To avoid confusion, the term “table
cell” rather than “table element” will be used in the
remainder of this section.



All interactions between alignment elements are limited to the
`mtable` column they arise in. That is, every
column of a table specified by an `mtable` element
acts as an “alignment scope” that contains within it all alignment
effects arising from its contents. It also excludes any interaction
between its own alignment elements and the alignment elements inside
any nested alignment scopes it might contain.




## Specifying alignment groups


Each part of expression to be aligned should be in an alignment group.
The point of alignment is the left edge (right edge if for RTL) of the element that follows an `maligngroup` element
unless an `malignmark` element
is between `maligngroup` elements. In that case, the left edge (right edge if for RTL) of the element that follows the
`malignmark` is the point of alignment for that group.




If `maligngroup` or `malignmark` occurs outside of an
`mtable`, they are rendered with zero width.




In general, a table cell containing _n_ `maligngroup` elements
contains _n_ alignment groups, with the _i_th group consisting of the
elements entirely after the _i_th `maligngroup` element and before the
(_i_+1)-th; no element within the table cell's content should occur
entirely before its first `maligngroup` element.




Note that the division into alignment groups does _not_ necessarily
fit the nested expression structure of the MathML expression
containing the groups &#x2014; that is, it is permissible for one
alignment group to consist of the end of one `mrow`, all of another
one, and the beginning of a third one, for example. This can be seen
in the MathML markup for the example given at the end of this section.



Although alignment groups need not coincide with the nested expression
structure of layout schemata, there are nonetheless restrictions on
where `maligngroup` and `malignmark` elements are allowed within a
table cell. These elements may only be contained within elements
(directly or indirectly) of the following types (which are themselves
contained in the table cell):




 * an `mrow` or `mstyle` element, including an inferred
   `mrow` such as the one formed by a multi-child
   `mtd` element<span>, but excluding `mrow` which
   contains a change of direction using the `dir` attribute</span>;


 * an `mphantom` element;

 * an `mfenced` element;


 * an `maction` element, though only its
   selected sub-expression is checked;





These restrictions are intended to ensure that alignment can be
unambiguously specified, while avoiding complexities involving things
like overscripts, radical signs and fraction bars. They also ensure
that a simple algorithm suffices to accomplish the desired
alignment.



For the table cells that are divided into alignment groups, every
element in their content must be part of exactly one alignment group,
except for the elements from the above list that contain
`maligngroup` elements inside them and the
`maligngroup` elements themselves. This means
that, within any table cell containing alignment groups, the first
complete element must be an `maligngroup` element,
though this may be preceded by the start tags of other elements.
This requirement removes a potential confusion about how to align
elements before the first `maligngroup` element,
and makes it easy to identify table cells that are left out of their
column's alignment process entirely.



It is not required that the table cells in a column that
are divided into alignment groups each contain the same number of
groups. If they don't, zero-width alignment groups are effectively
added on the right side (or left side, in a RTL context) of each table cell that has fewer groups than
other table cells in the same column.





## Table cells that are not divided into alignment groups



Expressions in a column that are to have no alignment groups
should contain no `maligngroup` or `malignmark`
elements. Expressions with no alignment groups are aligned using only
the `columnalign` attribute that applies to the table
column as a whole., or via the use of CSS in systems where that is available.

## Specifying alignment points using `<malignmark>`



An `malignmark` element anywhere within the
alignment group (except within another alignment scope wholly
contained inside it) overrides alignment at the start of an `maligngroup` element.




The `malignmark` element indicates that the
alignment point should occur on the left edge (right edge in a RTL context) of the following element.




When an `malignmark` element is provided within an
alignment group, it should only occur within the elements allowed for `maligngroup`
(see [align groups](#presm_specify_align_group)).
There should be at most one `malignmark` element
in an alignment group.


## Alignment algorithm



Alignments marked with `maligngroup`
may be converted to an equivalent `mtable`
that does not use `maligngroup`, but uses
additional table columns.
A [Javascript polyfill](https://w3c.github.io/mathml-polyfills/) is provided
to implement such a transformation which may be useful with [MathML-Core](https:://w3.org/TR/MathML-Core) implementations.



The details of the transfomation are implementation
specific, although the suppled polyfill provides an explicit
example. The basic idea is that extra columns are introduced so that
each alignment group is represented by two columns: a first column
aligning right towards the alignment point, and a second column
aligning left (or reversed in an RTL context). The alignment point
may be explicitly marked with `malignmark`
or may be implicit at the startof the alignment group as described above.
Explicit rules
for cells that span across alignment scopes such as table headings
are not given in detail here, although the polyfill provides one implementation.


## MathML representation of an alignment example



The above rules are sufficient to explain the MathML representation
of the example given below.



```
<mtable>
  <mtr>
    <mtd>
      <mrow>
        <maligngroup/>
        <mn>8</mn>
        <mo>&#x2062;<!--InvisibleTimes--></mo>
        <malignmark/>
        <mi>x</mi>
      </mrow>
      <maligngroup/>
      <mo>+</mo>
      <mrow>
        <maligngroup/>
        <mn>55</mn>
        <mo>&#x2062;<!--InvisibleTimes--></mo>
        <malignmark/>
        <mi>y</mi>
      </mrow>
      <maligngroup/>
      <mo>=</mo>
      <mn>0</mn>
    </mtd>
  </mtr>
  <mtr>
    <mtd>
        <mrow>
          <maligngroup/>
          <mn>3</mn>
          <mo>&#x2062;<!--InvisibleTimes--></mo>
          <malignmark/>
          <mi>x</mi>
        </mrow>
        <maligngroup/>
        <mo>-</mo>
        <mrow>
          <maligngroup/>
          <mn>7</mn>
          <mo>&#x2062;<!--InvisibleTimes--></mo>
          <malignmark/>
          <mi>y</mi>
        </mrow>
      <maligngroup/>
      <mo>=</mo>
      <mrow>
        <mo>-</mo>
        <mn>1</mn>
      </mrow>
    </mtd>
  </mtr>
</mtable&gt;
```


```
\documentclass{article}
\usepackage{amsmath,stix2}
\begin{document}
\begin{alignat*}{6}
  8&x + {} &55&y &&= 0\\
  3&x - {} &7&y  &&= - 1
\end{alignat*}
\end{document}
```
