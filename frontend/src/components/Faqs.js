import { useState, useEffect } from "react";

import Header from "./Header";
import LeftNav from "./LeftNav";

import "./Faqs.css";

const Faqs = ({
  leftNavOpen,
  closeLeftNav,
  leftNavRef,
  isAuthenticated,
  setAuth,
  onRatingSubmitted,

  openLeftNav,
}) => {
  const [items, setItems] = useState([]);

  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // if the clicked item is already open, close it
    } else {
      setOpenIndex(index); // if it’s a different item, open that one
    }
  };

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const [questionsRes, answersRes] = await Promise.all([
          fetch("http://localhost:8081/faqs/questions"),
          fetch("http://localhost:8081/faqs/answers"),
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
    <div>
      <Header
        showSearchLogo={false} //hide the search icon
        leftNavOpen={leftNavOpen}
        openLeftNav={openLeftNav}
        // Pass other props if you need search/right nav to work:
        openSearch={() => {}}
        rightNavOpen={false}
        closeRightNav={() => {}}
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
        <p>Contact</p>
        <p>&copy; 2025 Share2Teach</p>
      </div>
    </div>
  );
};

export default Faqs;
