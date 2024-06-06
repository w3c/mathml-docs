---
title: Open Concept List
---

<style>
p.langs {margin:1em; padding:1em;background-color: #EEE}
tr:target >td:first-child {border-left:solid thick black}
span.cb {margin-right: 2em; white-space:nowrap}
.markdown-body table tr.row0, .markdown-body table th.row0 {background-color:#F6F8FA}
.markdown-body table tr.row1 {background-color:#FEFFFE}
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


<details>
<summary>Available Template Languages</summary>
<p id="langchoice" class="langs">
<!-- Loop over languages in _data/languages.yml -->
{%- for language in site.data.languages -%}
{% assign lang = language.language-code %}
<span class="cb">
 <input
	onchange="updatelang(this)"
	type="checkbox"
	{% if lang == "en" or lang == "fr" %} checked {% endif %}
      id="cb-{{lang}}"
      name="language"
      value="{{lang}}" />
	  <label for="cb-{{lang}}">{{lang}}: {{language.label-regional}} 
            {%- if lang != "en" %} ({{language.label-english}}){% endif %}</label></span>
{% endfor %}
</p>
</details>


{%- for section in site.data.open.concepts -%}

### {{section.title}}

<table>
<thead>
<tr class="row0">
<th>Concept</th>
<th>Arity</th>
<th>Property</th>
<th>Condition</th>
{%- for language in site.data.languages -%}
<th class="{{language.language-code}}">Speech Template ({{language.language-code}})</th> 
{%- endfor -%}
<th>Comments</th>
<th>notation</th>
<th>Subject</th>
<th>Sources</th>
<th>Alias</th>
</tr>
</thead>
<tbody>
{%- for c in section.intents -%}
{%- assign clss = forloop.index| modulo:2 -%}
{%- if c.conditions %}
{%- for cond in c.conditions -%}
<tr {% if forloop.first %}id="{{c.concept}}{{c.arity}}{{c.property}}"{% endif %} class="row{{ clss }}">
{%- if forloop.first -%}<td rowspan="{{c.conditions.size}}"><a href="#{{c.concept}}{{c.arity}}{{c.property}}">{{c.concept}}</a></td>{%- endif -%}
{%- if forloop.first -%}<td rowspan="{{c.conditions.size}}">{{c.arity}}</td>{%- endif -%}
{%- if forloop.first -%}<td rowspan="{{c.conditions.size}}">{{c.property}}{%- if c.default -%}*{%- endif -%}</td>{%- endif -%}
<td>{{cond.condition}}</td>
{%- for language in site.data.languages -%}
<td class="{{language.language-code}}">
{%- if cond[language.language-code] -%}
{%- for l in cond[language.language-code] -%}
{{l}} {%- unless forloop.last -%}<br>{% endunless -%}
{% endfor %}
{%- else -%}
{%- for l in cond.en -%}
{{l}} ({{language.language-code}}){%- unless forloop.last -%}<br>{% endunless -%}
{% endfor %} 
{% endif %}
</td>
{%- endfor -%}
{%- if forloop.first-%}<td rowspan="{{c.conditions.size}}">{%- for com in c.comment -%}
{{com | markdownify | replace: "<p>", "<span>" | replace: "</p>", "</span>" }}
{%- unless forloop.last -%}<br>{% endunless -%}
{% endfor %}</td>{%- endif -%}
{%- if forloop.first-%}<td rowspan="{{c.conditions.size}}">{{c.area}}</td>{%-endif -%}
{%- if forloop.first-%}<td rowspan="{{c.conditions.size}}">{{c.notation}}</td>{%-endif -%}
{%- if forloop.first-%}<td rowspan="{{c.conditions.size}}">
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
</td>{%-endif -%}
{%- if forloop.first-%}<td rowspan="{{c.conditions.size}}"><td>{{c.alias}}</td>
</tr>
{%- endfor -%}
{%- else -%}
<tr id="{{c.concept}}{{c.arity}}{{c.property}}" class="row{{ clss }}">
<td><a href="#{{c.concept}}{{c.arity}}{{c.property}}">{{c.concept}}</a></td>
<td>{{c.arity}}</td>
<td>{{c.property}}{%- if c.default -%}*{%- endif -%}</td>
<td>{{c.condition}}</td>
{%- for language in site.data.languages -%}
<td class="{{language.language-code}}">
{%- if c[language.language-code] -%}
{%- for l in c[language.language-code] -%}
{{l}} {%- unless forloop.last -%}<br>{% endunless -%}
{% endfor %}
{%- else -%}
{%- for l in c.en -%}
{{l}} ({{language.language-code}}){%- unless forloop.last -%}<br>{% endunless -%}
{% endfor %} 
{% endif %}
</td>
{%- endfor -%}
<td>{%- for com in c.comment -%}
{{com | markdownify | replace: "<p>", "<span>" | replace: "</p>", "</span>" }}
{%- unless forloop.last -%}<br>{% endunless -%}
{% endfor %}</td>
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
{%- endif -%}
{%- endfor -%}
</tbody>
</table>
<hr>
{%- endfor -%}


----


<script>
var LangCss = document.getElementById('langcss');
var langcb=document.getElementById('langchoice').getElementsByTagName('input');
function updatelang (e) {
  LangCss.textContent='';
  for (var i=0, iLen=langcb.length; i<iLen; i++) {
    opt = langcb[i];
    if (!(opt.checked)) {
      LangCss.textContent= LangCss.textContent + "*." + opt.value + " {display:none}";
    }
  }
}
</script>
