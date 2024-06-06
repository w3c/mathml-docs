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





## Speech Templates for Unicode Characters

----



<table style="width:100%">
<thead>
<tr>
<th>Unicode</th><th>Character</th><th>Speech Template</th>
</tr>
</thead>
<tbody>
{%- assign eobj = '"}' -%}
{%- assign bobj = '{"' -%}
{%- for u in site.data.unicode-speech -%}
<tr id="U{{u[1].u | replace: " ", "_"}}">
<td><a class="self" href="#U{{u[1].u | replace: " ", "_"}}">{{u[1].u}}</a></td>
<td>{{u[0].char}}</td>
<td>
{%- for f in u offset:2  -%}
{%- unless forloop.first or f.n %}<hr class="sp"/>{% endunless%}

{%- if f.choose -%}
{%- for c in f.choose  -%}
{%- unless forloop.first %}<br/>{% endunless%}
{{c | replace: eobj, " " | replace: bobj, '<b>' | replace: '"=>"', '</b>: '  }}
{%- endfor -%}
{%- endif -%}

{%- if f.map -%}
<b>map:</b> {{f.map}}
{%- endif -%}

{%- if f.t -%}
{{f.t}}
{%- endif -%}


{%- if f.n -%}
<span class="n">&#160;&langle;{{f.n}}&rangle;</span>
{%- endif -%}

{%- endfor -%}
</td>
</tr>
{%- endfor -%}
</tbody>
</table>
	
----
