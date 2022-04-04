## Notes on MathML and host systems


### Clipboard Examples


#### Example 1

An e-Learning application has a database of quiz questions, some of
which contain MathML.  The MathML comes from multiple sources, and the
e-Learning application merely passes the data on for display, but does
not have sophisticated MathML analysis capabilities.  Consequently,
the application is not aware whether a given MathML instance is pure
presentation or pure content markup, nor does it know whether the
instance is valid with respect to a particular version of the MathML
schema.  It therefore places the following data formats on the
clipboard:

```
 | Flavor Name  | Flavor Content                                              |
 | ___________  | _____________                                               |
 | MathML       | <math xmlns="http://www.w3.org/1998/Math/MathML">...</math> |
 | Unicode Text | <math xmlns="http://www.w3.org/1998/Math/MathML">...</math> |
```



#### Example 2

An equation editor on the Windows platform is able to generate pure
presentation markup, valid with respect to MathML 3.  Consequently, it
exports the following flavors:


```
 | Flavor Name         | Flavor Content                                              |
 | ___________         | ______________                                              |
 | MathML Presentation | <math xmlns="http://www.w3.org/1998/Math/MathML">...</math> |
 | Tiff                | (a rendering sample)                                        |
 | Unicode Text        | <math xmlns="http://www.w3.org/1998/Math/MathML">...</math> |
```

#### Example 3

A schema-based content management system on the Mac OS X platform
contains multiple MathML representations of a collection of
mathematical expressions, including mixed markup from authors, pure
content markup for interfacing to symbolic computation engines, and
pure presentation markup for print publication. Due to the system's
use of schemata, markup is stored with a namespace prefix.  The system
therefore can transfer the following data:

```
 | Flavor Name                 | Flavor Content                                                |
 | ___________                 | ______________                                                |
 |                             |                                                               |
 |                             |   <math                                                       |
 |                             |     xmlns="http://www.w3.org/1998/Math/MathML"                |
 | public.mathml.presentation  |     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"     |
 |                             |     xsi:schemaLocation=                                       |
 |                             |       "http://www.w3.org/Math/XMLSchema/mathml4/mathml4.xsd"> |
 |                             |     <mrow>                                                    |
 |                             |     ...                                                       |
 |                             |     </mrow>                                                   |
 |                             |   </math>                                                     |
 |                             |                                                               |
 |                             |  <math                                                        |
 |                             |    xmlns="http://www.w3.org/1998/Math/MathML"                 |
 | public.mathml.content       |    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"      |
 |                             |    xsi:schemaLocation=                                        |
 |                             |      "http://www.w3.org/Math/XMLSchema/mathml4/mathml4.xsd">  |
 |                             |    <apply>                                                    |
 |                             |      ...                                                      |
 |                             |    </apply>                                                   |
 |                             |  </math>                                                      |
 |                             |                                                               |
 |                             |  <math  |
 |                             |    xmlns="http://www.w3.org/1998/Math/MathML"                 |
 | public.mathml               |    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"      |
 |                             |    xsi:schemaLocation=                                        |
 |                             |      "http://www.w3.org/Math/XMLSchema/mathml4/mathml4.xsd">  |
 |                             |    <mrow>                                                     |
 |                             |      <apply>                                                  |
 |                             |        ... content markup within presentation markup ...      |
 |                             |      </apply>                                                 |
 |                             |      ...                                                      |
 |                             |    </mrow>                                                    |
 |                             |  </math>                                                      |
 |                             |                                                               |
 | public.plain-text.tex       | {x \over x-1}                                                 |
 |                             |                                                               |
 |                             | <math xmlns="http://www.w3.org/1998/Math/MathML"              |
 |                             |   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"       |
 | public.plain-text           |   xsi:schemaLocation=                                         |
 |                             |     "http://www.w3.org/Math/XMLSchema/mathml4/mathml4.xsd">   |
 |                             |   <mrow>                                                      |
 |                             |    ...                                                        |
 |                             |   </mrow>                                                     |
 |                             | </math>                                                       |
 |                             |                                                               |
```








#### Example 4

A similar content management system is web-based and delivers MathML
representations of mathematical expressions. The system is able to
produce MathML-Presentation, MathML-Content, TeX and pictures in TIFF
format.  In web-pages being browsed, it could produce a MathML
fragment such as the following:

```
<math xmlns="http://www.w3.org/1998/Math/MathML">
  <semantics>
    <mrow>...</mrow>
    <annotation-xml encoding="MathML-Content">...</annotation-xml>
    <annotation encoding="TeX">{1 \over x}</annotation>
    <annotation encoding="image/tiff" src="formula3848.tiff"/>
  </semantics>
</math>

```


A web-browser on the Windows platform that receives such a fragment
and tries to export it as part of a drag-and-drop action, can offer
the following flavors:


```
 | Flavor Name                 | Flavor Content                                                |
 | ___________                 | ______________                                                |
 |                             |                                                               |
 |                             | 
 | MathML Presentation         | <math xmlns="http://www.w3.org/1998/Math/MathML"
 |                             |   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 |                             |   xsi:schemaLocation=
 |                             |     "http://www.w3.org/Math/XMLSchema/mathml4/mathml4.xsd">
 |                             |   <mrow>
 |                             |     ...
 |                             |   </mrow>
 |                             | </math>
 |                             | 
 |                             | 
 | MathML Content              | <math
 |                             |   xmlns="http://www.w3.org/1998/Math/MathML"
 |                             |   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 |                             |   xsi:schemaLocation=
 |                             |     "http://www.w3.org/Math/XMLSchema/mathml4/mathml4.xsd">
 |                             |   <apply>
 |                             |     ...
 |                             |   </apply>
 |                             | </math>
 |                             | 
 |                             | 
 | MathML                      | <math
 |                             |   xmlns="http://www.w3.org/1998/Math/MathML"
 |                             |   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 |                             |   xsi:schemaLocation=
 |                             |     "http://www.w3.org/Math/XMLSchema/mathml4/mathml4.xsd">
 |                             |   <mrow>
 |                             |     <apply>
 |                             |       ... content markup within presentation markup ...
 |                             |     </apply>
 |                             |     ...
 |                             |   </mrow>
 |                             | </math>
 |                             | 
 | TeX                         | {x \over x-1}
 |                             | 
 | CF_TIFF                     | (the content of the picture file, requested from formula3848.tiff)
 |                             | 
 |                             | 
 | CF_UNICODETEXT              | <math
 |                             |   xmlns="http://www.w3.org/1998/Math/MathML"
 |                             |   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 |                             |   xsi:schemaLocation=
 |                             |     "http://www.w3.org/Math/XMLSchema/mathml4/mathml4.xsd">
 |                             |   <mrow>
 |                             |     ...
 |                             |   </mrow>
 |                             | </math>
 |                             | 
```
