import { useState } from "react";
import {
  useFloating, //figures out position
  offset, //adds space between button and popup
  flip, //moves popup to another side if there’s no space
  shift, //nudges popup back inside the screen
  autoUpdate, //keeps it stuck to the button when things change
  useClick,
  useDismiss,
  useRole,
  useInteractions,
} from "@floating-ui/react";
import "./GradePopover.css";

const GradePopover = ({ onSelect, buttonLabel = "VIEW BY GRADE" }) => {
  const [open, setOpen] = useState(false);

  /* useFloating return "refs" (connectors), inside refs are 
  two functions setReference and setFloating, refs.setReference
  goes to the button and refs.setFloating goes to the popup 
  
  useFloating returns floatingStyles(magic positioning)*/

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom", //Put the popup below the button,
    middleware: [
      offset(6), // leave 6px space between button and popup
      flip(), // If there’s no space at the bottom, move the popup to the top
      shift({ padding: 8 }), // If part of the popup would go off-screen, push it back inside
    ],
    whileElementsMounted: autoUpdate, // This tells Floating UI:
    /* “While the button and popup exist, keep re-calculating position when:
       - the page scrolls

       -the window resizes

       -the user zooms in/out

       -fonts/layout change” */
  });

  // Interactions
  const click = useClick(context);
  const dismiss = useDismiss(context); // ✅ click outside
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const handleSelect = (value) => {
    onSelect(value);

    setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  return (
    <>
      {/* Trigger */}
      <button
        ref={refs.setReference} //returned useFloating function pointing to button
        className="grade-landingPage"
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        {buttonLabel}
      </button>

      {/* Popover */}
      {open && (
        <div
          ref={refs.setFloating} //returned useFloating function pointing to popup
          className="popup-grades"
          style={floatingStyles} //use returned useFloating styles
        >
          <h3 className="popup-grades-title">Grade</h3>

          <div className="popup-grades-options">
            <label>
              <input
                type="radio"
                name="grade"
                value="primary"
                onChange={(e) => handleSelect(e.target.value)}
              />
              R - 7
            </label>

            <label>
              <input
                type="radio"
                name="grade"
                value="secondary"
                onChange={(e) => handleSelect(e.target.value)}
              />
              8 - 12
            </label>

            <label>
              <input
                type="radio"
                name="grade"
                value="tertiary"
                onChange={(e) => handleSelect(e.target.value)}
              />
              Tertiary
            </label>
          </div>
        </div>
      )}
    </>
  );
};

export default GradePopover;
