---
title: Open Intent Property List
---

<style>
p.langs {margin:1em; padding:1em;background-color: #EEE}
tr:target >td:first-child {border-left:solid thick black}
span.cb {margin-right: 2em; white-space:nowrap}
.markdown-body table tr.row0, .markdown-body table th.row0 {background-color:#F6F8FA}
.markdown-body table tr.row1 {background-color:#FEFFFE}
.markdown-body .highlight, figure.highlight {margin-left:0em; margin-bottom:0em}
div.ex {border: solid thin #CCD; margin-top: .5em;}

ul.toc p {margin-left:2em; margin-top:0em; margin-bottom:0em;}
</style>

<style id="langcss">
{% for language in site.data.languages offset:1-%}
  {%- unless forloop.first %},{% endunless%} *.{{language.language-code}}
{%- endfor -%}
 {display:none}
</style>

# Open Intent Property List

The data displayed below is derived from the YAML file
[open-properties.yml](https://github.com/w3c/mathml-docs/blob/main/_data/open-properties.yml)

## Contents

<ul class="toc">

{%- assign toct = "" -%}
{%- for tocp in site.data.open-properties -%}
{% if toct != tocp.type %}

{% unless toct == "" %}
</p>
</li>
{% endunless %}

{%- assign toct = tocp.type -%}

<li><b><a href="#{{toct | capitalize}}">{{toct | capitalize | replace: "-", " "}}</a></b>
<p>

{% endif %}

<a href="#prop-{{tocp.property}}">{{tocp.property}}</a>


{% endfor %}

</p>
</li>
</ul>

## Settings

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
	{% if lang == "en" %} checked {% endif %}
      id="cb-{{lang}}"
      name="language"
      value="{{lang}}" />
	  <label for="cb-{{lang}}">{{lang}}: {{language.label-regional}} 
            {%- if lang != "en" %} ({{language.label-english}}){% endif %}</label></span>
{% endfor %}
</p>
</details>

## Properties

{%- assign t = "" -%}
{%- for p in site.data.open-properties -%}
{% if t != p.type %}
{% unless t == "" %}
</dl>
{% endunless %}

{%- assign t = p.type -%}

<h3 id="{{t | capitalize}}">{{t | capitalize | replace: "-", " "}}</h3>

<dl>

{% endif %}

<dt id="prop-{{p.property}}">{{p.property}}</dt>
<dd>
{%- if p.effect -%}<div><i>Effect</i>: {{p.effect}}</div>{%- endif -%}
{%- if p.applicability %}<div><i>Applicability</i>: {{p.applicability}}</div>{%- endif -%}
{%- if p.intent -%}<div><i>Intent</i>: <code>{{p.intent}}</code></div>{%- endif -%}
{%- if p.comment -%}<div><i>Comment</i>: <i>{{p.comment | markdownify}}</i></div>{%- endif -%}
{%- for e in p.examples %}
<div class="ex">
{%- if e.intent -%}<div><code>{{e.intent}}</code></div>{%- endif -%}
{%if e.mathml %}
{% highlight xml %}
{{e.mathml }}
{% endhighlight %}
{% endif %}
{%- for language in site.data.languages -%}
{%- if e[language.language-code] %}
{%- for sp in e[language.language-code] %}
<div class="{{language.language-code}}">
<b>{{language.label-english}}:</b>
{{sp}}
</div>
{%- endfor -%}{% comment %} sp speech{% endcomment %}
{%- endif -%}
{% endfor %}{% comment %} language in languages{% endcomment %}


</div>
{% endfor %}{% comment %} e in examples{% endcomment %}
</dd>

{% endfor %}{% comment %} p in open.properties{% endcomment %}




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

