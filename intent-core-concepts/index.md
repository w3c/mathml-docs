---
title: Core Concept List
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

# Core Concept List


### Matching the List

1. A intent processor should match a system-specifed list of known concept names.
The list should include all the entries from the **core** list below.

2. Optionally intents may be defaulted based on the available content, so `<mo>=</mo>` may default to
`<mo intent="equals">=</mo>` or `<msup><mi>x</mi><mn>2</mn></msup>` may default to
`<msup intent="power($x,$n)"><mi arg="x">x</mi><mn arg="n">2</mn></msup>`
Defaulting rules and options to control them to be specifed elsewhere, and are likely to be system specific.

3. An intent term matches a row in the table if the concept name,
arity and property _all_ match.  Any intent literal that does not match is
not an error but is handled by the general rules for unknown concept
names (so treated as a literal). Note that unless the intent is
explicitly or implicitly (by expanding `$argref`) used as a function
head it will have arity 0.

4. The conditionals in the speech template should be constructed such that at least one row matches.
If more than one speech template matches a system specific choice should be taken.
The exact words in the speech templates are not normative so a system may have multiple possible wordings
controlled by the context, or by system option settings such as "Verbosity".

----


### Sources

Additional language contributions are welcome.

Languages can be listed by extending the YAML file:
[languages.yml](https://github.com/w3c/mathml-docs/blob/main/_data/languages.yml)

Any concept that does not have a speech template in the specifed language will show the English text.

Localised texts can be added to the YAML file:
[core.yml](https://github.com/w3c/mathml-docs/blob/main/_data/core.yml)

----

<p>
<button id="b1" type="button" onclick="showmathml()">Show MathML Source</button>
<button id="b2" type="button" onclick="displaymath()">Display typeset math</button>
</p>


----


## Core List

----

## Core Concept Default Fixity properties

The following concepts do not require special speech templates
but do have default fixity properties other than `function`.

<dl>

{%- for fix in site.data.core.defaultfixity -%}

<dt id="{{fix.fixity}}"><b>{{fix.fixity}}</b>
{%- for c in fix.concepts -%}
<span id="{{c.concept}}"></span> 
{%- endfor %}
</dt>
<dd>
{%- for c in fix.concepts -%}
<a
{%
if c.link
-%}
 href="#{{c.link}}" class="link"
{%- else -%}
 href="#{{c.concept}}" class="self"
{%- endif -%}
>{{c.concept}}</a> 
(
{%- for ch in c.characters -%}
{{ch}}
{%- unless forloop.last -%}, {% endunless -%}
{%- endfor -%}

)
{% unless forloop.last -%}, {% endunless -%}
{%- endfor %}
</dd>
{% endfor %}
</dl>

----

## Default Large Operator Concepts

Speech templates for "large" operators follow a similar pattern
and are often strongly associated with particular characters.
They are collected here to give a more convenient and compact
presentation.

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
</tr>
</thead>
<tbody>
{%- for c in site.data.core.concepts[3].intents -%}
{%- if c.concept == "sum" -%}
{%- assign arityr = c.arity | replace: ">=", "⩾" -%}
{%- assign arityu = c.arity | replace: ">=", "GEQ" -%}
{%- assign propertyu = c.property | replace: "?", "Q" -%}
<tr>
<td>{{c.concept}}</td>
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
</td>
</tr>
{%- endif -%}
{%- endfor -%}
</tbody>
</table>




<dl>
<dt id="largeoplist"><b>Operators</b></dt>
<dd>
{%- for c in site.data.core.largeop -%}
<a
{%
if c.link
-%}
 href="#{{c.link}}" class="link"
{%- else -%}
 href="#{{c.concept}}" class="self"
{%- endif -%}
>{{c.concept}}</a> 
(
{%- for ch in c.characters -%}
{{ch}}
{%- unless forloop.last -%}, {% endunless -%}
{%- endfor -%}
)
{% unless forloop.last -%}, {% endunless -%}
{%- endfor %}
</dd>
</dl>



----

## Core Concept Templates



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

{%- for section in site.data.core.concepts -%}

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

