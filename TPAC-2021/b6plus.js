/* b6plus.js $Revision: 1.35 $
 *
 * Script to simulate projection mode on browsers that don't support
 * media=projection or 'overflow-block: paged' (or ‘overflow-block:
 * optional-paged’, from the 2014 Media Queries draft) but do support
 * Javascript.
 *
 * Documentation and latest version:
 *
 *   https://www.w3.org/Talks/Tools/b6plus/
 *
 * Brief usage instructions:
 *
 * Add the script to a page with
 *
 *   <script src="b6plus.js" type="text/javascript"></script>
 *
 * The script assumes each slide starts with an H1 or an element with
 * class "slide", which is a direct child of the BODY. All elements
 * until the next H1 or class "slide" are part of the slide, except
 * for those with a class of "comment", which are hidden in slide
 * mode.
 *
 * Elements with a class of "progress", "slidenum" or "numslides" are
 * treated specially. They can be used to display progress in the
 * slide show, as follows. Elements with a class of "numslides" will
 * have their content replaced by the total number of slides in
 * decimal. Elements with a class of "slidenum" will have their
 * content replaced by the number of the currently displayed slide in
 * decimal. The first slide is numbered 1. Elements with a class of
 * "progress" will get a 'width' property whose value is a percentage
 * between 0% and 100%, corresponding to the progress in the slide
 * show: if there are M slide in total and the currently displayed
 * slide is number N, the 'width' property will be N/M * 100%.
 *
 * There can be as many of these elements as desired. If they are
 * defined as children of the BODY, they will be visible all the time.
 * Otherwise their visibility depends on their parent.
 *
 * Usage:
 *
 * - Press A to toggle normal and slide mode. The script starts in
 *   normal mode.
 *
 * - Press Page-Down to go to the next slide. Press Page-Up, up arrow
 *   or left arrow to back-up one page.
 *
 * - Press Space, right arrow, down arrow or mouse button 1 to advance
 *   (incremental display or next slide)
 *
 * On touch screens, a tap with three fingers toggles slide mode, a
 * tap with two fingers goes back one slide, and a tap with one finger
 * (click) advances.
 *
 * To do: use whatever element has 'page-break-before: always' instead
 * of H1. (Is this possible? Do browsers store properties they don't
 * implement?)
 *
 * To do: don't do anything if media = projection
 *
 * To do: allow configuration options in the slide file? E.g., to
 * disable advancing slides with a mouse click or to use allow
 * clicking in the left third of a slide to go back.
 *
 * Derived from code by Dave Raggett.
 *
 * Author: Bert Bos <bert@w3.org>
 * Created: May 23, 2005 (b5)
 * Modified: Jan 2012 (b5 -> b6)
 * Modified: Oct 2016 (added jump to ID; fixes bugs with Home/End key handling)
 * Modified: Apr 2018 (added touch events)
 * Modified: May 2018 (support 'overflow-block' from Media Queries 4)
 * Modified: Mar 2019 (support fixed aspect ratio, progress elements, b6 -> b6+)
 * Modified: Aug 2020 (add class=visited to past elts in incremental display)
 * Modified: Oct 2020 (start in slide mode if URL contains "?full")
 * Modified: Apr 2021 (disable navigation if URL contains ‘?static’)
 * Modified: May 2021 (rescale if window size changes while in slide mode)
 * Modified: Jun 2021 (only one incremental item active, as in Shower since 3.1)
 * Modified: Sep 2021 (a11y: added role=application and a live region)
 *
 * Copyright 2005-2021 W3C (MIT, ERCIM, Keio, Beihang)
 * See http://www.w3.org/Consortium/Legal/copyright-software
 */

(function() {

"use strict";

/* Global variables */
var curslide = null;
var slidemode = false;		// In slide show mode or normal mode?
var incrementals = null;	// Array of incrementally displayed items
var gesture = {};		// Info about touch/pointer gesture
var numslides = 0;		// Number of slides
var stylesToLoad = 0;		// # of load events to wait for
var limit = 0;			// A time limit used by toggleMode()
var nextid = 0;			// For generating unique IDs
var interactive = true;		// Allow navigating to a different slide?
var progressElts = [];		// Elements with class=progress
var slidenumElts = [];		// Elements with class=slidenum
var liveregion = null;		// Element [role=region][aria-live=assertive]
var savedContent = "";		// Initial content of the liveregion


/* generateID -- generate a unique ID */
function generateID()
{
  var id;

  do {id = "x" + nextid++;} while (document.getElementById(id));
  return id;
}


/* cloneNodeWithoutID -- deep clone a node, but not any ID attributes */
function cloneNodeWithoutID(elt)
{
  var clone, h;

  clone = elt.cloneNode(false);
  if (elt.nodeType === 1 /*Node.ELEMENT_NODE*/) {
    clone.removeAttribute("id");			// If any
    for (h = elt.firstChild; h; h = h.nextSibling)
      clone.appendChild(cloneNodeWithoutID(h));		// Recursive
  }
  return clone;
}


/* initIncrementals -- find and hide incremental elements in current slide */
function initIncrementals()
{
  var e = curslide;

  /* Collect all unvisited incremental elements into array incrementals. */
  incrementals = [];
  incrementals.cur = -1;
  do {
    /* Go to the next node, in document source order. */
    if (e.firstChild) {
      e = e.firstChild;
    } else {
      while (e && !e.nextSibling) e = e.parentNode;
      if (e) e = e.nextSibling;
    }
    if (!e) break;			/* End of document */
    if (e.nodeType != 1) continue;	/* Not an element */
    if (isStartOfSlide(e)) break;	/* Reached the next slide */
    if (e.classList.contains("incremental") || e.classList.contains("overlay"))
      for (const c of e.children) {
	if (!c.classList.contains("visited")) incrementals.push(c);
	if (c.classList.contains("active")) incrementals.cur = 0;
      }
    if (e.classList.contains("next")) {	/* It is an incremental element */
      if (!e.classList.contains("visited")) incrementals.push(e);
      if (e.classList.contains("active")) incrementals.cur = 0;
    }
  } while (1);
}


/* isStartOfSlide -- check if the element is an H1 or has class=slide */
function isStartOfSlide(elt)
{
  if (elt.nodeType != 1) return false;		// Not an element
  if (elt.classList.contains("slide")) return true;
  if (elt.nodeName != "H1") return false;

  /* The element is an H1. It starts a slide unless it is inside class=slide */
  while (true) {
    elt = elt.parentNode;
    if (!elt || elt.nodeType != 1) return true;
    if (elt.classList.contains("slide")) return false;
  }
}


/* updateProgress -- update the progress bars and slide numbers, if any */
function updateProgress()
{
  /* Set the width of the progress bars */
  for (const e of progressElts)
    e.style.width = 100 * curslide.b6slidenum / numslides + "%";

  /* Set the content of .slidenum elements to the current slide number */
  for (const e of slidenumElts)
    e.textContent = curslide.b6slidenum;
}


/* initProgress -- find .progress and .slidenum elements, count slides */
function initProgress()
{
  /* Count the number of slides, give each slide a number */
  numslides = 0;
  for (const h of document.body.children)
    if (isStartOfSlide(h)) h.b6slidenum = ++numslides; // Save number in element

  /* Find all elements that are progress bars, unhide them. */
  progressElts = document.getElementsByClassName("progress");
  for (const e of progressElts)
    if (typeof e.b6savedstyle === "string") e.style.cssText = e.b6savedstyle;

  /* Find all that should contain the current slide number, unhide them. */
  slidenumElts = document.getElementsByClassName("slidenum");
  for (const e of slidenumElts)
    if (typeof e.b6savedstyle === "string") e.style.cssText = e.b6savedstyle;

  /* Find all that should contain the # of slides, fill and unhide them. */
  for (const e of document.getElementsByClassName("numslides")) {
    if (typeof e.b6savedstyle == "string") e.style.cssText = e.b6savedstyle;
    e.textContent = numslides;	// Set content to number of slides
  }
}


/* displaySlide -- make the current slide visible */
function displaySlide()
{
  var h;

  /* assert(curslide.nodeName == "H1" || hasClass(curslide, "slide")) */
  curslide.style.cssText = curslide.b6savedstyle;
  curslide.classList.add("active");		// Compatibility with Shower
  liveregion.innerHTML = "";			// Make it empty

  if (curslide.nodeName == "H1") {
    liveregion.appendChild(cloneNodeWithoutID(curslide));
    /* Unhide all elements until the next slide. And copy the slide to
       the live region so that it is spoken */
    for (h = curslide.nextSibling; h && !isStartOfSlide(h); h = h.nextSibling)
      if (h !== liveregion) {
	if (h.nodeType === 1) h.style.cssText = h.b6savedstyle;
	liveregion.appendChild(cloneNodeWithoutID(h));
      }

  } else {					// class=slide
    /* Copy the contents of the slide to the live region so that it is spoken */
    for (h = curslide.firstChild; h; h = h.nextSibling)
      liveregion.appendChild(cloneNodeWithoutID(h));
  }

  updateProgress();
  initIncrementals();
}


/* hideSlide -- make the current slide invisible */
function hideSlide()
{
  var h;

  if (!curslide) return;

  /* assert(curslide.nodeName == "H1" || hasClass(curslide, "slide")) */
  curslide.classList.remove("active"); // Compatibility with Shower
  curslide.classList.add("visited");   // Compatibility with Shower
  curslide.style.visibility = "hidden";
  curslide.style.position = "absolute";
  curslide.style.top = "0";
  for (h = curslide.nextSibling; h && !isStartOfSlide(h); h = h.nextSibling)
    if (h.nodeType === 1 /*Node.ELEMENT_NODE*/ && h !== liveregion) {
      h.style.visibility = "hidden";
      h.style.position = "absolute";
      h.style.top = "0";
    }
}


/* makeCurrent -- hide the previous slide, if any, and display elt */
function makeCurrent(elt)
{
  /* assert(elt) */
  if (curslide != elt) {
    hideSlide();
    curslide = elt;
    displaySlide();
  }
}


/* fullscreen -- toggle fullscreen mode */
function fullscreen()
{
  // if (!document.fullscreenEnabled) {
  //   window.alert("Full-screen mode is not possible");
  //   return;
  // }

  if (document.fullscreenElement)
    document.exitFullscreen();
  else if (document.webkitFullscreenElement)
    document.webkitExitFullscreen();
  else if (document.documentElement.requestFullscreen)
    document.documentElement.requestFullscreen({navigatioUI: "hide"})
	    .catch(err => {
      alert(`An error occurred while trying to switch into full-screen mode: ${err.message} (${err.name})`);});
  else if (document.documentElement.webkitRequestFullscreen)
    document.documentElement.webkitRequestFullscreen();
}


/* keyDown -- handle key presses on the body element */
function keyDown(event)
{
  var on_body = event.target.tagName === "BODY"; // i.e., not a focused elt.

  if (event.altKey || event.ctrlKey || event.metaKey) return;

  /* Focused elements should handle most keys themselves. */
  if (slidemode) {
    switch (event.key) {
    case "PageDown":   nextSlide(); break;
    case "PageUp":     previousSlide(); break;
    case "Left":       // Some older browsers
    case "ArrowLeft":  if (!on_body) return; else previousSlide(); break;
    case "Up":	       // Some older browsers
    case "ArrowUp":    if (!on_body) return; else previousSlide(); break;
    case "Spacebar":   // Some older browsers
    case " ":          if (!on_body) return; else nextSlideOrElt(); break;
    case "Right":      // Some older browsers
    case "ArrowRight": if (!on_body) return; else nextSlideOrElt(); break;
    case "Down":       // Some older browsers
    case "ArrowDown":  if (!on_body) return; else nextSlideOrElt(); break;
    case "Home":       if (!on_body) return; else firstSlide(); break;
    case "End":        if (!on_body) return; else lastSlide(); break;
    case "a":          if (!on_body) return; else toggleMode(); break;
    case "F1":         if (!on_body) return; else fullscreen(); break
    case "Esc":	       // Some older browsers
    case "Escape":     toggleMode(); break;
    default:           return;
    }
  } else {
    if (!on_body) return;
    if (event.key != "a") return;
    toggleMode();
  }

  event.preventDefault();
}


/* load -- handle the load event */
function load(e)
{
  if (stylesToLoad) stylesToLoad--;
  e.target.removeEventListener(e.type, load);
}


/* toggleMedia -- swap styles for projection and screen */
function toggleMedia()
{
  var i, h, s, links, styles;

  var re1 = /\(\s*overflow-block\s*:\s*((optional-)?paged)\s*\)/gi;
  var sub1 = "(min-width: 0) /* $1 */";
  var re2 = /\(min-width: 0\) \/\* ((optional-)?paged) \*\//gi;
  var sub2 = "(overflow-block: $1)";
  var re3 = /\bprojection\b/gi;
  var sub3 = "screen";
  var re4 = /\bscreen\b/gi;
  var sub4 = "projection";

  /* Swap projection and screen in MEDIA attributes of LINK elements */
  links = document.getElementsByTagName("link");
  for (i = 0; i < links.length; i++)
    if (links[i].rel === "stylesheet" && links[i].media) {
      if (re1.test(links[i].media)) s = links[i].media.replace(re1, sub1);
      else s = links[i].media.replace(re2, sub2);
      if (re3.test(s)) s = s.replace(re3, sub3);
      else s = s.replace(re4, sub4);
      if (s != links[i].media) {
	stylesToLoad++;
	links[i].addEventListener('load', load, false);
	links[i].media = s;
      }
    }

  /* Swap projection and screen in MEDIA attributes of STYLE elements */
  styles = document.getElementsByTagName("style");
  for (i = 0; i < styles.length; i++)
    if (styles[i].media) {
      if (re1.test(styles[i].media)) s = styles[i].media.replace(re1, sub1);
      else s = styles[i].media.replace(re2, sub2);
      if (re3.test(s)) s = s.replace(re3, sub3);
      else s = s.replace(re4, sub4);
      if (s != styles[i].media) {
	stylesToLoad++;
	styles[i].addEventListener('load', load, false);
	styles[i].media = s;
      }
    }

  /* Swap projection and screen in the MEDIA pseudo-attribute of the style PI */
  for (h = document.firstChild; h; h = h.nextSibling)
    if (h.nodeType === 7 && h.target === "xml-stylesheet") {
      if (re1.test(h.data)) s = h.data.replace(re1, sub1);
      else s = h.data.replace(re2, sub2);
      if (re3.test(s)) s = s.replace(re3, sub3);
      else s = s.replace(re4, sub4);
      if (s != h.data) {
	stylesToLoad++;
	h.addEventListener('load', load, false);	// TODO: possible?
	h.data = s;
      }
    }
}


/* scaleBody -- if the BODY has a fixed size, scale it to fit the window */
function scaleBody()
{
  var w, h, scale;

  if (document.body.offsetWidth && document.body.offsetHeight) {
    w = document.body.offsetWidth;
    h = document.body.offsetHeight;
    scale = Math.min(window.innerWidth/w, window.innerHeight/h);
    document.body.style.transform = "scale(" + scale + ")";
    document.body.style.position = "relative";
    document.body.style.marginLeft = (window.innerWidth - w)/2 + "px";
    document.body.style.marginTop = (window.innerHeight - h)/2 + "px";
    document.body.style.top = "0";
    document.body.style.left = "0";
  }
}


/* finishToggleMode -- finish switching to slide mode */
function finishToggleMode()
{
  if (stylesToLoad != 0 && Date.now() < limit) {

    setTimeout(finishToggleMode, 100);	// Wait some more

  } else if (stylesToLoad == 0 && Date.now() < limit) {

    limit = 0;
    setTimeout(finishToggleMode, 100);	// Wait 100ms for styles to apply

  } else {

    stylesToLoad = 0;
    scaleBody(); // If the BODY has a fixed size, scale it to fit the window
    initProgress();		// Find and initialize progress bar, etc.

    /* curslide can be set if we reenter slide mode or if doubleClick set it. */
    if (curslide) displaySlide();
    else if (location.hash) targetSlide(location.hash.substring(1));
    else firstSlide();
  }
}


/* toggleMode -- toggle between slide show and normal display */
function toggleMode()
{
  if (! slidemode) {
    slidemode = true;
    document.body.classList.add("full");		// Set .full on BODY
    document.body.setAttribute("role", "application");	// Hint to screenreaders

    /* Find or create an element to announce the slides in speech */
    if ((liveregion =
	 document.querySelector("[role=region][aria-live=assertive]"))) {
      savedContent = liveregion.innerHTML;	// Remember its content, if any
    } else {
      liveregion = document.createElement("div");
      liveregion.setAttribute("role", "region");
      liveregion.setAttribute("aria-live", "assertive");
      document.body.appendChild(liveregion);
      savedContent = "Stopped.";		// Default to an English message
    }

    /* Make all children of BODY invisible. */
    for (const h of document.body.children) {
      h.b6savedstyle = h.style.cssText;			// Remember properties
      h.style.visibility = "hidden";
      h.style.position = "absolute";
      h.style.top = "0";
      h.style.left = "0";
    }

    /* Except that the liveregion is visible, but cropped. */
    liveregion.style.visibility = "visible";
    liveregion.style.clip = "rect(0 0 0 0)";

    /* Swap style sheets for projection and screen. */
    document.body.b6savedstyle = document.body.style.cssText; // Remember properties
    toggleMedia();				// Swap style sheets

    /* Wait 100ms before calling a function to do the rest of the
       initialization of slide mode. That function will wait for the
       style sheets to load, but no longer than until limit, i.e., 3
       seconds */
    limit = Date.now() + 3000;
    setTimeout(finishToggleMode, 100);

  } else {

    /* savedContent is what a screen reader should say on leaving slide mode */
    liveregion.innerHTML = savedContent;

    /* Unhide all children again */
    for (const h of document.body.children) h.style.cssText = h.b6savedstyle;

    toggleMedia(); 				// Swap style sheets
    document.body.style.cssText = document.body.b6savedstyle;	// Restore properties
    document.body.classList.remove("full");	// Remove .full from BODY
    document.body.removeAttribute("role");	// Remove "application"

    slidemode = false;

    /* Put current slide in the URL, so the index view can highlight it. */
    if (curslide && curslide.id) location.replace("#" + curslide.id);
  }
}


/* nextSlideOrElt -- next incremental element or next slide if none */
function nextSlideOrElt()
{
  /* Mark the current incremental element, if any, as visited. */
  if (incrementals.cur >= 0) {
    incrementals[incrementals.cur].classList.add("visited");
    incrementals[incrementals.cur].classList.remove("active");
  }

  if (incrementals.cur + 1 < incrementals.length) {
    /* There is a next incremental element. Make it active. */
    incrementals.cur++;
    incrementals[incrementals.cur].classList.add("active");

    /* Make screen readers announce the newly displayed element */
    liveregion.innerHTML = "";		// Make it empty
    liveregion.appendChild(cloneNodeWithoutID(incrementals[incrementals.cur]));

  } else {
    /* There is no next incremental element. So go to next slide. */
    nextSlide();
  }
}


/* nextSlide -- display the next slide, if any */
function nextSlide()
{
  var h;

  if (curslide == null) return;

  /* assert(curslide.nodeName == "H1" || hasClass(curslide, "slide")) */
  h = curslide.nextSibling;
  while (h && !isStartOfSlide(h)) h = h.nextSibling;

  if (h != null) makeCurrent(h);
}


/* previousSlide -- display the next slide, if any */
function previousSlide()
{
  var h;

  if (curslide == null) return;

  /* assert(curslide.nodeName == "H1" || hasClass(curslide, "slide")) */
  h = curslide.previousSibling;
  while (h && !isStartOfSlide(h)) h = h.previousSibling;

  if (h != null) makeCurrent(h);
}


/* firstSlide -- display the first slide */
function firstSlide()
{
  var h;

  h = document.body.firstChild;
  while (h && !isStartOfSlide(h)) h = h.nextSibling;

  if (h != null) makeCurrent(h);
}


/* lastSlide -- display the last slide */
function lastSlide()
{
  var h;

  h = document.body.lastChild;
  while (h && !isStartOfSlide(h)) h = h.previousSibling;

  if (h != null) makeCurrent(h);
}


/* targetSlide -- display slide containing ID=target, or the target'th slide */
function targetSlide(target)
{
  var h, n;

  if ((h = document.getElementById(target)))
    /* Find enclosing .slide or preceding H1 */
    while (h && !isStartOfSlide(h)) h = h.previousSibling || h.parentNode;
  else if ((n = parseInt(target)) > 0)
    /* Find the start of the n'th slide. */
    for (h = document.body.firstChild; h; h = h.nextSibling)
      if (h.b6slidenum && h.b6slidenum == n) break;

  /* If found, and it is not already displayed, display it */
  if (h != null && h != curslide) makeCurrent(h);
}


/* mouseButtonClick -- handle mouse click event */
function mouseButtonClick(e)
{
  var target = e.target;

  if (!slidemode) return;
  if (e.button != 0 || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;

  // work around Safari bug
  if (target.nodeType == 3)
    target = target.parentNode;

  // check if target is not something that probably wants clicks
  // e.g. embed, object, input, textarea, select, option
  while (target) {
    if (target.nodeName === "A" || target.nodeName === "EMBED" ||
	target.nodeName === "OBJECT" || target.nodeName === "INPUT" ||
	target.nodeName === "TEXTAREA" || target.nodeName === "SELECT" ||
	target.nodeName === "SUMMARY" || target.nodeName === "OPTION") return;
    target = target.parentNode;
  }

  nextSlideOrElt();
  e.stopPropagation();
}


/* gestureStart -- handle start of a touch event */
function gestureStart(e)
{
  if (!gesture.on) {
    gesture.on = true;
    gesture.x2 = gesture.x1 = e.touches[0].clientX;
    gesture.y2 = gesture.y1 = e.touches[0].clientY;
    gesture.opacity = document.documentElement.style.opacity;
  }
  gesture.touches = e.touches.length;
}


/* gestureMove -- handle move event */
function gestureMove(e)
{
  if (gesture.on && slidemode) {
    gesture.x2 = e.touches[0].clientX;
    gesture.y2 = e.touches[0].clientY;

    /* Give some visual feedback: */
    var dx = Math.abs(gesture.x2 - gesture.x1);
    var dy = Math.abs(gesture.y2 - gesture.y1);
    if (gesture.touches != 1 || dx < dy)
      document.documentElement.style.opacity = gesture.opacity;
    else
      document.documentElement.style.opacity = 3*(1 - dx/window.innerWidth)/2;
  }
}


/* gestureEnd -- handle end of a touch event */
function gestureEnd(e)
{
  if (gesture.on) {
    gesture.on = false;

    /* Undo visual feedback */
    if (slidemode) document.documentElement.style.opacity = gesture.opacity;

    var dx = gesture.x2 - gesture.x1;
    var dy = gesture.y2 - gesture.y1;
    if (gesture.touches > 2) toggleMode();
    else if (gesture.touches > 1) return; // 2-finger gesture
    else if (!slidemode) return; // Not in slide mode
    else if (Math.abs(dx) < window.innerWidth/3) return; // Swipe too short
    else if (Math.abs(dx) < Math.abs(dy)) return; // Swipe too vertical
    else if (dx > 0) previousSlide();
    else nextSlide();
    e.preventDefault();
    e.stopPropagation();
  }
}


/* gestureCancel -- handle cancellation of a touch event */
function gestureCancel(e)
{
  gesture.on = false;
}


/* doubleClick -- handle a double click on the body */
function doubleClick(event)
{
  var h;

  if (event.button != 0 || event.altKey || event.ctrlKey ||
      event.metaKey || event.shiftKey) return;

  if (!slidemode) {
    /* If we are entering slide mode and the double click was on or
     * inside a slide that has an ID, start with that slide. */
    h = event.target;
    while (h && !isStartOfSlide(h)) h = h.previousSibling || h.parentNode;
    curslide = h;  /* May be null */
  }

  toggleMode();
  event.stopPropagation();
}


/* hashchange -- handle fragment id event, make target slide the current one */
function hashchange(e)
{
  if (slidemode) targetSlide(location.hash.substring(1));
}


/* windowResize -- handle a resize of the window */
function windowResize(ev)
{
  if (slidemode) scaleBody();	// Recalculate the transform property
}


/* checkURL -- process query parameters ("full" and "static") */
function checkURL()
{
  if (/\bfull\b/.test(location.search)) toggleMode();
  if (/\bstatic\b/.test(location.search)) interactive = false;
}


/* checkIfFramed -- if we're inside an iframe, add target=_parent to links */
function checkIfFramed()
{
  var anchors, i;

  if (window.parent != window) { // Only if we're not the top document
    anchors = document.getElementsByTagName('a');
    for (i = 0; i < anchors.length; i++)
      if (!anchors[i].hasAttribute('target'))
	anchors[i].setAttribute('target', '_parent');
    document.body.classList.add('framed'); // Allow the style to do things
  }
}


/* initialize -- add event handlers, initialize state */
function initialize()
{
  checkIfFramed();		// Add target attributes if needed
  checkURL();			// Parse query parameters (full, static)

  if (interactive) {		// Only add event listeners if not static
    document.addEventListener('click', mouseButtonClick, false);
    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('dblclick', doubleClick, false);
    window.addEventListener('hashchange', hashchange, false);
    document.addEventListener('touchstart', gestureStart, false);
    document.addEventListener('touchmove', gestureMove, false);
    document.addEventListener('touchend', gestureEnd, false);
    document.addEventListener('touchcancel', gestureCancel, false);
  }
  window.addEventListener('resize', windowResize, true);
}


/* main */
if (document.readyState !== 'loading') initialize();
else document.addEventListener('DOMContentLoaded', initialize);

})();
