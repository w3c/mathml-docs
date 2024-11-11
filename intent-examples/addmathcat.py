import re
import os
import sys
import hashlib
import libmathcat_py as libmathcat      # type: ignore

sys.stdout.reconfigure(encoding="utf-8", newline='\n')

if (len(sys.argv) != 2):
  raise Exception("no argument")

htmlfile=sys.argv[1]


def SetMathCATPreferences():
  try:
    libmathcat.SetRulesDir(
      # this assumes the Rules dir is in the same dir a the library. Modify as needed
      os.path.join( os.path.dirname(os.path.abspath(__file__)), "Rules")
    )
  except Exception as e:
    print("problem with finding the MathCAT rules")

  try:
    libmathcat.SetPreference("TTS", "none")
    libmathcat.SetPreference("Language", "en")         # Also "id" and "vi"
    libmathcat.SetPreference("SpeechStyle", "SimpleSpeak")   # Also "ClearSpeak"
    libmathcat.SetPreference("Verbosity", "Verbose")   # also terse "Terse"/"Medium"x
    libmathcat.SetPreference("CapitalLetters_UseWord", "false")   # if "true", X => "cap x"
    libmathcat.SetPreference("IntentErrorRecovery","Error") # Error and IgnoreIntent.
  except Exception as e:
      print("problem with setting a preference")

def SetMathMLForMathCAT(mathml: str):
    libmathcat.SetMathML(mathml)


def GetSpeech():
  libmathcat.SetPreference("IntentErrorRecovery","Error") # Error and IgnoreIntent.
  try:
    return libmathcat.GetSpokenText()
  except Exception as e:
      libmathcat.SetPreference("IntentErrorRecovery","IgnoreIntent") # Error and IgnoreIntent.
      s2=libmathcat.GetSpokenText()
      return "<span class='error' title='" + re.sub('apos;M[^& ]*','apos;M...',re.sub('C:.*?Rules','Rules',str(e)).replace('&','&amp;').replace('<','&lt;').replace("'",'&apos;')) + "'>" + s2 +"</span>"


def GetVersion():
    return libmathcat.GetVersion()


SetMathCATPreferences()   # you only need to this once


htmlstr = open(htmlfile,'r',encoding="utf-8").read()
htmlstr = htmlstr.replace('<!--X','<').replace('X-->','>').replace('\t','        ')
htmlstr = htmlstr.replace('</h1>','</h1><h2>MathCAT Version: ' +  GetVersion() + '</h2>')


mmltds=re.split(r'<tr>\s*<td>(\s*<math\b.*?</math>\s*)</td>\s*<td>(.*?)</td>', htmlstr, flags=re.DOTALL)


sys.stdout.reconfigure(encoding='utf-8')

def selflink(match):
  m1 = match.group(1)
  m2 = match.group(2)
  m3 = match.group(3)
  m3id = re.sub(r'[ \t()]','',m3)
  return u"<t{}{} id=\"ID{}\"><a class=\"self\" href=\"#ID{}\">{}</a></t{}>\n </tr>".format(m1,m2,m3id,m3id,m3,m1)


def ApplyMathCAT (i,mml,firstln):
  hashid="id-{}-{}".format((- i) % 3,hashlib.md5(mml.encode('utf-8')).hexdigest())
  print("<pre id='{}'><a class='self' href='#{}'>&#xa7;</a>".format(hashid,hashid) )
  if firstln:
    mmlb = re.split("\n+", mml)[0]
  else:
    mmlb = mml
  print(re.sub("((arg|intent)='[^']*')",r'<b>\1</b>',
         mmlb.replace('&','&amp;').replace('<','&lt;').replace('\n     ','\n')))
  print("</pre>")
  try:
    SetMathMLForMathCAT(mml)
    mcat=GetSpeech()
    mcatl=re.sub(r'((line|column|case|equation) [0-9]+;)',r'<br/>\1',mcat)
    print ("\n    <div class=\"mathcat\">{}</div>".format(mcatl))
  except Exception as e:
    print ("\n    <div class=\"mathcat\"><span class='error' title='" + re.sub('apos;M[^& ]*','apos;M...',re.sub('C:.*?Rules','Rules',str(e)).replace('&','&amp;').replace('<','&lt;').replace("'",'&apos;')) + "'>problem with SetMathML</span></div>")
  

i=0
for mmltd in mmltds:
  i=i+1
  if(i % 3 == 2):
    print("<tr>")
    print('<td class="pad">')
    print(mmltd)
    print("</td>")
  if(i % 3 == 2   or i % 3 == 0):
    print("<td>")
    mmls=re.split(r'(<math\b.*?</math>)',str(mmltd), flags=re.DOTALL)
    j=0
    for mml in mmls:
      j=j+1
      if(j % 2 == 0):
        ApplyMathCAT(i,mml,False)
    if(i % 3 == 2):
 #     print("<td>")
      mml=re.sub(r'\s*<math',r"<math intent=':common'",mmltd)
      mml=re.sub(r'</math>\s*',r"</math>",mml)
      ApplyMathCAT(1,mml,True)
      mml=re.sub(r"<math intent=':common'",r"<math intent=':literal'",mml)
      ApplyMathCAT(1,mml,True)
#      mml=re.sub(r"<math intent=':literal'",r"<math intent=':chemical-formula'",mml)
#      ApplyMathCAT(1,mml,True)
    print("</td>")
  else:
    mmltd=re.sub(r'<t(d|h)([^<>]*)>([^<>]*)</t[dh]>\s*</tr>',
               selflink,
               mmltd)
    print (mmltd.replace('<td','<td class="pad"'),end="")
