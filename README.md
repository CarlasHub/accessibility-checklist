# Accessibility Checklist – WCAG 2.2

A **frontend developer focused accessibility checklist** for manual verification before shipping code.

This tool is designed to complement automated testing by covering the issues automation cannot reliably detect, such as keyboard behavior, focus management, form errors, reflow, and interactive component semantics.

🔗 **Live version:**  
https://carlashub.github.io/accessibility-checklist/

---

## Purpose

This checklist exists to provide a **practical Definition of Done for accessibility** in frontend projects.

It is intended to be used:
- During development
- As part of PR review
- Before release to production

The focus is on **how developers test**, **what passing looks like**, and **what to fix** when something fails.

---

## Who this is for

- Frontend developers
- UI engineers
- Design system engineers
- Accessibility focused developers
- Teams working toward WCAG 2.2 AA conformance

This is **not** a theoretical WCAG summary.  
It is a **hands on engineering checklist**.

---

## What it covers

- Keyboard and focus behavior
- Forms, errors, and authentication
- ARIA and custom components
- Structure and navigation
- Visual contrast and reflow
- Pointer and touch interactions
- Motion and reduced motion
- Media basics

Each check includes:
- WCAG success criterion reference
- How to test it manually
- Pass criteria
- Practical remediation guidance

---

## How to use

1. Open the checklist  
   https://carlashub.github.io/accessibility-checklist/

2. Test your UI using:
   - Keyboard only
   - 200% zoom
   - 320px viewport width
   - At least one critical flow with a screen reader

3. Mark checks as done only when:
   - The issue is verified
   - The fix is implemented
   - The behavior matches native expectations

4. Reset and repeat for each release

---

## What this does NOT replace

- Automated testing (axe, Lighthouse, pa11y)
- Formal accessibility audits
- User testing with assistive technologies



---

## WCAG reference

All checks are based on:
- WCAG 2.2
- Official W3C Understanding documents
- Established accessibility engineering patterns

Each item links directly to the relevant WCAG success criterion.

