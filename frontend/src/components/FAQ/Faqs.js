import { useState, useEffect } from "react";

import FaqHeader from "./FaqHeader";
import LeftNav from "../LeftNav";

import "./Faqs.css";

const Faqs = ({
  leftNavOpen,
  closeLeftNav,
  leftNavRef,
  isAuthenticated,
  setAuth,
  onRatingSubmitted,
  openLeftNav,
  openSearch,
  rightNavOpen,
  closeRightNav,
}) => {
  const [items, setItems] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL;

  const [openIndex, setOpenIndex] = useState(null);
  const toggleItem = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // if the clicked item is already open, close it
    } else {
      setOpenIndex(index); // if it’s a different item, open that one
    }
  };

  useEffect(() => {
    document.title = "Share2Teach - FAQs";
    const fetchFaqs = async () => {
      try {
        const [questionsRes, answersRes] = await Promise.all([
          fetch(`${API_URL}/faqs/questions`, {
            method: "GET",
          }),
          fetch(`${API_URL}/faqs/answers`, {
            method: "GET",
          }),
        ]);

        const questions = await questionsRes.json();
        const answers = await answersRes.json();

        // Combine into an array of objects like before
        const combined = questions.map((q, index) => ({
          title: q,
          content: answers[index] || "No answer available",
        }));

        setItems(combined);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFaqs();
  }, []); // runs once when component mounts

  return (
    <div className="faqWrapper">
      <FaqHeader
        leftNavOpen={leftNavOpen}
        openLeftNav={openLeftNav}
        openSearch={openSearch}
        rightNavOpen={rightNavOpen}
        closeRightNav={closeRightNav}
      />
      <LeftNav
        leftNavOpen={leftNavOpen}
        closeLeftNav={closeLeftNav}
        leftNavRef={leftNavRef}
        isAuthenticated={isAuthenticated}
        setAuth={setAuth}
        onRatingSubmitted={onRatingSubmitted}
      />

      <section className="accordion">
        {items.map((item, idx) => (
          <div
            className={`accordion-item ${openIndex === idx ? "is-open" : ""}`} //checks if the index (idx) of the item is equal to the openIndex, if so add ".is-open css class" next to ".accordion-item"
            key={idx}
          >
            <header
              className="accordion-header"
              onClick={() => toggleItem(idx)}
            >
              <span className="accordion-title">{item.title}</span>
              <span className="accordion-icon">
                {openIndex === idx ? "−" : "+"}
              </span>
            </header>

            <div className="accordion-content">
              <p className="accordion-description">{item.content}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="faqFooter">
        <p>&copy; 2025 Share2Teach</p>
      </div>
    </div>
  );
};

export default Faqs;
