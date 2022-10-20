# Spoken Math Survey

Question: How do you speak this formula?
Answer: a piece of text.
Analysis: an implementation in MathML intents

What? This document is a sketch of the proposed survey. 
Version history:
- PL 2022-09: Discussion at TPAC i18n group
- PL 2022-10: First sketch



## Impulses
We wish to collect as much as possible the diversity of speak-aloud formulæ so that the intent proposed standard feels complete by checking its feasibility on at least two largely different languages.
The suggestion was made by the i18n workgroup of the W3C to ensure that we have not forgotten elementary spoken language constructs such as gender, number or declination.

At a minimum we should collect a significant amount of formulæ in two largely different languages (such as one european and one Asian or Arabic) which would enable us to make sure that the intents encoding proposal can cover them for the examples chosen.

Output: We aim at obtaining spoken formulæ and their source in a MathML tree using intents that complies to the current spec. This will prove us that the current spec about intents is flexible enough to cover the languages we have been able to analyse.

Technical ideas: Use a classic survey tool. For each chosen formula, request the text of the speak-aloud, optionally a sound recording and a LaTeX translation.

Don't forget:
- locale-name that our user is representing (language, region, mathematical domain of specialty)
- questions that give enough content so that the formulæ are unambiguously read, e.g. using a sentence around it
- permission to reproduce the input text and/or translated formula
- voice
- contact information for further questions (this will not be shared)

## Elaboration process

Parallel tasks:

- Start encoding the survey's typical ingredients in, say, limesurvey.banto.co exploring each modality (voice upload, mathlive input, surrounding questions)
	- try in many different devices, especially mobiles
	- optimize a way to suggest the use of the onboard voice recognition
- Select formulas to be surveyed; aim at a broad coverage (see below)
- Ask for help across the world for the processing of survey responses (so far obtained from Arabic-speaking fellows)

Then complete deployment, craft an invitation and get it reviewed. Then process answers by people that master the local language (who will localize the MathML expression if need be and encode the intent attributes at best of their understanding of the spec).

## Formulas selected

* elementary arithmetics
	* +, -, times, division, fraction, absolute value
	* a long division
	* third-root, square root
	* max / min / gcd / lcm
	* proportional to
* geometry
	* angle, triangle, parallel, area, perimeter
* polynomials
	* sum, fractions, degree
* subscript / superscript
* intervals
* trigonometry (with arc-functions)
* logarithms, exponentials
* derivatives of a few functiosn, and a partial derivative
* definite integral
* indefinite integrals
* logic (and/or/implies/iff)
* set theory (member of, subset, such that, exists)
* typical sets (R, N, Q, ...)
* matrices
	* a triangular matrix
	* transpose
	* a system of equation with a line broken in two
	* determinants
* limit of a function and of a sequence
* probability distributions
	* some classic
	* P(A), P(X<=k), P(X|Y)
* piecewise mapping definition
* mapping, domain, image
* groups and subgroups
* connections, gradients, laplacian
* tensor product
