## Notes on Parsing MathML


### XML and HTML Validity

XML validaors may use the supplied schema directly. HTML validators
require custom code but often (as is the case with the W3C validator)
they use an XML-based validation as some part of that process. So the
supplied schema may still apply even to HTML-syntax MathML.

#### ASCII Case Insensitivity

MathML Core follows most web plaform elements and allows ASCII case
insensitive matching for most attribute names and values. The MathML 4
schema (unlik the MathML 3 vrsion) does allow case insensive values in
most cases (so you can use `stretchy="TRUE"` or `mathvariant="Bold"`)
however it does not allow the attribute names to vary by case. That is
MathML Core allows `OnClick="somefunction()"` however the supplied
shema only allows lower case names, so `onclick="somefunction"`. If
using the HTML parser this is not an issue as all MathML element attribute
names  (exceprt `definitionURL` are normalised to lowercase, however if
using an XML parser, an attribute name such as `OnClick` will be
treated as invalid by a schema validator (but accepted by the MathML
Core implementation). A validation pipeline can either normalise the
attribue names to lowercase before validating, or if a particular
application wants to standardise on a specific style such as `onClick`
or `OnClick` it can use a modified version of the supplied schema that
accepts that form.

#### Extension attributes.

<div class="ednote">

We need to decide in the spec and in the schema whether to consider
`other` and namespaced attributes still valid in MathML4.

</div>

MathML 1 had a single valid but undefined attribute `other` that could
be used by an application to encode extra information.

MathML 2 introduced Namespaces and allowed any attribute from a
non-MathML namespace to be considered valid.

Namespaces are not supported in HTML, and MathML Core follows HTML in
allowing arbitrary attributes with name starting `data-` . None of the
schema languages used here can express this constraint. So one sample
extension attribute, `data-other` is declared in these schema. As with
case insensitivity, a validation pipeline may either remove any
`data-` attributes before validating, or may extend the schema
allowing as many specific `data-...` names as required by the application.


### Structure of the Relax NG schema.

Compared with the MathMl 3 schema, the schema has been restructured to
accomodate MathML Core, also th individual components have been
constructed to allow them to be separately used. So MathML documens
may be validated against any one of `mathml4-core`,
`mathml4-presentation`, `mathml4-strict-content`, `mathml4-content` or
`mathml4`.  

In almost all cases a document validating against
`mathml4-core` will also be valid for `mathml4-presentation` and
`mathml4` with the possible exception of the use of MathML in
`annotation-xml`. MathML Core and MathML Presentation Schema allow any
well formed XML in annotation-xml, but the full MathML schema (like
the schema supplied for MathML3)  allows arbitrary well formed XML
form _other_ namespaces but will validate  any MathML annotations.



### Other formats

<div class="ednote">

Generation of XSD and DTD currently broken, will need to fix up when
the Relax NG version is stable.

</div>

The Relax NG schema is written in the compact (rnc) format, the XML
syntax (rng) version is a completely equivalent expression of the same
schema.

The W3C XML Schema (xsd) version is mechanically constructed from the
Relax NG schema. Some of the constraints are simplified either due to
the reduced expressivity of XSD, or to simplify the translation.


The DTD version is also mechanically generated from the Relax NG, many
of he constraints need to b simplified for DTD. The resulting DTD is
post processed as for MathML3 DTD, to add some limied support for XML
Namespaces, and to include the HTML/MathML entity declarations,

