---
title: Speech templates for Unicode Characters
---
<style>
tr:target >td:first-child {border-left:solid thick black}
span.cb {margin-right: 2em; white-space:nowrap}
.markdown-body table tr.row0, .markdown-body table th.row0 {background-color:#F6F8FA}
.markdown-body table tr.row1 {background-color:#FEFFFE}
a.link {font-weight:500}
a.self {color: black; font-weight:500}
hr.sp {height:.1em;max-width:6em;padding:0;margin:0}
span.n {font-size:80%;font-style: monospace}
</style>





## Speech Templates for Unicode Characters

----



<table style="width:100%">
<tbody>
{%- assign eobj = '"}' -%}
{%- assign bobj = '{"' -%}
{%- for u in site.data.unicode-speech2 -%}
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
