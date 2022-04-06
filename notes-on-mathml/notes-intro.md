## Introduction

### Mathematics and its Notation

A distinguishing feature of mathematics is the use of a complex and
highly evolved system of two-dimensional symbolic notation. As
J. R. Pierce writes in his book on communication theory, mathematics
and its notation should not be viewed as one and the same thing
[[Pierce1961]]. Mathematical ideas can exist independently of the
notation that represents them. However, the relation between meaning
and notation is subtle, and part of the power of mathematics to
describe and analyze derives from its ability to represent and
manipulate ideas in symbolic form. The challenge before a Mathematical
Markup Language (MathML) in enabling mathematics on the World Wide Web
is to capture both notation and content (that is, its meaning) in such
a way that documents can utilize the highly evolved notation of
written and printed mathematics as well as the new potential for
interconnectivity in electronic media.

Mathematical notation evolves constantly as people continue to
innovate in ways of approaching and expressing ideas. Even the common
notation of arithmetic has gone through an amazing variety of styles,
including many defunct ones advocated by leading mathematical figures
of their day [[Cajori1928]]. Modern mathematical notation is the product
of centuries of refinement, and the notational conventions for
high-quality typesetting are quite complicated and subtle. For
example, variables and letters which stand for numbers are usually
typeset today in a special mathematical italic font subtly distinct
from the usual text italic; this seems to have been introduced in
Europe in the late sixteenth century. Spacing around symbols for
operations such as +, -, × and / is slightly different from that of
text, to reflect conventions about operator precedence that have
evolved over centuries. Entire books have been devoted to the
conventions of mathematical typesetting, from the alignment of
superscripts and subscripts, to rules for choosing parenthesis sizes,
and on to specialized notational practices for subfields of
mathematics. The manuals describing the nuances of present-day
computer typesetting and composition systems can run to hundreds of
pages.

Notational conventions in mathematics, and in printed text in general,
guide the eye and make printed expressions much easier to read and
understand. Though we usually take them for granted, we, as modern
readers, rely on numerous conventions such as paragraphs, capital
letters, font families and cases, and even the device of decimal-like
numbering of sections such as is used in this document. Such
notational conventions are perhaps even more important for electronic
media, where one must contend with the difficulties of on-screen
reading. Appropriate standards coupled with computers enable a
broadening of access to mathematics beyond the world of print. The
markup methods for mathematics in use just before the Web rose to
prominence importantly included TeX [[Knuth1986]] and approaches based
on SGML ([[AAP-math]], [[Poppelier1992]] and [[ISO-12083]]).

It is remarkable how widespread the current conventions of
mathematical notation have become. The general two-dimensional layout,
and most of the same symbols, are used in all modern mathematical
communications, whether the participants are, say, European, writing
left-to-right, or Middle-Eastern, writing right-to-left. Of course,
conventions for the symbols used, particularly those naming functions
and variables, may tend to favor a local language and script. The
largest variation from the most common is a form used in some
Arabic-speaking communities which lays out the entire mathematical
notation from right-to-left, roughly in mirror image of the European
tradition.

However, there is more to putting mathematics on the Web than merely
finding ways of displaying traditional mathematical notation in a Web
browser. The Web represents a fundamental change in the underlying
metaphor for knowledge storage, a change in which interconnection
plays a central role. It has become important to find ways of
communicating mathematics which facilitate automatic processing,
searching and indexing, and reuse in other mathematical applications
and contexts. With this advance in communication technology, there is
an opportunity to expand our ability to represent, encode, and
ultimately to communicate our mathematical insights and understanding
with each other. We believe that MathML as specified below is an
important step in developing mathematics on the Web.

### Origins and Goals

#### Design Goals of MathML

MathML has been designed from the beginning with the following ultimate goals in mind.

MathML should ideally:

 * Encode mathematical material suitable for all educational and scientific communication.

 * Encode both mathematical notation and mathematical meaning.

 * Facilitate conversion to and from other mathematical formats, both presentational and semantic. Output formats should include:

    *    graphical displays

    *    speech synthesizers

    *    input for computer algebra systems

    *    other mathematics typesetting languages, such as TeX

    *    plain text displays, e.g. VT100 emulators

    *    international print media, including braille

    It is recognized that conversion to and from other notational systems or media may entail loss of information in the process.

 * Allow the passing of information intended for specific renderers and applications.

 * Support efficient browsing of lengthy expressions.

 * Provide for extensibility.

 * Be well suited to templates and other common techniques for editing formulas.

 * Be legible to humans, and simple for software to generate and process.

No matter how successfully MathML achieves its goals as a markup language, it is clear that MathML is useful only if it is implemented well. The W3C Math Working Group has identified a short list of additional implementation goals. These goals attempt to describe concisely the minimal functionality MathML rendering and processing software should try to provide.

 * MathML expressions in HTML (and XHTML) pages should render properly in popular Web browsers, in accordance with reader and author viewing preferences, and at the highest quality possible given the capabilities of the platform.

 * HTML (and XHTML) documents containing MathML expressions should print properly and at high-quality printer resolutions.

 * MathML expressions in Web pages should be able to react to user gestures, such those as with a mouse, and to coordinate communication with other applications through the browser.

 * Mathematical expression editors and converters should be developed to facilitate the creation of Web pages containing MathML expressions.



### Overview

MathML is a markup language for describing mathematics. It is usually expressed in XML or HTML syntax. A special aspect of MathML is that there are two main strains of markup: Presentation markup, discussed in 3. Presentation Markup, is used to display mathematical expressions; and Content markup, discussed in 4. Content Markup, is used to convey mathematical meaning. Content markup is specified in particular detail.

Fundamentals common to both strains of markup are covered in [[MathML4]] Chapter 2, MathML Fundamentals, while the means for combining these strains, as well as external markup, into single MathML objects are discussed Chapter 5. 

### A First Example

The quadratic formula provides a simple but instructive illustration of MathML markup.



<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='176.312704pt' height='44.548603pt' viewBox='-72.000004 -71.601531 88.156352 22.274301'>
<defs>
<path id='g2-50' d='M3.521793-1.26924H3.284682C3.263761-1.115816 3.194022-.704359 3.103362-.63462C3.047572-.592777 2.510585-.592777 2.412951-.592777H1.129763C1.862017-1.241345 2.106102-1.436613 2.524533-1.764384C3.040598-2.175841 3.521793-2.608219 3.521793-3.270735C3.521793-4.11457 2.782565-4.630635 1.889913-4.630635C1.025156-4.630635 .439352-4.02391 .439352-3.382316C.439352-3.02665 .739228-2.991781 .808966-2.991781C.976339-2.991781 1.17858-3.110336 1.17858-3.361395C1.17858-3.486924 1.129763-3.731009 .767123-3.731009C.983313-4.226152 1.457534-4.379577 1.785305-4.379577C2.48269-4.379577 2.84533-3.835616 2.84533-3.270735C2.84533-2.66401 2.412951-2.182814 2.189788-1.931756L.509091-.27198C.439352-.209215 .439352-.195268 .439352 0H3.312578L3.521793-1.26924Z'/>
<path id='g0-0' d='M6.914072-2.49066C6.914072-2.689913 6.724782-2.689913 6.585305-2.689913H1.155666C1.016189-2.689913 .826899-2.689913 .826899-2.49066S1.016189-2.291407 1.155666-2.291407H6.585305C6.724782-2.291407 6.914072-2.291407 6.914072-2.49066Z'/>
<path id='g0-6' d='M7.183064-.199253C7.183064-.398506 6.993773-.398506 6.854296-.398506H4.07472V-3.118306H6.854296C6.993773-3.118306 7.183064-3.118306 7.183064-3.317559S6.993773-3.516812 6.854296-3.516812H4.07472V-6.276463C4.07472-6.425903 4.07472-6.635118 3.875467-6.635118S3.676214-6.455791 3.676214-6.316314V-3.516812H.886675C.747198-3.516812 .557908-3.516812 .557908-3.317559S.747198-3.118306 .886675-3.118306H3.676214V-.398506H.886675C.747198-.398506 .557908-.398506 .557908-.199253S.747198 0 .886675 0H6.854296C6.993773 0 7.183064 0 7.183064-.199253Z'/>
<path id='g0-112' d='M8.498132-.199253C8.498132-.308842 8.418431-.398506 8.298879-.398506S8.14944-.328767 8.089664-.209215L3.875467 8.518057L2.102117 4.612702C2.062267 4.533001 2.042341 4.473225 1.972603 4.473225C1.942715 4.473225 1.92279 4.473225 1.833126 4.552927L.846824 5.300125C.737235 5.389788 .727273 5.399751 .727273 5.439601C.727273 5.50934 .767123 5.549191 .826899 5.549191C.856787 5.549191 .876712 5.549191 .966376 5.469489L1.484433 5.080946L3.457036 9.414695C3.516812 9.554172 3.536737 9.564134 3.646326 9.564134C3.805729 9.564134 3.825654 9.524284 3.895392 9.374844L8.438356-.029888C8.488169-.139477 8.498132-.14944 8.498132-.199253Z'/>
<path id='g3-50' d='M4.473225-1.733499H4.224159C4.174346-1.43462 4.104608-.996264 4.004981-.846824C3.935243-.767123 3.277709-.767123 3.058531-.767123H1.265255L2.321295-1.793275C3.875467-3.16812 4.473225-3.706102 4.473225-4.702366C4.473225-5.838107 3.576588-6.635118 2.361146-6.635118C1.235367-6.635118 .498132-5.718555 .498132-4.83188C.498132-4.273973 .996264-4.273973 1.026152-4.273973C1.195517-4.273973 1.544209-4.393524 1.544209-4.801993C1.544209-5.061021 1.364882-5.32005 1.016189-5.32005C.936488-5.32005 .916563-5.32005 .886675-5.310087C1.115816-5.957659 1.653798-6.326276 2.231631-6.326276C3.138232-6.326276 3.566625-5.519303 3.566625-4.702366C3.566625-3.905355 3.068493-3.118306 2.520548-2.500623L.607721-.368618C.498132-.259029 .498132-.239103 .498132 0H4.194271L4.473225-1.733499Z'/>
<path id='g3-52' d='M4.692403-1.643836V-1.952677H3.696139V-6.485679C3.696139-6.684932 3.696139-6.744707 3.536737-6.744707C3.447073-6.744707 3.417186-6.744707 3.337484-6.625156L.278954-1.952677V-1.643836H2.929016V-.777086C2.929016-.418431 2.909091-.308842 2.171856-.308842H1.96264V0C2.371108-.029888 2.889166-.029888 3.307597-.029888S4.254047-.029888 4.662516 0V-.308842H4.4533C3.716065-.308842 3.696139-.418431 3.696139-.777086V-1.643836H4.692403ZM2.988792-1.952677H.557908L2.988792-5.668742V-1.952677Z'/>
<path id='g3-61' d='M7.183064-3.457036C7.183064-3.656289 6.993773-3.656289 6.854296-3.656289H.886675C.747198-3.656289 .557908-3.656289 .557908-3.457036S.747198-3.257783 .896638-3.257783H6.844334C6.993773-3.257783 7.183064-3.257783 7.183064-3.457036ZM7.183064-1.524284C7.183064-1.723537 6.993773-1.723537 6.844334-1.723537H.896638C.747198-1.723537 .557908-1.723537 .557908-1.524284S.747198-1.325031 .886675-1.325031H6.854296C6.993773-1.325031 7.183064-1.325031 7.183064-1.524284Z'/>
<path id='g1-97' d='M4.961395-1.424658C4.961395-1.524284 4.871731-1.524284 4.841843-1.524284C4.742217-1.524284 4.732254-1.484433 4.702366-1.344956C4.533001-.697385 4.353674-.109589 3.945205-.109589C3.676214-.109589 3.646326-.368618 3.646326-.56787C3.646326-.787049 3.666252-.86675 3.775841-1.305106L3.995019-2.201743L4.353674-3.596513C4.423412-3.875467 4.423412-3.895392 4.423412-3.935243C4.423412-4.104608 4.303861-4.204234 4.134496-4.204234C3.895392-4.204234 3.745953-3.985056 3.716065-3.765878C3.536737-4.134496 3.247821-4.403487 2.799502-4.403487C1.633873-4.403487 .398506-2.938979 .398506-1.484433C.398506-.547945 .946451 .109589 1.723537 .109589C1.92279 .109589 2.420922 .069738 3.01868-.637609C3.098381-.219178 3.447073 .109589 3.92528 .109589C4.273973 .109589 4.503113-.119552 4.662516-.438356C4.83188-.797011 4.961395-1.424658 4.961395-1.424658ZM3.566625-3.138232L3.068493-1.185554C3.01868-1.006227 3.01868-.986301 2.86924-.816936C2.430884-.268991 2.022416-.109589 1.743462-.109589C1.24533-.109589 1.105853-.657534 1.105853-1.046077C1.105853-1.544209 1.424658-2.769614 1.653798-3.227895C1.96264-3.815691 2.410959-4.184309 2.809465-4.184309C3.457036-4.184309 3.596513-3.367372 3.596513-3.307597S3.576588-3.188045 3.566625-3.138232Z'/>
<path id='g1-98' d='M4.134496-2.809465C4.134496-3.716065 3.606476-4.403487 2.809465-4.403487C2.351183-4.403487 1.942715-4.11457 1.643836-3.805729L2.381071-6.804483C2.381071-6.804483 2.381071-6.914072 2.251557-6.914072C2.022416-6.914072 1.295143-6.834371 1.036115-6.814446C.956413-6.804483 .846824-6.794521 .846824-6.615193C.846824-6.495641 .936488-6.495641 1.085928-6.495641C1.564134-6.495641 1.58406-6.425903 1.58406-6.326276C1.58406-6.256538 1.494396-5.917808 1.444583-5.708593L.627646-2.460772C.508095-1.96264 .468244-1.803238 .468244-1.454545C.468244-.508095 .996264 .109589 1.733499 .109589C2.909091 .109589 4.134496-1.374844 4.134496-2.809465ZM2.909091-1.135741C2.580324-.468244 2.122042-.109589 1.733499-.109589C1.39477-.109589 1.066002-.37858 1.066002-1.115816C1.066002-1.305106 1.066002-1.494396 1.225405-2.122042L1.444583-3.038605C1.504359-3.257783 1.504359-3.277709 1.594022-3.387298C2.082192-4.034869 2.530511-4.184309 2.789539-4.184309C3.148194-4.184309 3.417186-3.88543 3.417186-3.247821C3.417186-2.660025 3.088418-1.514321 2.909091-1.135741Z'/>
<path id='g1-99' d='M4.283935-1.066002C4.283935-1.125778 4.224159-1.195517 4.164384-1.195517C4.11457-1.195517 4.094645-1.175592 4.034869-1.09589C3.247821-.109589 2.161893-.109589 2.042341-.109589C1.414695-.109589 1.145704-.597758 1.145704-1.195517C1.145704-1.603985 1.344956-2.570361 1.683686-3.188045C1.992528-3.755915 2.540473-4.184309 3.088418-4.184309C3.427148-4.184309 3.805729-4.054795 3.945205-3.785803C3.785803-3.785803 3.646326-3.785803 3.506849-3.646326C3.347447-3.496887 3.327522-3.327522 3.327522-3.257783C3.327522-3.01868 3.506849-2.909091 3.696139-2.909091C3.985056-2.909091 4.254047-3.148194 4.254047-3.5467C4.254047-4.034869 3.785803-4.403487 3.078456-4.403487C1.733499-4.403487 .408468-2.978829 .408468-1.574097C.408468-.67746 .986301 .109589 2.022416 .109589C3.447073 .109589 4.283935-.946451 4.283935-1.066002Z'/>
<path id='g1-120' d='M4.941469-1.424658C4.941469-1.524284 4.851806-1.524284 4.821918-1.524284C4.732254-1.524284 4.712329-1.484433 4.692403-1.414695C4.363636-.348692 3.686177-.109589 3.367372-.109589C2.978829-.109589 2.819427-.428394 2.819427-.767123C2.819427-.986301 2.879203-1.205479 2.988792-1.643836L3.327522-3.008717C3.387298-3.267746 3.616438-4.184309 4.313823-4.184309C4.363636-4.184309 4.60274-4.184309 4.811955-4.054795C4.533001-4.004981 4.333748-3.755915 4.333748-3.516812C4.333748-3.35741 4.443337-3.16812 4.712329-3.16812C4.931507-3.16812 5.250311-3.347447 5.250311-3.745953C5.250311-4.26401 4.662516-4.403487 4.323786-4.403487C3.745953-4.403487 3.39726-3.875467 3.277709-3.646326C3.028643-4.303861 2.49066-4.403487 2.201743-4.403487C1.165629-4.403487 .597758-3.118306 .597758-2.86924C.597758-2.769614 .71731-2.769614 .71731-2.769614C.797011-2.769614 .826899-2.789539 .846824-2.879203C1.185554-3.935243 1.843088-4.184309 2.181818-4.184309C2.371108-4.184309 2.719801-4.094645 2.719801-3.516812C2.719801-3.20797 2.550436-2.540473 2.181818-1.145704C2.022416-.52802 1.673724-.109589 1.235367-.109589C1.175592-.109589 .946451-.109589 .737235-.239103C.986301-.288917 1.205479-.498132 1.205479-.777086C1.205479-1.046077 .986301-1.125778 .836862-1.125778C.537983-1.125778 .288917-.86675 .288917-.547945C.288917-.089664 .787049 .109589 1.225405 .109589C1.882939 .109589 2.241594-.587796 2.271482-.647572C2.391034-.278954 2.749689 .109589 3.347447 .109589C4.373599 .109589 4.941469-1.175592 4.941469-1.424658Z'/>
</defs>
<g id='page1'>
<use x='-72.000004' y='-56.1611' xlink:href='#g1-120'/>
<use x='-63.53874' y='-56.1611' xlink:href='#g3-61'/>
<use x='-51.826956' y='-62.900901' xlink:href='#g0-0'/>
<use x='-44.078208' y='-62.900901' xlink:href='#g1-98'/>
<use x='-37.588708' y='-62.900901' xlink:href='#g0-6'/>
<use x='-27.626095' y='-71.203036' xlink:href='#g0-112'/>
<rect x='-19.323869' y='-71.60152' height='.398484' width='35.480185'/>
<use x='-19.323869' y='-62.900901' xlink:href='#g1-98'/>
<use x='-15.048235' y='-65.778994' xlink:href='#g2-50'/>
<use x='-8.365136' y='-62.900901' xlink:href='#g0-0'/>
<use x='1.597477' y='-62.900901' xlink:href='#g3-52'/>
<use x='6.578797' y='-62.900901' xlink:href='#g1-97'/>
<use x='11.844951' y='-62.900901' xlink:href='#g1-99'/>
<rect x='-51.826956' y='-58.85101' height='.398484' width='67.983253'/>
<use x='-22.95906' y='-49.32723' xlink:href='#g3-50'/>
<use x='-17.97774' y='-49.32723' xlink:href='#g1-97'/>
</g>
</svg>

MathML offers two flavors of markup of this formula. The first is the style which emphasizes the actual presentation of a formula, the two-dimensional layout in which the symbols are arranged. An example of this type is given just below. The second flavor emphasizes the mathematical content and an example of it follows the first one.

```
<mrow>
 <mi>x</mi>
 <mo>=</mo>
 <mfrac>
  <mrow>
   <mrow><mo>-</mo><mi>b</mi></mrow>
   <mo>&amp;amp;PlusMinus;</mo>
   <msqrt>
    <msup><mi>b</mi><mn>2</mn></msup>
    <mo>-</mo>
    <mrow>
     <mn>4</mn><mo>&amp;amp;InvisibleTimes;</mo><mi>a</mi><mo>&amp;amp;InvisibleTimes;</mo><mi>c</mi>
    </mrow>
   </msqrt>
  </mrow>
  <mrow><mn>2</mn><mo>&amp;amp;InvisibleTimes;</mo><mi>a</mi></mrow>
 </mfrac>
</mrow>
```

Consider the superscript 2 in this formula. It represents the squaring
operation here, but the meaning of a superscript in other situations
depends on the context. A letter with a superscript can be used to
signify a particular component of a vector, or maybe the superscript
just labels a different type of some structure. Similarly two letters
written one just after the other could signify two variables
multiplied together, as they do in the quadratic formula, or they
could be two letters making up the name of a single variable. What is
called Content Markup in MathML allows closer specification of the
mathematical meaning of many common formulas. The quadratic formula
given in this style of markup is as follows.



```
<apply><eq/>
 <ci>x</ci>
 <apply><divide/>
  <apply><plus/>
   <apply><minus/><ci>b</ci></apply>
   <apply><root/>
    <apply><minus/>
     <apply><power/><ci>b</ci><cn>2</cn></apply>
     <apply><times/><cn>4</cn><ci>a</ci><ci>c</ci></apply>
    </apply>
   </apply>
  </apply>
  <apply><times/><cn>2</cn><ci>a</ci></apply>
 </apply>
</apply>
```
