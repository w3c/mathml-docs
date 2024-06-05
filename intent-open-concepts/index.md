---
title: Open Concept List
---

<style>
tr:target >td:first-child {border-left:solid thick black}
</style>

# Open Concept List
 
This open list sketch has been extracted from the google spreadsheet
and is not exactly in the format of the [core list](../core) but
hopefully close enough to be useful.

Entries in this list have no direct effect on the behavior of an
`intent` processor, however implementers are encouraged to record here
any concept names for which they implement custom rules. Names which
receive support in multiple implementations may be moved to the core
list.

The list may also be used as a reference for the intended meaning of intent
concept terms and so has many entries that do not require custom speech rules.

Unless otherwise noted below, the argument order of the concepts
follows the order used by the presentation MathML elements that are
typically used represent the concept. For linear notations such as
`plus`, this means the left-to-right order used in an mrow. For power,
it means the order used in msup (base, exponent). And for `root`, it
means the order used in mroot (radicand, index). Some concepts such as
`binomial-coefficient` have multiple notations. Where the
order might not be clear from the standard notation, the speech hint
or comments should make clear what is the intended order of arguments.


----

### Sources

Additional contributions are welcome:
[open.yml](https://github.com/w3c/mathml-docs/blob/main/_data/open.yml)

----


<table>
<thead>
<tr>
<th>Concept</th>
<th>Arity</th>
<th>Form/hint</th>
<th>Subject</th>
<th>Known notation</th>
<th>Sources</th>
<th>Alias</th>
</tr>
</thead>
<tbody>

{%- for c in site.data.open -%}

<tr id="{{c.concept}}{{c.arity}}{{c.form}}">
<td><a href="#{{c.concept}}{{c.arity}}{{c.form}}">{{c.concept}}</a></td>
<td>{{c.arity}}</td>
<td>{{c.form}}</td>
<td>{{c.area}}</td>
<td>{{c.notation}}</td>
<td>
{%- if c.urls -%}
{% for u in c.urls %}
<a href="{{u}}">
{%- if u contains "wikipedia" -%}
Wikipedia
{%- elsif u contains "dlmf" -%}
DLMF
{%- elsif u contains "ncatlab" -%}
nLab
{%- elsif u contains "encyclopediaofmath" -%}
Encyclopedia&#160;of&#160;Math
{%- elsif u contains "stackexchange" -%}
Stackexchange
{%- elsif u contains "mathworld.wolfram" -%}
MathWorld
{%- elsif u contains "arxiv" -%}
arXiv
{%- else -%}
{{ u | remove: "http://" | remove: "https://" | split: "/" | first }}
{%- endif -%}
</a><br/>
{% endfor %}
{%-endif -%}
</td>
<td>{{c.alias}}</td>
</tr>

{%- endfor -%}

</tbody>
</table>

