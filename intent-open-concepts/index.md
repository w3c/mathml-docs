---
title: Open Concept List
---
<script>
  function showmathml (){
      const ml =document.querySelectorAll("math");
      const b1 = document.getElementById('b1');
      const b2 = document.getElementById('b2');
      b1.style.display="none";
      b2.style.display="inline-block";
      for(const m of ml) {
	  const md =  document.createElement("div");
	  md.className="mmlshow";
	  md.textContent=m.outerHTML.replace(/(<[^<>/]+)><\/[a-z]+>/g,"$1/>").replaceAll("><",">\n<");
	  m.parentNode.replaceChild(md, m);
      }
  }
  function displaymath (){
      const ml =document.querySelectorAll("div.mmlshow");
      b1.style.display="inline-block";
      b2.style.display="none";
      for(const m of ml) {
	  const md = document.createElementNS("http://www.w3.org/1998/Math/MathML","math");
	  md.innerHTML=m.textContent.replace(/<[/]?math>/,"");
	  m.parentNode.replaceChild(md, m);
      }
  }
</script>
<style>
#b2 {display: none}

p.langs {margin:1em; padding:1em;background-color: #EEE}
tr:target >td:first-child {border-left:solid thick black}
span.cb {margin-right: 2em; white-space:nowrap}
.markdown-body table {font-size:85%}
.markdown-body table tr.row0, .markdown-body table th.row0 {background-color:#F6F8FA}
.markdown-body table tr.row1 {background-color:#FEFFFE}
a.link {font-weight:500}
a.self {color: black; font-weight:500}
     [arg] { background-color: #ddfafa;}
     [arg]:hover {display:inline;background-color: #add8e6;}
     [arg]:hover::after {display:inline;vertical-align: sub; font-size: 0.7em; }
     [arg="a1"]:hover::after { content: " $1" ; }
     [arg="a2"]:hover::after { content: " $2" ; }
     [arg="a3"]:hover::after { content: " $3" ; }
     [arg="a4"]:hover::after { content: " $4" ; }
     [arg="a5"]:hover::after { content: " $5" ; }
     [arg="a6"]:hover::after { content: " $6" ; }
     [arg="a7"]:hover::after { content: " $7" ; }
     [arg="a8"]:hover::after { content: " $8" ; }
     [arg="a9"]:hover::after { content: " $9" ; }
math:not(:has(*[intent])) {
    color: red;
    }
div.mmlshow {display:inline-block;padding:1em;margin:.5em;border-radius:1em;font-family:monospace;background-color:#EEE;white-space:pre;}
</style>

<style id="langcss">
{% for language in site.data.languages offset:1-%}
  {%- unless forloop.first %},{% endunless%} *.{{language.language-code}}
{%- endfor -%}
 {display:none}
</style>

# Open Concept List
 

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

<p>
<button id="b1" type="button" onclick="showmathml()">Show MathML Source</button>
<button id="b2" type="button" onclick="displaymath()">Display typeset math</button>
</p>


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
	{% if lang == "en" or lang == "Xfr" %} checked {% endif %}
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

<table style="width:100%">
<thead>
<tr class="row0">
<th>Concept</th>
<th>Arity</th>
<th>Property</th>
{%- for language in site.data.languages -%}
<th class="{{language.language-code}}">Speech Template ({{language.language-code}})</th> 
{%- endfor -%}
<th style="width:auto">Comments</th>
<th>Subject</th>
<th>Sources</th>
</tr>
</thead>
<tbody>
{%- for c in section.intents -%}
{%- assign clss = forloop.index| modulo:2 -%}
{%- assign arityr = c.arity | replace: ">=", "⩾" -%}
{%- assign arityu = c.arity | replace: ">=", "GEQ" -%}
{%- assign propertyu = c.property | replace: "?", "Q" -%}
{%- if c.conditions %}
{%- for cond in c.conditions -%}
<tr {% if forloop.first %}id="{{c.concept}}{{arityu}}{{propertyu}}"{% endif %} class="row{{ clss }}">
{%- if forloop.first -%}<td rowspan="{{c.conditions.size}}"><a class="self" href="#{{c.concept}}{{arityu}}{{propertyu}}">{{c.concept}}</a></td>{%- endif -%}
{%- if forloop.first -%}<td rowspan="{{c.conditions.size}}">{{arityr}}</td>{%- endif -%}
{%- if forloop.first -%}<td rowspan="{{c.conditions.size}}">{{c.property}}{%- unless c.default == false or c.arity == 0 -%}*{%- endunless -%}</td>{%- endif -%}
{%- for language in site.data.languages -%}
<td class="{{language.language-code}}">
[{{cond.condition}}]:
{% if cond[language.language-code] -%}
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
{%- if forloop.first-%}
<td style="width:auto" rowspan="{{c.conditions.size}}">
{%- for com in c.comments -%}
{{com | markdownify | replace: "<p>", "<span>" | replace: "</p>", "</span>" }}
{%- unless forloop.last -%}<br>{% endunless -%}
{% endfor %}
{%- if c.comments and c.mathml -%}<br>{%- endif -%}
{%- for mml in c.mathml -%}
{{mml}}
{%- unless forloop.last -%}<br>{% endunless -%}
{% endfor %}
{%- if c.alias -%}
{%- if c.comments or c.mathml -%}<br>{%- endif -%}
Aliases: {% for al in c.alias -%}{{al}}{%- unless forloop.last -%}<br>{% endunless -%}{%- endfor -%}
{%-endif -%}
</td>{%- endif -%}
{%- if forloop.first-%}<td rowspan="{{c.conditions.size}}">{{c.area}}</td>{%-endif -%}
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
</td>{%- endif -%}
</tr>
{%- endfor -%}
{%- else -%}
<tr id="{{c.concept}}{{arityu}}{{propertyu}}" class="row{{ clss }}">
<td><a class="self" href="#{{c.concept}}{{arityu}}{{propertyu}}">{{c.concept}}</a></td>
<td>{{arityr}}</td>
<td>{{c.property}}{%- unless c.default == false or c.arity == 0-%}*{%- endunless -%}</td>
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
<td style="width:auto">
{%- for com in c.comments -%}
{{com | markdownify | replace: "<p>", "<span>" | replace: "</p>", "</span>" }}
{%- unless forloop.last -%}<br>{% endunless -%}
{% endfor %}
{%- if c.comments and c.mathml -%}<br>{%- endif -%}
{%- for mml in c.mathml -%}
{{mml}}
{%- unless forloop.last -%}<br>{% endunless -%}
{% endfor %}
{%- if c.alias -%}
{%- if c.comments or c.mathml -%}<br>{%- endif -%}
Aliases: {% for al in c.alias -%}{{al}}{%- unless forloop.last -%}, {% endunless -%}{%- endfor -%}
{%-endif -%}
</td>
<td>{{c.area}}</td>
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
</tr>
{%- endif -%}
{%- endfor -%}
</tbody>
</table>
<hr>
{%- endfor -%}

### Key

| Entry | Meaning |
| ---- | ---- |
| `*` | property default if no  fixity`:` property given |
| _th_  | suitable ordinal indicator, so `st`  `nd` `rd` or `th` in English. |
|  ⩾ _n_ | Arity of at least _n_ |

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
