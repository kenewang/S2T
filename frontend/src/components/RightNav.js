import { useEffect } from "react";
import "./RightNav.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import withReactContent from "sweetalert2-react-content";

const RightNav = ({
  rightNavOpen,
  closeRightNav,
  rightNavRef,
  activeFileId,
  onRatingSubmitted,
  isAuthenticated,
}) => {
  const succesSwal = withReactContent(Swal);

  useEffect(() => {
    if (!rightNavOpen) return;

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
  }, [rightNavOpen, closeRightNav, rightNavRef]);

  if (rightNavOpen && rightNavRef.current) {
    rightNavRef.current.dataset.openedAt = performance.now();
  }

  const showReportPopup = async () => {
    const result = await Swal.fire({
      title: "Report Document",
      input: "text",
      inputPlaceholder: "Reason",
      showCancelButton: true,
      confirmButtonText: "Submit",
      allowOutsideClick: false, // ❌ don't close when clicking outside
      allowEscapeKey: false, // ❌ don't close when
      // pressing ESC

      customClass: {
        popup: "rating-popup",
        title: "rating-title",
      },
    });

    if (result.isConfirmed && result.value?.trim()) {
      console.log("User typed:", result.value);
      try {
        const reportRes = await fetch(
          "http://localhost:8081/reports/document",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              jwt_token: localStorage.getItem("token"), // ✅ include token if logged in
            },
            body: JSON.stringify({
              file_id: activeFileId,
              reason: result.value,
            }),
          }
        );

        if (!reportRes.ok) {
          console.error("Server returned", reportRes.status);
        } else {
          showSuccessAlertReport();
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    } else {
      console.log("No input or canceled");
    }
  };

  const showRatingPopup = () => {
    // 🛑 SAFEGUARD: prevent opening if no active file is selected
    if (!activeFileId) {
      Swal.fire({
        title: "No file selected",

        text: "Please click a file's menu (three dots) before rating.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

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
        popup: "rating-popup",
        title: "rating-title",
      },
      didOpen: () => {
        console.log("Rating popup opened for file:", activeFileId);
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
          submitBtn.addEventListener("click", async () => {
            Swal.close();
            if (selected > 0) {
              try {
                const response = await fetch(
                  "http://localhost:8081/rate-file",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },

                    body: JSON.stringify({
                      file_id: activeFileId,
                      rating: selected,
                    }),
                  }
                );

                if (!response.ok) {
                  console.error("Server returned", response.status);
                } else {
                  const data = await response.json();
                  console.log("Rating response:", data);
                }

                showSuccessAlert();

                if (typeof onRatingSubmitted === "function") {
                  onRatingSubmitted();
                }
              } catch (error) {
                console.error("Error submitting rating:", error);
              }
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
      timer: 2500,
    });
  };
  const showSuccessAlertReport = () => {
    succesSwal.fire({
      title: "Success!",
      text: "Report Submitted",
      icon: "success",
      showConfirmButton: false,
      customClass: {
        popup: "success-popup_for_rating",
        title: "success-pop-up-title",
        confirmButton: "success-button-confirm",
      },
      timer: 2500,
    });
  };

  return (
    <div
      id="rightSidenav"
      ref={rightNavRef}
      className={`sidenav right-sidenav ${rightNavOpen ? "open" : ""}`}
      aria-hidden={!rightNavOpen}
    >
      <a
        className="rightNavAnchor"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          showRatingPopup();
        }}
      >
        • Rate
      </a>
      {isAuthenticated && (
        <a
          className="rightNavAnchor"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            showReportPopup();
          }}
        >
          • Report
        </a>
      )}
    </div>
  );
};

export default RightNav;
