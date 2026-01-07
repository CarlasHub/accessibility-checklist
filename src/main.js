

const CHECKS = [
  {
    sc: "2.1.1",
    title: "Keyboard",
    desc: "All functionality works with keyboard only",
    level: "A",
    href: "https://www.w3.org/TR/WCAG22/#keyboard",
    steps: [
      "Stop using the mouse.",
      "Reach everything with Tab and Shift+Tab.",
      "Activate controls with Enter and Space.",
      "Use arrow keys inside menus, radios, tabs, listboxes when present."
    ],
    pass: [
      "No functionality requires pointer only.",
      "Custom widgets behave like native controls.",
      "No keyboard traps."
    ],
    fix: [
      "Prefer native elements first: button, a, input, select, details, dialog.",
      "If you must build custom controls, implement expected keyboard patterns and roles, states, name.",
      "Add tabindex=0 only for non interactive elements that must be focusable, never add positive tabindex.",
      "For clickable div or span, replace with button or a. If you cannot, add role=button, tabindex=0, and handle Enter and Space."
    ],
    devNotes: [
      "Watch for onclick without key handling.",
      "Watch for pointer events only logic.",
      "Use :focus-visible to avoid removing focus styles."
    ],
    category: "keyboard"
  },
  {
    sc: "2.1.2",
    title: "No Keyboard Trap",
    desc: "Focus can move into and out of components",
    level: "A",
    href: "https://www.w3.org/TR/WCAG22/#no-keyboard-trap",
    steps: [
      "Tab into modals, menus, date pickers, carousels, editors.",
      "Try to tab out, reverse tab out, and close with Escape if supported.",
      "Verify any trapped focus has a documented way to exit."
    ],
    pass: ["Focus is never stuck.", "Closing a layer returns focus to the trigger."],
    fix: [
      "Trap focus only inside true modal dialogs, not inside popovers or non modal panels.",
      "On close, restore focus to the element that opened the layer.",
      "Do not remove outline and do not set tabindex=-1 on currently focused interactive elements.",
      "If you manage focus, always provide a close action reachable by keyboard."
    ],
    devNotes: ["Common cause is focus lock libraries used on non modal UI."],
    category: "keyboard"
  },
  {
    sc: "2.4.3",
    title: "Focus Order",
    desc: "Tab order matches the visual and reading order",
    level: "A",
    href: "https://www.w3.org/TR/WCAG22/#focus-order",
    steps: [
      "Tab through the page in a fresh reload from the top.",
      "Compare focus order to visual order, reading order, and DOM order.",
      "Open menus, drawers, dialogs and verify focus stays within expected region."
    ],
    pass: ["Focus order is logical and predictable.", "No jumps to unrelated regions."],
    fix: [
      "Avoid CSS that changes visual order without changing DOM order, for example flex order or grid ordering.",
      "Avoid positive tabindex, it creates fragile focus order.",
      "When inserting content dynamically, insert it in DOM where it should be reached."
    ],
    devNotes: ["If you use portals, verify focus entry and return behavior."],
    category: "keyboard"
  },
  {
    sc: "2.4.7",
    title: "Focus Visible",
    desc: "Keyboard focus indicator is visible",
    level: "AA",
    href: "https://www.w3.org/TR/WCAG22/#focus-visible",
    steps: [
      "Tab through the entire page and all interactive controls.",
      "Check on light and dark surfaces and inside scroll containers.",
      "At 200% zoom, verify the outline is not clipped."
    ],
    pass: ["Focus indicator is always visible.", "No component removes focus styles."],
    fix: [
      "Never use outline: none without adding a replacement focus style.",
      "Use :focus-visible so mouse users are not forced to see rings while keyboard users still do.",
      "Ensure focus styles are not clipped by overflow hidden on wrappers."
    ],
    devNotes: ["If you have custom focus rings, verify contrast and thickness."],
    category: "keyboard"
  },
  {
    sc: "2.4.11",
    title: "Focus Not Obscured",
    desc: "Focused element is not hidden by sticky UI",
    level: "AA",
    href: "https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum",
    steps: [
      "Tab through pages with sticky headers, cookie banners, chat widgets, floating CTAs.",
      "When focus moves, verify the focused element is visible, not behind overlays.",
      "Test at 200% zoom and small viewport heights."
    ],
    pass: [
      "Focus is at least partially visible at all times.",
      "Overlays do not cover focus without offering a way to dismiss or move past them."
    ],
    fix: [
      "Add scroll-margin-top to headings and focus targets when using sticky headers.",
      "When opening overlays, ensure they do not sit above the focused element unless focus moved into them.",
      "Provide a dismiss button and Esc close for persistent overlays when appropriate."
    ],
    devNotes: ["Common cause is skip links or anchors landing under fixed headers."],
    category: "keyboard",
    isNew: true
  },
  {
    sc: "2.4.12",
    title: "Focus Not Obscured Enhanced",
    desc: "Focused element is fully visible",
    level: "AAA",
    href: "https://www.w3.org/TR/WCAG22/#focus-not-obscured-enhanced",
    steps: [
      "Repeat Focus Not Obscured tests.",
      "Verify the focused element is fully visible, not partially clipped."
    ],
    pass: ["Focused element is fully visible."],
    fix: ["Same as 2.4.11, but ensure layout never clips any part of the focused control."],
    devNotes: ["Not required for AA, but excellent for sticky heavy UIs."],
    category: "keyboard",
    isAdvanced: true
  },
  {
    sc: "1.3.1",
    title: "Info and Relationships",
    desc: "Structure is conveyed in markup, not only visually",
    level: "A",
    href: "https://www.w3.org/TR/WCAG22/#info-and-relationships",
    steps: [
      "Check every input has a real label tied to the control.",
      "Use fieldset and legend for grouped inputs like radio groups.",
      "Check tables use th, captions and headers associations where needed."
    ],
    pass: ["Form structure is available to assistive tech.", "No placeholder only labels."],
    fix: [
      "Use label for and matching id, or wrap input inside label.",
      "For groups, use fieldset and legend, or aria-labelledby on a grouping role when fieldset is not possible.",
      "Use semantic elements: nav, main, header, footer, section, h1 to h6."
    ],
    devNotes: ["This is where most div soup fails quietly."],
    category: "structure"
  },
  {
    sc: "4.1.2",
    title: "Name, Role, Value",
    desc: "Custom components expose correct semantics and state",
    level: "A",
    href: "https://www.w3.org/TR/WCAG22/#name-role-value",
    steps: [
      "Inspect custom UI: tabs, accordions, menus, combobox, toast, dialogs, sliders.",
      "Verify each has role, accessible name, and state updates.",
      "Trigger state changes and verify AT can perceive changes."
    ],
    pass: [
      "Every interactive control has an accessible name.",
      "Role matches the UI pattern.",
      "State changes update aria attributes."
    ],
    fix: [
      "Prefer native elements or a proven accessible component library.",
      "For toggles, ensure aria-expanded or aria-pressed reflects the state.",
      "For inputs, do not use aria-label to replace visible labels unless there is no visible label."
    ],
    devNotes: ["Common failure is missing name, or role mismatch like menu patterns on simple lists."],
    category: "aria"
  },
  {
    sc: "1.1.1",
    title: "Non text Content",
    desc: "Images, icons, and controls have text alternatives",
    level: "A",
    href: "https://www.w3.org/TR/WCAG22/#non-text-content",
    steps: [
      "Check informative images have meaningful alt text.",
      "Check decorative images have empty alt and are ignored.",
      "Check icon only buttons have accessible names."
    ],
    pass: ["No missing alt for informative images.", "Decorative images are ignored by AT."],
    fix: [
      "If image is decorative, use alt=\"\" and do not add aria-label on the image.",
      "If icon is inside a button, ensure the button has text, aria-label, or aria-labelledby.",
      "For svg icons, set aria-hidden=true when decorative."
    ],
    devNotes: ["Alt is not tooltip text and should not repeat nearby labels."],
    category: "content"
  },
  {
    sc: "2.4.4",
    title: "Link Purpose",
    desc: "Links make sense from their text alone",
    level: "A",
    href: "https://www.w3.org/TR/WCAG22/#link-purpose-in-context",
    steps: [
      "Scan pages for links like Click here, Read more, Learn more.",
      "Check repeated lists of cards where many links are identical.",
      "Verify link text indicates destination or action."
    ],
    pass: ["Links have descriptive text.", "Same link text does not go to different destinations."],
    fix: [
      "Make link text specific, include the target, for example Read more about pricing.",
      "If the visible text must be short, add visually hidden text via aria-label or aria-labelledby.",
      "Avoid wrapping entire complex cards in a link if it creates nested interactive controls."
    ],
    devNotes: ["Card patterns are common offenders."],
    category: "structure"
  },
  {
    sc: "2.4.1",
    title: "Bypass Blocks",
    desc: "Skip link or equivalent to bypass repeated content",
    level: "A",
    href: "https://www.w3.org/TR/WCAG22/#bypass-blocks",
    steps: [
      "Press Tab on page load.",
      "Verify a skip link appears and moves focus to main content.",
      "Confirm it works on every template."
    ],
    pass: ["Keyboard users can bypass repeated navigation and banners."],
    fix: [
      "Add a skip link as the first focusable element.",
      "Ensure the target is focusable, for example main with tabindex=-1 or a focusable heading.",
      "Do not hide skip links permanently, only visually until focused."
    ],
    devNotes: ["Skip link is a cheap win that prevents pain."],
    category: "structure"
  },
  {
    sc: "2.4.6",
    title: "Headings and Labels",
    desc: "Headings and labels describe purpose",
    level: "AA",
    href: "https://www.w3.org/TR/WCAG22/#headings-and-labels",
    steps: [
      "Scan heading outline for each page.",
      "Confirm headings describe content, not only style.",
      "Confirm form labels and button labels match user intent."
    ],
    pass: ["Users can navigate by headings and understand section purpose."],
    fix: [
      "Use one h1 per page for the main topic in typical pages.",
      "Do not skip heading levels just for styling.",
      "Use label text that matches what users search for, for example Email address not Contact."
    ],
    devNotes: ["Many apps use bold divs, that is invisible to screen reader navigation."],
    category: "structure"
  },
  {
    sc: "3.3.1",
    title: "Error Identification",
    desc: "Errors are identified in text",
    level: "A",
    href: "https://www.w3.org/TR/WCAG22/#error-identification",
    steps: [
      "Submit the form with missing required fields.",
      "Verify each invalid field has a text error message.",
      "Ensure the error is associated with the field via aria-describedby or equivalent."
    ],
    pass: ["Error is not color only.", "Error is discoverable by keyboard and screen reader."],
    fix: [
      "Place error message next to the field and connect with aria-describedby.",
      "Set aria-invalid=true on invalid fields when showing errors.",
      "Move focus to an error summary for multi field forms, then link to each field."
    ],
    devNotes: ["Inline errors without programmatic association are useless to many users."],
    category: "forms"
  },
  {
    sc: "3.3.2",
    title: "Labels or Instructions",
    desc: "Users get clear input expectations",
    level: "A",
    href: "https://www.w3.org/TR/WCAG22/#labels-or-instructions",
    steps: [
      "Check required fields show required in text, not only an asterisk color.",
      "Check formats, constraints, and examples are provided when needed.",
      "Check instructions are available before the user makes an error."
    ],
    pass: ["Users know what is required before submission."],
    fix: [
      "Add hint text and connect it with aria-describedby.",
      "Use inputmode and autocomplete where appropriate.",
      "Avoid placeholder as the only instruction."
    ],
    devNotes: ["Good instructions reduce error rates and support cognitive accessibility."],
    category: "forms"
  },
  {
    sc: "3.3.3",
    title: "Error Suggestion",
    desc: "Suggest corrections where possible",
    level: "AA",
    href: "https://www.w3.org/TR/WCAG22/#error-suggestion",
    steps: [
      "Enter invalid data like an impossible date or malformed email.",
      "Confirm the error message suggests what to do next.",
      "Make sure suggestions do not expose sensitive data."
    ],
    pass: ["Errors are actionable.", "Messages include a fix, not only a failure."],
    fix: [
      "Write error text that includes the required format or next action.",
      "If you can infer a fix safely, suggest it, for example Did you mean gmail.com.",
      "Keep error text short and specific."
    ],
    devNotes: ["Avoid shaming language like Invalid input."],
    category: "forms"
  },
  {
    sc: "3.3.4",
    title: "Error Prevention",
    desc: "Prevent or confirm for important actions",
    level: "AA",
    href: "https://www.w3.org/TR/WCAG22/#error-prevention-legal-financial-data",
    steps: [
      "Find flows that create accounts, submit orders, delete content, or commit payments.",
      "Verify users can review, correct, and confirm before final submit.",
      "Verify destructive actions have undo or a confirmation step."
    ],
    pass: ["Users can review and correct before committing important changes."],
    fix: [
      "Add a review step for critical submissions.",
      "Provide undo for deletes when feasible, or confirm dialog with clear consequences.",
      "Do not auto submit on blur for critical forms."
    ],
    devNotes: ["This is UX and engineering, not only content."],
    category: "forms"
  },
  {
    sc: "3.3.8",
    title: "Accessible Authentication",
    desc: "No forced memorization, transcription, or puzzles",
    level: "AA",
    href: "https://www.w3.org/TR/WCAG22/#accessible-authentication",
    steps: [
      "Locate login, MFA, password reset, or re auth prompts.",
      "Check if the user must memorize, transcribe, or solve puzzles to proceed.",
      "Verify an alternative exists, for example password managers, copy paste, email links, device auth."
    ],
    pass: ["Authentication can be completed without forced memorization or puzzles.", "Copy paste is not blocked for passwords."],
    fix: [
      "Do not block paste into password fields.",
      "Avoid CAPTCHA as the only route, provide accessible alternatives.",
      "Support passkeys or magic links where feasible."
    ],
    devNotes: ["Blocking paste is still common and still wrong."],
    category: "forms",
    isNew: true
  },
  {
    sc: "1.4.3",
    title: "Contrast Minimum",
    desc: "Text contrast meets AA",
    level: "AA",
    href: "https://www.w3.org/TR/WCAG22/#contrast-minimum",
    steps: [
      "Check body text, link text, button text, and helper text.",
      "Check text on gradients, images, and tinted panels.",
      "Verify hover and focus states still meet contrast requirements."
    ],
    pass: ["Text remains readable in all states.", "Links are distinguishable in all states."],
    fix: [
      "Adjust foreground and background colors to meet contrast ratios.",
      "Do not rely on opacity for text contrast, it fails quickly on different surfaces.",
      "Test disabled states and placeholder text, they are common failures."
    ],
    devNotes: ["If a design system token fails, fix the token, not one component."],
    category: "visual"
  },
  {
    sc: "1.4.11",
    title: "Non text Contrast",
    desc: "Controls and focus indicators have enough contrast",
    level: "AA",
    href: "https://www.w3.org/TR/WCAG22/#non-text-contrast",
    steps: [
      "Check form borders, icons used as controls, toggles, sliders, checkboxes.",
      "Check focus indicators, hover borders, and selected states.",
      "Check on all backgrounds including tinted panels."
    ],
    pass: ["UI components and focus indicators are perceivable."],
    fix: [
      "Increase border weight or color contrast for controls.",
      "Ensure focus ring has sufficient contrast against adjacent colors.",
      "Avoid low contrast outline on similarly colored panels."
    ],
    devNotes: ["Focus rings that look pretty but disappear are a failure."],
    category: "visual"
  },
  {
    sc: "1.4.10",
    title: "Reflow",
    desc: "Content reflows at 320px without loss",
    level: "AA",
    href: "https://www.w3.org/TR/WCAG22/#reflow",
    steps: [
      "Resize viewport to 320px width, or use responsive mode.",
      "Zoom to 400% and verify no two dimensional scrolling for typical pages.",
      "Verify menus, dialogs, and forms remain usable."
    ],
    pass: ["No content or controls disappear off screen without a way to reach them.", "No horizontal scrolling for normal reading and form entry."],
    fix: [
      "Use responsive layout with fluid widths and wrap behavior.",
      "Avoid fixed heights that clip content when text scales.",
      "Ensure dialogs and menus are scrollable inside small viewports."
    ],
    devNotes: ["Watch for position fixed panels that trap content off screen."],
    category: "visual"
  },
  {
    sc: "1.4.4",
    title: "Resize Text",
    desc: "Text can scale without breaking layout",
    level: "AA",
    href: "https://www.w3.org/TR/WCAG22/#resize-text",
    steps: [
      "Zoom browser to 200%.",
      "Check text does not overlap, clip, or disappear.",
      "Check buttons still show their labels."
    ],
    pass: ["Content remains readable and operable at 200% zoom."],
    fix: [
      "Use relative units for font size and spacing.",
      "Avoid containers with fixed heights for text blocks.",
      "Allow buttons to wrap or grow instead of clipping text."
    ],
    devNotes: ["If you hardcode heights, you are asking to fail this."],
    category: "visual"
  },
  {
    sc: "2.5.1",
    title: "Pointer Gestures",
    desc: "Complex gestures have a simple alternative",
    level: "A",
    href: "https://www.w3.org/TR/WCAG22/#pointer-gestures",
    steps: [
      "Find pinch, swipe, multi finger, path based gestures.",
      "Verify the same action can be done with a simple tap or click."
    ],
    pass: ["No required multi finger or path based gestures."],
    fix: [
      "Provide visible buttons for actions currently only available by swipe or drag.",
      "Ensure keyboard can achieve the same result."
    ],
    devNotes: ["Carousel swipe only controls are common failures."],
    category: "input"
  },
  {
    sc: "2.5.2",
    title: "Pointer Cancellation",
    desc: "Actions are not triggered on down events only",
    level: "A",
    href: "https://www.w3.org/TR/WCAG22/#pointer-cancellation",
    steps: [
      "Press on buttons and drag away before releasing.",
      "Verify the action does not trigger until release, or there is a way to cancel."
    ],
    pass: ["Users can cancel accidental pointer downs."],
    fix: [
      "Trigger actions on click or pointerup, not pointerdown.",
      "For drag interactions, implement cancel on escape or release outside target."
    ],
    devNotes: ["This matters on touch and tremor conditions."],
    category: "input"
  },
  {
    sc: "2.5.7",
    title: "Dragging Movements",
    desc: "Drag actions have a non drag alternative",
    level: "AA",
    href: "https://www.w3.org/TR/WCAG22/#dragging-movements",
    steps: [
      "Find drag to reorder lists, drag sliders, drag maps, drag to upload.",
      "Verify a non drag method exists, for example buttons to move items up or down.",
      "Verify keyboard supports the same outcome."
    ],
    pass: ["Drag is not the only way to complete the task."],
    fix: [
      "Add move up and move down buttons for reorder lists.",
      "Allow slider value editing via input or stepper buttons.",
      "Expose keyboard support and announce changes to screen readers."
    ],
    devNotes: ["Drag and drop is not accessibility friendly by default."],
    category: "input",
    isNew: true
  },
  {
    sc: "2.5.8",
    title: "Target Size",
    desc: "Touch targets meet minimum size",
    level: "AA",
    href: "https://www.w3.org/TR/WCAG22/#target-size-minimum",
    steps: [
      "On mobile, try to tap small icons, close buttons, pagination, chips.",
      "Check for accidental activation when trying to scroll.",
      "Verify spacing around targets reduces mis taps."
    ],
    pass: ["Targets are large enough to activate reliably."],
    fix: [
      "Increase padding around interactive elements, not only icon size.",
      "Ensure close buttons in dialogs and toasts are large enough.",
      "Do not place multiple small targets too close together."
    ],
    devNotes: ["Spacing is as important as size."],
    category: "input",
    isNew: true
  },
  {
    sc: "2.2.2",
    title: "Pause, Stop, Hide",
    desc: "Moving content can be paused",
    level: "A",
    href: "https://www.w3.org/TR/WCAG22/#pause-stop-hide",
    steps: [
      "Find auto rotating carousels, tickers, animated banners.",
      "Verify user can pause, stop, or hide movement.",
      "Check keyboard access to the pause control."
    ],
    pass: ["Users can stop movement that lasts more than 5 seconds."],
    fix: [
      "Add a pause button that is keyboard accessible and has an accessible name.",
      "Do not auto rotate by default unless essential, consider off by default.",
      "Respect prefers-reduced-motion and reduce or disable motion."
    ],
    devNotes: ["Auto rotating carousels are nearly always hostile."],
    category: "motion"
  },
  {
    sc: "2.3.3",
    title: "Animation from Interactions",
    desc: "Users can disable non essential motion",
    level: "AAA",
    href: "https://www.w3.org/TR/WCAG22/#animation-from-interactions",
    steps: [
      "Trigger animations like parallax, smooth scroll, card flips, micro interactions.",
      "Enable reduced motion in OS settings and retest."
    ],
    pass: ["Motion is reduced or removed when user prefers reduced motion."],
    fix: [
      "Use CSS prefers-reduced-motion to remove or reduce animations.",
      "Avoid smooth scroll for reduced motion users.",
      "Do not rely on motion to convey meaning."
    ],
    devNotes: ["Not required for AA, but it is a strong quality marker."],
    category: "motion",
    isAdvanced: true
  },
  {
    sc: "1.2.1",
    title: "Audio only and Video only",
    desc: "Provide alternatives for media only content",
    level: "A",
    href: "https://www.w3.org/TR/WCAG22/#audio-only-and-video-only-prerecorded",
    steps: ["Find audio only or video only content.", "Verify transcript or audio description alternative exists."],
    pass: ["Users can access the information without the original media format."],
    fix: ["Provide transcripts for audio.", "Provide descriptive text alternative for video only content."],
    devNotes: ["If your product includes podcasts or video snippets, you must plan for this."],
    category: "media"
  },
  {
    sc: "1.2.2",
    title: "Captions",
    desc: "Prerecorded videos have captions",
    level: "A",
    href: "https://www.w3.org/TR/WCAG22/#captions-prerecorded",
    steps: ["Play a prerecorded video with speech.", "Verify captions are available and accurate."],
    pass: ["Captions exist for all prerecorded speech content."],
    fix: ["Add caption tracks, verify sync and accuracy.", "Do not rely on auto captions without review."],
    devNotes: ["Captions are content, but devs often own the player integration."],
    category: "media"
  },
  {
    sc: "1.3.2",
    title: "Meaningful Sequence",
    desc: "DOM order preserves meaning",
    level: "A",
    href: "https://www.w3.org/TR/WCAG22/#meaningful-sequence",
    steps: [
      "Navigate with a screen reader reading order, or use a DOM inspector.",
      "Verify content makes sense in DOM order without CSS."
    ],
    pass: ["Reading order is correct."],
    fix: [
      "Do not use CSS order to move meaningful content before its place in DOM.",
      "If you visually reorder for responsive layouts, reorder DOM too."
    ],
    devNotes: ["This also affects keyboard focus order."],
    category: "structure"
  },
  {
    sc: "2.4.2",
    title: "Page Titled",
    desc: "Each page view has a unique and meaningful title",
    level: "A",
    href: "https://www.w3.org/TR/WCAG22/#page-titled",
    steps: ["Check document title in the browser tab.", "Navigate between routes and verify title updates in SPAs."],
    pass: ["Title reflects page content and is unique enough."],
    fix: ["Set document title per route.", "Include key context like section and product name."],
    devNotes: ["In SPAs, this is often forgotten."],
    category: "structure"
  },
  {
    sc: "3.2.1",
    title: "On Focus",
    desc: "Focus does not trigger unexpected changes",
    level: "A",
    href: "https://www.w3.org/TR/WCAG22/#on-focus",
    steps: [
      "Tab through controls and verify focus does not submit forms or change context.",
      "Check menus that open on focus or hover only."
    ],
    pass: ["Focusing an element does not cause a major change without user action."],
    fix: [
      "Do not auto submit or auto navigate on focus.",
      "If a menu opens on focus, ensure it can be closed and does not trap keyboard users."
    ],
    devNotes: ["Auto open on focus can be okay, but it must be controllable."],
    category: "keyboard"
  },
  {
    sc: "3.2.2",
    title: "On Input",
    desc: "Changing values does not trigger unexpected changes",
    level: "A",
    href: "https://www.w3.org/TR/WCAG22/#on-input",
    steps: ["Change select options and input values.", "Verify it does not navigate or submit without confirmation."],
    pass: ["Context does not change unexpectedly on input."],
    fix: ["Require an explicit submit button for major actions.", "If auto update, announce changes and avoid focus loss."],
    devNotes: ["Auto filtering can be fine if it does not move focus or disrupt."],
    category: "forms"
  }
];

const CATS = [
  { id: "keyboard", label: "Keyboard and focus" },
  { id: "forms", label: "Forms and errors" },
  { id: "structure", label: "Structure and navigation" },
  { id: "visual", label: "Visual and reflow" },
  { id: "input", label: "Pointer and touch" },
  { id: "aria", label: "ARIA and components" },
  { id: "content", label: "Content alternatives" },
  { id: "motion", label: "Motion and time based UI" },
  { id: "media", label: "Audio and video" }
];

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function pill(level) {
  if (level === "AAA") return `<span class="pill pillAAA">Level AAA</span>`;
  if (level === "AA") return `<span class="pill pillAA">Level AA</span>`;
  return `<span class="pill pillA">Level A</span>`;
}

function renderKbd(text) {
  return esc(text)
    .replaceAll("Shift+Tab", '<span class="kbd">Shift</span> + <span class="kbd">Tab</span>')
    .replaceAll("Tab", '<span class="kbd">Tab</span>')
    .replaceAll("Enter", '<span class="kbd">Enter</span>')
    .replaceAll("Space", '<span class="kbd">Space</span>')
    .replaceAll("Escape", '<span class="kbd">Escape</span>');
}

function render() {
  const toc = CATS.map(c => `<li><a href="#cat-${c.id}" data-toc>${esc(c.label)}</a></li>`).join("");

  const sections = CATS.map(c => {
    const items = CHECKS.filter(x => x.category === c.id);
    if (!items.length) return "";

    const lis = items
      .map(x => {
        const pid = `p-${x.sc.replaceAll(".", "")}`;
        const newPill = x.isNew ? `<span class="pill pillNew">WCAG 2.2</span>` : "";
        const advPill = x.isAdvanced ? `<span class="pill pillAdv">Advanced</span>` : "";

        const hasFix = Array.isArray(x.fix) && x.fix.length;
        const hasDev = Array.isArray(x.devNotes) && x.devNotes.length;

        return `
        <li class="item" data-item>
          <div class="row">
            <div class="num" aria-hidden="true">${esc(x.sc)}</div>
            <div class="title">
              <strong>${esc(x.title)}</strong>
              <span>${esc(x.desc)}</span>
            </div>
            <div class="badges">
              ${pill(x.level)}
              ${newPill}
              ${advPill}
            </div>
            <div class="actions">
              <button type="button" class="doneBox" aria-pressed="false" aria-label="Mark ${esc(x.sc)} ${esc(x.title)} as done">
                <svg class="checkIcon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9.0 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"></path>
                </svg>
              </button>
              <button type="button" class="toggle" aria-expanded="false" aria-controls="${pid}">
                <span>Open</span>
                <svg class="chev" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M5.25 7.5 10 12.25 14.75 7.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </button>
            </div>
          </div>

          <div class="panel" id="${pid}" hidden>
            <div class="panelInner">
              <div class="grid">
                <section class="cardMini" aria-label="How to test ${esc(x.sc)} ${esc(x.title)}">
                  <h3 class="miniTitle">How to test</h3>
                  <ol>
                    ${x.steps.map(s => `<li>${renderKbd(s)}</li>`).join("")}
                  </ol>
                  <div class="refRow">
                    <span>Official source:</span>
                    <a href="${esc(x.href)}">WCAG SC ${esc(x.sc)}</a>
                  </div>
                </section>

                <section class="cardMini" aria-label="Pass criteria for ${esc(x.sc)} ${esc(x.title)}">
                  <h3 class="miniTitle">Pass criteria</h3>
                  <ul>
                    ${x.pass.map(s => `<li>${esc(s)}</li>`).join("")}
                  </ul>
                </section>

                ${
                  hasFix
                    ? `<section class="cardMini" aria-label="How to fix ${esc(x.sc)} ${esc(x.title)}">
                        <h3 class="miniTitle">How to fix</h3>
                        <ul>
                          ${x.fix.map(s => `<li>${esc(s)}</li>`).join("")}
                        </ul>
                      </section>`
                    : ""
                }

                ${
                  hasDev
                    ? `<section class="cardMini" aria-label="Developer notes for ${esc(x.sc)} ${esc(x.title)}">
                        <h3 class="miniTitle">Developer notes</h3>
                        <ul>
                          ${x.devNotes.map(s => `<li>${esc(s)}</li>`).join("")}
                        </ul>
                      </section>`
                    : ""
                }
              </div>
            </div>
          </div>
        </li>
      `;
      })
      .join("");

    return `
      <section id="cat-${c.id}" aria-label="${esc(c.label)}">
        <h2 class="srOnly">${esc(c.label)}</h2>
        <ul class="list" data-list>${lis}</ul>
      </section>
    `;
  }).join("");

  const totalCount = CHECKS.length;

  return `
    <a class="skipLink" href="#content">Skip to checklist</a>

    <div class="shell">
      <div class="frame">
        <div class="layout">
          <aside class="sidebar" aria-label="Checklist navigation">
            <div class="sideInner">
              <div class="brand">
                <p class="brandTitle">A11Y Developer Checklist</p>
                <p class="brandSub">
                  Manual checks you run on your own work before merge. Each item includes how to test, what passing looks like, and the most common developer fixes.
                </p>
              </div>

              <div class="sideGroup" aria-label="Table of contents">
                <h2>Table of contents</h2>
                <ul class="toc" id="toc">${toc}</ul>
              </div>

              <div class="metaCard" aria-label="Progress">
                <div class="progressWrap" aria-hidden="true">
                  <div class="progressBar" id="progressBar"></div>
                </div>
                <div class="countRow">
                  <span id="progressText">0 of ${totalCount} done</span>
                  <button type="button" class="resetBtn" id="resetBtn">Reset</button>
                </div>
              </div>
            </div>
          </aside>

          <main id="content" class="content" aria-label="Accessibility testing checklist">
            <header class="mainHeader">
              <h1>Manual A11Y checks for devs</h1>
              <p>
                Use keyboard only, zoom to 200%, test reflow at 320px width, and validate at least one critical flow with a screen reader.
                Automated tools help, but they miss keyboard behavior, focus issues, and many form failures.
              </p>
              <div class="hintRow" aria-label="Test mode hints">
                <span class="hintPill"><strong>Keyboard</strong> Tab, Shift+Tab, Enter, Space, arrows</span>
                <span class="hintPill"><strong>Zoom</strong> 200%</span>
                <span class="hintPill"><strong>Reflow</strong> 320px wide</span>
                <span class="hintPill"><strong>SR</strong> one critical flow</span>
              </div>
            </header>

            ${sections}
          </main>
        </div>
      </div>
    </div>
  `;
}

function init() {
  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = render();

  const root = document.getElementById("content");
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");
  const resetBtn = document.getElementById("resetBtn");
  const toc = document.getElementById("toc");

  function allItems() {
    return root.querySelectorAll("[data-item]");
  }

  function setExpanded(btn, panel, expanded) {
    btn.setAttribute("aria-expanded", expanded ? "true" : "false");
    const labelSpan = btn.querySelector("span");
    if (labelSpan) labelSpan.textContent = expanded ? "Close" : "Open";
    panel.hidden = !expanded;
  }

  function closeOthers(currentBtn) {
    const toggles = root.querySelectorAll(".toggle");
    toggles.forEach(btn => {
      if (btn !== currentBtn) {
        const panelId = btn.getAttribute("aria-controls");
        const panel = document.getElementById(panelId);
        if (panel) setExpanded(btn, panel, false);
      }
    });
  }

  function updateProgress() {
    const items = allItems();
    const total = items.length;
    let done = 0;

    items.forEach(item => {
      const box = item.querySelector(".doneBox");
      if (box && box.getAttribute("aria-pressed") === "true") done += 1;
    });

    const pct = total ? Math.round((done / total) * 100) : 0;
    progressBar.style.width = pct + "%";
    progressText.textContent = done + " of " + total + " done";
  }

  root.addEventListener("click", e => {
    const toggleBtn = e.target.closest(".toggle");
    if (toggleBtn) {
      const panelId = toggleBtn.getAttribute("aria-controls");
      const panel = document.getElementById(panelId);
      if (!panel) return;
      const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
      closeOthers(toggleBtn);
      setExpanded(toggleBtn, panel, !expanded);
      return;
    }

    const doneBox = e.target.closest(".doneBox");
    if (doneBox) {
      const pressed = doneBox.getAttribute("aria-pressed") === "true";
      doneBox.setAttribute("aria-pressed", pressed ? "false" : "true");
      updateProgress();
    }
  });

  root.addEventListener("keydown", e => {
    const isEscape = e.key === "Escape";
    if (!isEscape) return;

    const openBtn = root.querySelector('.toggle[aria-expanded="true"]');
    if (openBtn) {
      const panelId = openBtn.getAttribute("aria-controls");
      const panel = document.getElementById(panelId);
      if (panel) setExpanded(openBtn, panel, false);
      openBtn.focus();
    }
  });

  resetBtn.addEventListener("click", () => {
    allItems().forEach(item => {
      const box = item.querySelector(".doneBox");
      if (box) box.setAttribute("aria-pressed", "false");
    });

    const openBtn = root.querySelector('.toggle[aria-expanded="true"]');
    if (openBtn) {
      const panelId = openBtn.getAttribute("aria-controls");
      const panel = document.getElementById(panelId);
      if (panel) setExpanded(openBtn, panel, false);
    }

    updateProgress();
    resetBtn.focus();
  });

  if (toc) {
    const links = toc.querySelectorAll("[data-toc]");
    const setCurrent = () => {
      const fromTop = window.scrollY + 120;
      let best = null;

      links.forEach(a => {
        const id = a.getAttribute("href").slice(1);
        const section = document.getElementById(id);
        if (!section) return;
        const top = section.getBoundingClientRect().top + window.scrollY;
        if (top <= fromTop) best = a;
      });

      links.forEach(a => {
        if (a === best) a.setAttribute("aria-current", "page");
        else a.removeAttribute("aria-current");
      });
    };

    window.addEventListener("scroll", setCurrent, { passive: true });
    setCurrent();
  }

  updateProgress();
}

init();
