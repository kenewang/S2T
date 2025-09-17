import { useEffect } from "react";
import "./RightNav.css";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import withReactContent from "sweetalert2-react-content";
const RightNav = ({ isOpen, closeRightNav, rightNavRef }) => {
  const succesSwal = withReactContent(Swal);
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event) => {
      const justOpened =
        performance.now() - rightNavRef.current?.dataset?.openedAt < 50;
      if (justOpened) return;

      const clickedInside = rightNavRef.current?.contains(event.target);
      const clickedMenuImage = event.target?.closest?.("img");

      if (!clickedInside && !clickedMenuImage) closeRightNav();
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen, closeRightNav, rightNavRef]);

  if (isOpen && rightNavRef.current) {
    rightNavRef.current.dataset.openedAt = performance.now();
  }

  const showRatingPopup = () => {
    Swal.fire({
      title: "Rate File!",
      html: `
      <div id="star-container" style="font-size: 1.5rem; color: gray;">
        <i class="fa fa-star" data-value="1"></i>
        <i class="fa fa-star" data-value="2"></i>
        <i class="fa fa-star" data-value="3"></i>
        <i class="fa fa-star" data-value="4"></i>
        <i class="fa fa-star" data-value="5"></i>
      </div>
      <button id="submit-rating" class="rating-submit-btn">
        Submit Rating
      </button>
    `,
      showConfirmButton: false,
      customClass: {
        popup: "rating-popup", // 👈 add custom class to the popup
        title: "rating-title", // 👈 custom class for the title if you need
      },
      didOpen: () => {
        const stars = Swal.getPopup().querySelectorAll("#star-container i");
        let selected = 0;

        stars.forEach((star) => {
          star.addEventListener("click", () => {
            selected = parseInt(star.getAttribute("data-value"));
            stars.forEach((s) => (s.style.color = "gray"));
            for (let i = 0; i < selected; i++) {
              stars[i].style.color = "orange";
            }
          });
        });

        const submitBtn = Swal.getPopup().querySelector("#submit-rating");
        if (submitBtn) {
          submitBtn.addEventListener("click", () => {
            Swal.close();
            if (selected > 0) {
              console.log("User rating:", selected);
              showSuccessAlert();
              fetch("/api/rating", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rating: selected }),
              });
            }
          });
        }
      },
    });
  };

  const showSuccessAlert = () => {
    succesSwal.fire({
      title: "Success!",
      text: "Rating Submitted",
      icon: "success",
      showConfirmButton: false,
      customClass: {
        popup: "success-popup_for_rating",
        title: "success-pop-up-title",
        confirmButton: "success-button-confirm",
      },
    });
  };

  return (
    <div
      id="rightSidenav"
      ref={rightNavRef}
      className="sidenav right-sidenav"
      style={{ width: isOpen ? "130px" : "0px" }}
      aria-hidden={!isOpen}
    >
      <a
        className="rightNavAnchor"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          showRatingPopup();
        }}
      >
        Rate
      </a>
    </div>
  );
};
export default RightNav;
