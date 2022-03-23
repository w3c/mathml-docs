## Notes on Media Types for MathML

### XML Media types 

<div class="ednote">

Need to decide if the MathML 3 media type registrations are copied or referenced (issue 258)

</div>


As for MathML 3 there are three media types (often colloquially known as mime types) for MathML:


 * `application/mathml-presentation+xml`
   
    MathML instances that consist solely of presentation markup, including MathML Core.
   

 * `application/mathml-content+xml`
   
    MathML instances that consist solely of content markup.
   

 * `application/mathml+xml`
   
    Any valid MathML instance.  Must be used for MathML instances that are a
    mix of presentation and content markup, or where the composition of an
    instance is not known or cannot be guaranteed.
   
  

Some MathML applications may import and export only one of these two
vocabularies, while others may produce and consume each in a different
way, and still others may process both without any distinction between
the two. Internally, many MathML processors favor one vocabulary, and
support the other vocabulary via conversion if at all. For example,
computational software typically favors content markup while
typesetting software generally favors presentation markup. By using
separate media types for MathML instances consisting solely of
presentation or solely of content markup, such processors can conduct
negotiation for MathML representations in the preferred
vocabulary. For example, consider two web services offering
mathematical computation services such as a spreadsheet and a computer
algebra system. Internally both prefer content markup, but by default,
both generate presentation markup for output. In the absence of media
type negotiation, a likely scenario for an exchange between two
systems involves two conversions, content to presentation and back
again. With negotiation, the conversions are eliminated. Similarly, a
client with a MathML instance in one of the vocabularies might seek a
web service that preferred that vocabulary.

MathML is commonly used in compound document settings, e.g. within
HTML, where content is drawn from a variety of sources, and processed
with multiple tools. In these cases, the composition of MathML
expressions generally is not known or at least cannot be guaranteed by
a user agent. Consequently, the `application/mathml+xml` type should
be used, as it may be applied to any valid MathML expression. Since
most applications involve data from untrusted sources,
`application/mathml+xml` will commonly be appropriate to use as a
default type, and all MathML processors are encouraged to accept it as
a fallback to the more specific formats.


### HTML Media type 

<div class="ednote">

Is this what we want to say?

</div>

The above Media types should be used with MathML fragments using XML syntax.
MathML using HTML syntax should use 

 * `text/html`
 
However unless specifically targetting HTML browsers, MathML fragments
should use XML syntax for maximum interoprability.

