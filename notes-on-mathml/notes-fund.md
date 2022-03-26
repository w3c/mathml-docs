## Notes on MathML fundamentals

## Length Valued Attributes in MathML.

In [[MathML-Core]] all MathML atributes are defined to have the CSS <a
id="type_unit"
data-cite="CSS-VALUES-3#typedef-length-percentage"><code>&lt;length-percentage&gt;</code></a>
syntax. Although in MathML Core level 1 with restrictions on the
interpretation of `%`.

MathML full extends the syntax in several ways:

* **Unitless values**. A value such as `mathsize="2"` should be interpreted
  as `200%`. This form is for compatability with early versions of
  MathML and was already deprecated in MathML 3. It should be avoided
  in new documents.

* **Named spaces**. MathML has 7 named length values ranging from
  `veryverythinmathspace` to `veryverythickmathspace` and their
  negative space equivalents. Originally these were implemenation
  defind bu [[MathML4]] specifies them as multiples of 1/18
  em. (Multiples 1/18 &hellip; 7/18 and &minus;1/18 &hellip;
  &minus;7/18.)

  so `lspace="thickmathspace` `rspace="2thickmathspace` are equivalent
  to 
  `lspace="0.278em` `rspace=".556em` and this form is preferred, for
  compatibility with MathML Core.
  
* **psuedo-units** `<mpadded>` allows additional units `height`,
  `depth`, `width` In the usual case where `width` is used when
  setting the new width, this is equivalent to using a percentage
  value. Possible uses such as forcing a square by setting the height to
  `width` are not easily supported using the CSS length syntax but can
  usually be avoided.
  
* **Length Increments** In MathML 3, `<mpadded>` attributes had a
  special inerpretation for leading `+` or `-` signs in lengths, a
  length of `+3em` was not interpreted as `3em` but as an _increase_ in
  `3em` over the default value. This inerpretation is problematic in any
  context (including CSS) where lengths may be calculated, as it
  assumes conrol over the exact form used to write out the value.
  <span class="ednote">need to decide what to say here</span>


## Web links in MathML.

There is often a requirement to have hyperlinks in MathML, just as in
HTML documents. [[MathML2]] proposed using the [[xlink]] system to add
linking attributes. XLink is heavily based on XML Namespace markup and
so is not supported in HTML based systems.  [[MathML3]] specified that
`href` attributes could be used on any MathML element to specify a URL
be used as a link. Hopefully some version of this syntax will be
supported in level 2 of [[Mathml-Core]] but for technical reasons it
wasn't possible to include any linking in level 1 of MathML Core.

As for most features of MathML not directly supported in MathML Core,
[Polyfills](https://mathml-refresh.github.io/mathml-polyfills/) will
be provided, to allow auhors to use the MathML `href` attribute,
howevr some authors may prefer to generate MathML Core documens not
requiring polyfills, in which case they need to use HTML or JavaScript
to implement linking.

Perhaps the most common case is a token element acting as a link.

`<mi href="https://example.com/sin">sin</mi>`

which should render as

> [sin](https://example.com/sin)

In MathML Core this can be encoded with a nested HTML element:

`<mi><a href="https://example.com/sin">sin</a></mi>`

Or, if using an XML parser, also making the HML namespace explicit:

```
<mi><a xmlns="http://www.w3.org/1999/xhtml" 
       href="https://example.com/sin">sin</a></mi>
```


If the link text is not a single token elment, supporting the link
using MathML Core level 1 is a bit more complicated and perhaps most
simply implemented using JavaScript.

```
<mfrac href="https://example.com/half">
   <mn>1</mn>
   <mn>2</mn>
</mfrac>
```

Should render something like

> <a href="https://example.com/half"><sup>1</sup>/<sub>2</sub></a>

This could be marked up in MathML Core as

```
<mfrac 
  style="text-decoration:underline;cursor:pointer"
  onclick="location.href='https://example.com/half'">
   <mn>1</mn>
   <mn>2</mn>
</mfrac>
```

Naturally the CSS could be specified in a separate CSS file, but shown
inline using a `style` attribute here to make a self contained example.



