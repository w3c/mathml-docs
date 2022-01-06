function doc2p() {
    var cmmllist=document.querySelectorAll("pre.examplecontent");
    for (var i=0, max=cmmllist.length; i < max; i++) {
	    var zc=cmmllist[i];
		    var mdiv = document.createElement("pre");
		    mdiv.setAttribute("class",'mml');
			 //   mdiv.innerHTML="zzz";
	  var zcmml=document.createElement('div');
	  var zpmml=document.createElement('div');
	zcmml.innerHTML="<math>\n" + zc.textContent + "\n</math>";
	for(var j=0;j<zcmml.childNodes.length; j++ ) {
	    ctopAT(zpmml,zcmml.childNodes[j],0);
	}
       mdiv.textContent=zpmml.innerHTML;
	zc.parentNode.insertBefore(zpmml, zc.nextSibling);
	zc.parentNode.insertBefore(mdiv, zc.nextSibling);
    }
}

 window.addEventListener('load', doc2p, false);

		 
