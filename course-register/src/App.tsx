import React, { useState } from "react";
import "./styles.css";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbygxWfpbJ4FlnvlYrH5CK7q_ZiQE5c5Uz-nbUX21aV7i1YU5j7dS5jvpLRcfBrEeod5-g/exec";

export default function LeadCaptureForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<
    "success" | "error" | "info" | ""
  >("");
  const [loading, setLoading] = useState(false);
  const [declined, setDeclined] = useState(false);

  async function handleSubmit(e: <HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim()) {
      setStatus("Please enter your email address.");
      setStatusType("error");
      return;
    }

    setLoading(true);
    setStatus("");
    setStatusType("");

    try {
      const formData = new URLSearchParams();
      formData.append("email", email.trim());
      formData.append("course", "General Course Interest");

      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      setStatus(
        "Your submission has been sent. Thank you for your interest in G. Robotics!"
      );
      setStatusType("success");
      setEmail("");
    } catch (error) {
      console.error("Submission error:", error);
      setStatus(
        "Unable to send your request. Please check your connection and try again."
      );
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  }

  function handleDecline() {
    setDeclined(true);
    setStatus("");
    setStatusType("");
  }

  return (
    <main className="page-wrapper">
      <div className="background-decoration decoration-one" />
      <div className="background-decoration decoration-two" />

      <section className="form-card">
        <header className="brand-header">
          <img src="/logo.png" alt="G. Robotics Logo" className="brand-logo" />
          <div className="brand-name">G. ROBOTICS</div>
          <div className="brand-tagline">
            LEARN <span>•</span> BUILD <span>•</span> INNOVATE
          </div>
        </header>

        <div className="form-content">
          {!declined ? (
            <>
              <div className="eyebrow">
                <span className="eyebrow-line" />
                STAY CONNECTED
                <span className="eyebrow-line" />
              </div>

              <h1>Course Interest</h1>

              <p className="description">
                Enter your email and let us know if you'd like to be informed
                when our next robotics and AI courses launch.
              </p>

              <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email Address</label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  autoComplete="email"
                />

                <p className="question">Are you interested?</p>

                <div className="button-group">
                  <button
                    type="submit"
                    className="button button-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner" />
                        Submitting...
                      </>
                    ) : (
                      "Yes, I'm in"
                    )}
                  </button>

                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={handleDecline}
                    disabled={loading}
                  >
                    No, thanks
                  </button>
                </div>
              </form>

              {status && (
                <div className={`status-message ${statusType}`} role="status">
                  {status}
                </div>
              )}
            </>
          ) : (
            <div className="thank-you">
              <div className="thank-you-icon">✓</div>
              <h1>No problem!</h1>
              <p className="description">
                Thank you for visiting G. Robotics. You're always welcome to
                explore our future courses and projects.
              </p>
              <button
                className="button button-primary back-button"
                onClick={() => setDeclined(false)}
              >
                Go back
              </button>
            </div>
          )}
        </div>
      </section>

      <footer className="form-footer">
        <div className="footer-heading">CONNECT WITH US</div>

        <div className="footer-links">
          <a
            href="https://gnepal.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Website
          </a>

          <span className="footer-dot">•</span>

          <a
            href="https://www.instagram.com/grobotics071/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>

          <span className="footer-dot">•</span>

          <a href="mailto:info@gnepal.org">Email</a>
        </div>

        <div className="copyright">
          © {new Date().getFullYear()} G. Robotics. All rights reserved.
        </div>
      </footer>

      <div className="page-caption">
        POWERED BY INNOVATION <span>•</span> BUILT FOR THE FUTURE
      </div>
    </main>
  );
}
