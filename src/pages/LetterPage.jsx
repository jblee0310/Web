import Header from '../components/Header';
import './LetterPage.css';

function LetterPage() {
  return (
    <>
      <Header />
      <div className="letter-page-container">
        <div className="letter-content">
          <h1>To My Dearest,</h1>
          <p>
            안녕하세요 write your beautiful letter. You can have
            multiple paragraphs by just adding more `p` tags.
          </p>
          <p>
            Every moment with you feels like a page from a story I never
            want to end. From our first conversation to this very day, you've
            filled my life with a kind of joy I didn't know was possible.
          </p>
          <p>
            Thank you for being you.
          </p>
          <div className="signature">
            With all my love,
            <br />
            [Your Name]
          </div>
        </div>
      </div>
    </>
  );
}

export default LetterPage;