---
title: Speech templates for Unicode Characters
---
<style>
/* https://github.com/stipub/stixfonts */
@font-face {
    font-family: STIX Two Math;
    src: local('STIX Two Math'),
	 local('STIXTwoMath-Regular'),
         url('https://texlive.net/fonts/stix/STIXTwoMath-Regular.woff2');
	 }
@font-feature-values STIX Two Math { @styleset { roundhand: 1; } }
tr:target >td:first-child {border-left:solid thick black}
span.cb {margin-right: 2em; white-space:nowrap}
.markdown-body table {font-family: "STIX Two Math", "Noto Sans";}
.markdown-body table tr.row0, .markdown-body table th.row0 {background-color:#F6F8FA}
.markdown-body table tr.row1 {background-color:#FEFFFE}
.markdown-body thead tr {font-weight: bold; background-color:#F0F0F5}
.markdown-body thead th {padding-top: 1em;}
a.link {font-weight:500}
a.self {color: black; font-weight:500}
hr.sp {height:.1em;max-width:6em;padding:0;margin:0}
span.n {font-size:80%;font-style: monospace}
</style>

<style id="langcss">
{% for language in site.data.languages offset:1-%}
  {%- unless forloop.first %},{% endunless%} *.{{language.language-code}}
{%- endfor -%}
 {display:none}
</style>




## Speech Templates for Unicode Characters

----

The table of Speech-Templates for Unicode Characters below is a non-normative collection of
the suggested pronunciation for each Unicode character deemed relevant in mathematics.
A default suggestion is provided. Alternative suggestions are formulated naming the
_form_ or _context_ of use.


One particular context of use is the _terse_, or _not-terse_ (understood to be more verbose).
This is expected to correspond to a verbosity setting in the accessibility tool, which can be adjusted to
produce more or less long speech depending on the background of the user.

This table is indicative and may benefit from the contribution of multiple parties.
See [w3.org/Math](https://w3.org/Math) to see how to contribute.

Localised texts can be added to the YAML file:
[unicode-speech.yml](https://github.com/w3c/mathml-docs/blob/main/_data/unicode-speech.yml)

------

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

-------

<table style="width:100%;overflow:visible;">
<thead>
<tr>
<th>Unicode</th><th>Character</th>
{%- for language in site.data.languages -%}
<th class="{{language.language-code}}">Speech Template {{language.label-regional}}</th>
{%- endfor -%}
</tr>
</thead>
<tbody>
{%- assign eobj = '"}' -%}
{%- assign bobj = '{"' -%}
{%- for u in site.data.unicode-speech -%}
<tr id="U{{u.u | replace: " ", "_"}}">
<td><a class="self" href="#U{{u.u | replace: " ", "_"}}">{{u.u}}</a></td>
<td>{{u.char}}</td>
{%- for language in site.data.languages -%}
<td class="{{language.language-code}}">

{%- if u[language.language-code] -%}
{%- assign thisl = u[language.language-code] -%}
{%-   if thisl.choose -%}
{%-     for c in thisl.choose  -%}
{%-       unless forloop.first %}<br/>{% endunless%}
          {{c | replace: '["', '<b>' | replace: '", "', '</b>: ' |replace: '"]', '' }}
{%-     endfor -%}
{%-   else -%}
        {{thisl}}
{%-   endif -%}
{%- else -%}
—
{%- endif -%}


{%- if u.map -%}
<hr class="sp"/>
<b>map:</b> {{u.map}}
{%- endif -%}

{%- if u.n -%}
<hr class="sp"/>
<span class="n">&#160;&langle;{{u.n}}&rangle;</span>
{%- endif -%}

</td>
{%- endfor -%}
</tr>
{%- endfor -%}
</tbody>
</table>
	
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

function getQueryVariable(variable){
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
   }
  return(false);
}

function setLanguage () {
  var lstr=getQueryVariable("lang");
  var llist=lstr.split(",");
  for (var i=0, iLen=langcb.length; i<iLen; i++) {
    opt = langcb[i];
    opt.checked=(llist.includes(opt.value));
  }
  updatelang();
}


if ( window.addEventListener) {
  window.addEventListener('load',
    function() {
      setLanguage();
     }, false);
}

</script>
