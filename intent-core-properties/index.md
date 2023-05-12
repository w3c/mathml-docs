---
title: Core Intent Property List
---
<style>
p.langs {margin:1em; padding:1em;background-color: #EEE}
tr:target >td:first-child {border-left:solid thick black}
span.cb {margin-right: 2em; white-space:nowrap}
.markdown-body table tr.row0, .markdown-body table th.row0 {background-color:#F6F8FA}
.markdown-body table tr.row1 {background-color:#FEFFFE}
</style>

<style id="langcss">
{% for language in site.data.languages offset:1-%}
  {%- unless forloop.first %},{% endunless%} *.{{language.language-code}}
{%- endfor -%}
 {display:none}
</style>

# Core Intent Property List



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

{%- assign t = "" -%}
{%- for p in site.data.core-properties -%}
{% if t != p.type %}
{% unless t == "" %}
</dl>
{% endunless %}

{%- assign t = p.type -%}

<h2 id="{{t | capitalize}}">{{t | capitalize}}</h2>

<dl>

{% endif %}

<dt>{{p.property}}</dt>
{% if p.effect %}<dd>{{p.effect}}</dd>{% endif %}
{% for e in p.examples %}
<dd>
<code>{{e.intent}}</code>
{%- for language in site.data.languages -%}
{%- if e[language.language-code] -%}
<span class="{{language.language-code}}"><br>
<b>{{language.language-code}}:</b>
{% for sp in e[language.language-code] %}
{{sp}};
{% endfor %}
{% endif %}
{% endfor %}

</dd>

{% endfor %}

{% endfor %}




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

