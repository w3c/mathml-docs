---
title: "Maintaining MathML Concept Lists"
layout: wgnote
---

<nav id="toc" markdown="1">

## Table of Contents
{:.no_toc}

* toc
{:toc}

</nav>


# Maintaining MathML Concept Lists

Placeholder

## Guidelines for Core list curation

 1. When standard notations can be used to denote multiple common concepts, those concepts should be added to the Core list.
 
     - For example, two vertical bars can surround an argument to mean "absolute-value", "cardinality", or "determinant" in K12 materials.

 2. When a common concept has known special requirements for accessible readouts, it should be added to the Core list.
 
     - For example, "power" and "divide" have known special handling in AT, based on the values of their arguments.

 3. The initial scope extends to materials in K12 STEM education. 
 
    - While mathematics is naturally the main focus, all other STEM fields are also in scope, namely biology, chemistry, computer science, earth sciences, economics, engineering and physics.
    - Concepts beyond K12 lie outside of the initial Core list. For example, when two vertical bars surround an argument to mean a group-theoretic "order", that Open concept will not be included in Core, unless the overall Core scope is increased to K14.

 4. Naming. Each Core list concept is recorded via its English encyclopedic name. In cases of multiple known names, we strive to make a practical choice.
 
    - For example, we would prefer "power" to "exponentiation", although that creates a tension with the use of "power" in physics. 
That choice is motivated by "power" being the more common name in present-day communication, as well as by mathematical uses of "power" being more widespread than the physics concept.
    - Similarly, we may prefer "gcd" to "greatest-common-divisor" due to brevity, while still adding an informal note clearly stating the connection between the two.

 5. The conditions enumerated here also extend to adding property names for kinds of objects.
    - For example, marking an `<mtable>` holding multiple equations with `intent=":system-of-equations"`,
 marking a unit expression, such as meters-per-second, with `intent=":unit"`,
 or marking the water molecule `<mrow><msub><mi>H</mi><mn>2</mn></msub><mi>O</mi></mrow>` with `intent=":chemical-formula"`.

