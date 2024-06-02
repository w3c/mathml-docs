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
hr.sp {height:.1em;padding:0;margin:0}
</style>





## Speech Templates for Unicode Characters

----



<table style="width:100%">
<tbody>
{%- for u in site.data.unicode-speech -%}
<tr id="U{{u[1].u | replace: " ", "_"}}">
<td><a class="self" href="#U{{u[1].u | replace: " ", "_"}}">{{u[1].u}}</a></td>
<td>{{u[0].char}}</td>
<td>
{%- for f in u offset:2  -%}
{%- unless forloop.first %}<hr class="sp"/>{% endunless%}
{%- if f.test -%}
 {%- if f.test.if -%}
 <b>If</b> {{f.test.if}}<br/>
 {%- if f.test.then -%}<b>Then</b><br/>
 {%- if f.test.then[0].t %} {{f.test.then[0].t}}{%- else -%} {{f.test.then}} {%- endif -%}<br/>
 {%- endif-%}
 {%- if f.test.then_test -%}<b>Then</b><br/>{{f.test.then_test}}<br/> {%- endif-%} 
 {%- if f.test.else -%}<b>Else</b><br/>
 {%- if f.test.else[0].t %} {{f.test.else[0].t}}{%- else -%} {{f.test.else}} {%- endif -%}<br/>
 {%- endif-%}
 {%- if f.test.else_test -%}<b>Else0</b><br/>
 {%- if f.test.else_test.if and f.test.else_test.then.t and f.test.else_test.else.t %-}
 <b>If</b> {{f.test.else_test.if}}<br/>
 <b>Then</b><br/>{{f.test.else_test.then.t}}<br/>
 <b>Else1</b><br/>{{f.test.else_test.else.t}}<br/>
 <b>EndIf</b>
 {%- else -%}
 {{f.test.else_test}}<br/>
 {%- endif -%}
 {%- endif-%}
 <b>EndIf</b>

 {%- else -%}
 {%- if f.test[0].if -%}
 {%- for ff in f.test -%}
 {%- if ff.if -%}<b>If</b> {{ff.if}}<br/> {%- endif -%}
 {%- if ff.else_if -%}<br/><b>ElseIf</b> {{ff.else_if}}<br/> {%- endif-%}
 {%- if ff.then -%}<b>Then</b><br/>
 {%- if ff.then[0].t %} {{ff.then[0].t}}{%- else -%} {{ff.then}}<br/> {%- endif -%}
 {%- endif-%}
 {%- if ff.else -%}<br/><b>Else</b><br/>
 {%- if ff.else[0].t %} {{ff.else[0].t}}{%- else -%} {{ff.else}} {%- endif -%}<br/>
 {%- endif-%}
 {%- endfor -%}
 <b>EndIf</b>
 {%- else -%}
 {{f.test}}!!!
 {%- endif -%}
{%- endif -%}
{%- endif -%}
{%- if f.t -%}
{{f.t}}
{%- endif -%}
{%- if f.spell -%}
<i>spell</i> {{f.spell}}
{%- endif -%}
{%- endfor -%}
</td>
</tr>
{%- endfor -%}
</tbody>
</table>
	
----
