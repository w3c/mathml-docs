---
title: Core Concept List
---
<style>
p.langs {margin:1em; padding:1em;background-color: #EEE}
tr:target >td:first-child {border-left:solid thick black}
span.cb {margin-right: 2em; white-space:nowrap}
.markdown-body table tr.row0, .markdown-body table th.row0 {background-color:#F6F8FA}
.markdown-body table tr.row1 {background-color:#FEFFFE}
</style>

<style id="langcss">
{% for language in site.data.languages offset:2-%}
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


## Core List

----

## Core Concept Default Fixity propertites

The following concepts do not require special speech templates
but do have default fixity properties other than `function`.

<dl>

{%- for fix in site.data.core.defaultfixity -%}

<dt id="{{fix.fixity}}"><b>{{fix.fixity}}</b></dt>
<dd>
{%- for c in fix.concepts -%}
{{c}} {%- unless forloop.last -%}, {% endunless -%}
{%- endfor %}
</dd>
{% endfor %}
</dl>

----

## Core Concept Templates

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

{%- for section in site.data.core.concepts -%}

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

