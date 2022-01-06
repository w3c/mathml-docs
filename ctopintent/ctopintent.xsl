<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
		xmlns:xs="http://www.w3.org/2001/XMLSchema"
		version="3">

 <xsl:output method="html" version="5"/>
 
 <xsl:template match="/">
  <html>
   <head>
    <xsl:text>&#10;</xsl:text>
    <title>Examples from MathML4</title>
    <xsl:text>&#10;</xsl:text>
    <script src="ctop.js"></script>
    <xsl:text>&#10;</xsl:text>
    <script src="ctop-runner.js"></script>
    <xsl:text>&#10;</xsl:text>
    <style>
     body {max-width:80em; margin: auto;}	 
     div.section {border: solid thin black; padding:.5em;margin-top:.5em;}
     pre.examplecontent{border:solid thin blue;padding:.5em;background-color:#EEE;margin-bottom:0pt;margin-top:1em;}
     pre.mml{border:solid thin green;padding:.5em;background-color:#F5F5F5;margin-top:0pt}
     math{border:solid thin green;padding:.5em;background-color:#F5F5F5;margin-top:0pt}
    </style>
    <xsl:text>&#10;</xsl:text>
   </head>
    <xsl:text>&#10;</xsl:text>
   <body>
    <xsl:text>&#10;</xsl:text>
    <h1>Examples from MathML4</h1>
    <xsl:text>&#10;</xsl:text>
    <xsl:apply-templates/>
  </body>
  </html>
    <xsl:text>&#10;</xsl:text>
 </xsl:template>


 <xsl:template match="section|div[string(h6)]">
  <div class="section">
   <xsl:apply-templates select="(h1|h2|h3|h4|h5|h6)[1]" mode="keep"/>
   <xsl:apply-templates select="*"/>
  </div>
 </xsl:template>
 

<xsl:template match="div[@class=('example mathml','example strict-mathml')]">
    <pre class="examplecontent">
     <xsl:apply-templates mode="pre"/>
    </pre>
</xsl:template>
<xsl:template match="div[@class='example mathml'][preceding-sibling::*='Sample Presentation']" priority="2"/>
 
<xsl:template match="text()"/>

<xsl:template mode="pre" match="text()">
 <xsl:value-of select="."/>
</xsl:template>

<xsl:template mode="keep" match="node()">
 <xsl:copy>
  <xsl:copy-of select="@id"/>
  <xsl:apply-templates mode="keep"/>
 </xsl:copy>
</xsl:template>

</xsl:stylesheet>
