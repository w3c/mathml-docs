## Notes on Presentation MathML

  <section>
   <h5 id="presm_lbalgorithm">Automatic Linebreaking Algorithm (Informative)</h5>

   <p>One method of linebreaking that works reasonably well is sometimes referred
   to as a "best-fit" algorithm. It works by computing a "penalty" for
   each potential break point on a line. The break point with the smallest
   penalty is chosen and the algorithm then works on the next line. Three
   useful factors in a penalty calculation are:
   </p>
   <ol>

    <li>
     <p>How much of the line width (after subtracting of the indent) is unused?
     The more unused, the higher the penalty. </p>
    </li>

    <li>
     <p>How deeply nested is the breakpoint in the expression tree? The expression
     tree's depth is roughly similar to the nesting depth of <code class="element">mrow</code>s.
     The more deeply nested the break point, the higher the penalty. </p>
    </li>

    <li>
     <p>Does a linebreak here make layout of the next line difficult?
     If the next line is not the last line and if the indentingstyle uses
     information about the linebreak point to determine how much to indent,
     then the amount of room left for linebreaking on the next line must be considered;
     i.e., linebreaks that leave very little room to draw the next line
     result in a higher penalty.</p>
    </li>

    <li>
     <p>Whether <code class="attributevalue">linebreak</code> has been specified:
     <code class="attributevalue">nobreak</code> effectively sets the penalty to infinity,
     <code class="attributevalue">badbreak</code> increases the penalty
     <code class="attributevalue">goodbreak</code> decreases the penalty,
     and <code class="attributevalue">newline</code> effectively sets the penalty to 0.</p>
    </li>
   </ol>

   <p>This algorithm takes time proportional to the number of token elements times the number
   of lines.</p>
  </section>

  <section>
   <h5 id="presm_inline_lbalgorithm">Linebreaking Algorithm for Inline Expressions (Informative)</h5>

   <p>
    A common method for breaking inline expressions that are too long for the
    space remaining on the current line is to pick an appropriate break point
    for the expression and place the expression up to that point on the current line
    and place the remainder of the expression on the following line.
    This can be done by:
   </p>
   <ol>

    <li>
     <p>Querying the text processing engine for the
     minimum and maximum amount of space available on the current line. </p>
    </li>

    <li>
     <p>Using a variation of the automatic linebreaking algorithm
     given <a class="intref" href="#presm_lbalgorithm">above</a>),
     and/or using hints provided by <a class="intref" href="#presm_lbattrs">linebreak attributes</a>
     on <code class="element">mo</code> or <code class="element">mspace</code> elements, to choose a line break.
     The goal is that the first part of the formula fits "comfortably" on the current line
     while breaking at a point that results in keeping related
     parts of an expression on the same line. </p>
    </li>

    <li>
     <p>The remainder of the formula begins on the next line,
     positioned both vertically and horizontally according
     to the paragraph flow;
     MathML's <a class="intref" href="#presm_lbindent_attrs">indentation attributes</a>
     are ignored in this algorithm.</p>
    </li>

    <li>
     <p>If the remainder does not fit on a line,
     steps 1 - 3 are repeated for the second and subsequent lines.
     Unlike the for the first line,
     some part of the expression must be placed these lines so that the algorithm terminates.</p>
    </li>
   </ol>

  </section>

   <section>
  <h4 id="presm_warnfinetuning">Warning about fine-tuning of presentation</h4>

  <p>Some use-cases require precise control of the math layout and presentation.
  Several MathML elements and attributes expressly support such fine-tuning of the
  rendering.  However, MathML rendering agents exhibit wide variability in their
  presentation of the the same MathML expression due to difference in platforms,
  font availability, and requirements particular to the agent itself
  (see <a href="#presm_intro"></a>).
  The overuse of explicit rendering control may yield a &#x2018;perfect&#x2019; layout on one platform,
  but give much worse presentation on others.
  The following sections clarify the kinds of problems that can occur.</p>

  <section>
   <h5 id="presm_warntweaking">Warning: non-portability of <span>&#x201c;tweaking&#x201d;</span></h5>

   <p>For particular expressions, authors may be tempted to use the
   <a class="intref" href="#presm_mpadded"><code class="element">mpadded</code></a>,
   <a class="intref" href="#presm_mspace"><code class="element">mspace</code></a>,
   <a class="intref" href="#presm_mphantom"><code class="element">mphantom</code></a>, and
   <a class="intref" href="#presm_mtext"><code class="element">mtext</code></a> elements to improve
   (<span>&#x201c;tweak&#x201d;</span>) the spacing generated by a specific renderer.</p>

   <p>Without explicit spacing rules, various MathML renders may use different spacing
   algorithms.  Consequently, different MathML renderers may position symbols in different

   locations relative to each other.  Say that renderer B, for example, provides improved

   spacing for a particular expression over renderer A.  Authors are strongly warned
   that
   <span>&#x201c;tweaking&#x201d;</span> the layout for renderer A may produce very poor results in renderer B,
   very likely worse than without any explicit adjustment at all.</p>

   <p>Even when a specific choice of renderer can be assumed, its spacing
   rules may be improved in successive versions, so that the effect of
   tweaking in a given MathML document may grow worse with time. Also,
   when style sheet mechanisms are extended to MathML, even one version
   of a renderer may use different spacing rules for users with different
   style sheets.</p>

   <p>Therefore, it is suggested that MathML markup never use
   <code class="element">mpadded</code> or <code class="element">mspace</code> elements
   to tweak the rendering of specific expressions, unless the MathML is
   generated solely to be viewed using one specific version of one MathML
   renderer, using one specific style sheet (if style sheets are
   available in that renderer).</p>

   <p>In cases where the temptation to improve spacing proves too strong,
   careful use of <code class="element">mpadded</code>,
   <code class="element">mphantom</code>, or the alignment elements (<a href="#presm_malign"></a>) may give more portable results than the
   direct insertion of extra space using <code class="element">mspace</code> or
   <code class="element">mtext</code>. Advice given to the implementers of MathML
   renderers might be still more productive, in the long run.</p>
  </section>

  <section>
   <h5 id="presm_warnspacing">Warning: spacing should not be used to convey meaning</h5>

   <p>MathML elements that permit <span>&#x201c;negative spacing&#x201d;</span>, namely
   <code class="element">mspace</code>, <code class="element">mpadded</code>, and
   <code class="element">mo</code>, could in theory be used to simulate new
   notations or <span>&#x201c;overstruck&#x201d;</span> characters by the visual overlap of the
   renderings of more than one MathML sub-expression.</p>

   <p>This practice is <em>strongly discouraged in all situations</em>,
   for the following reasons:
   </p>
   <ul>

    <li>
     <p>it will give different results in different MathML renderers
     (so the warning about <span>&#x201c;tweaking&#x201d;</span> applies)<span>, especially
     if attempts are made to render glyphs outside the bounding box of
     the MathML expression</span>;
     </p>
    </li>

    <li>
     <p>it is likely to appear much worse than a more standard construct
     supported by good renderers;</p>
    </li>

    <li>
     <p>such expressions are almost certain to be uninterpretable
     by audio renderers, computer algebra systems,
     text searches for standard symbols,
     or other processors of MathML input.</p>
    </li>

   </ul>

   <p>More generally, any construct that uses spacing to convey
   mathematical meaning, rather than simply as an aid to viewing
   expression structure, is discouraged. That is, the constructs that
   are discouraged are those that would be interpreted differently by a
   human viewer of rendered MathML if all explicit spacing was
   removed.</p>

   <p>Consider using the <a class="intref" href="#presm_mglyph"><code class="element">mglyph</code></a> element
   for cases such as this.  If such spacing constructs are used in spite of this warning,
   they should
   be enclosed in a <code class="element">semantics</code> element that also
   provides an additional MathML expression that can be interpreted in a
   standard way. See <a href="#mixing_annotation_elements"></a> for further discussion.
   </p>

   <p>The above warning also applies to most uses of rendering
   attributes to alter the meaning conveyed by an expression, with the
   exception of attributes on <code class="element">mi</code> (such as <code class="attribute">mathvariant</code>)
   used to distinguish one variable from another.</p>
  </section>

 </section>
 
