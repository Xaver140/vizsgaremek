export default function Footer() {
  
  return (
    <footer className="bg-dark text-white mt-5 pt-4 border-top border-secondary">

      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-3">
            <h5>Elérhetőségek</h5>
            <p>Email:{" "}<a href="mailto:csak@minta.hu" className="text-white text-decoration-underline">csak@minta.hu</a></p>
            <p>Telefon: +36 1 234 5678</p>
            <p>Cím: Budapest, Bandi utca 11, Magyarország</p>
          </div>
          <div className="col-md-6 mb-3">
            <h5>Kövess minket</h5>

            <p><a href="https://www.facebook.com" target="_blank" className="text-white text-decoration-none"><i className="bi bi-facebook me-2"></i>Facebook</a></p>
            <p><a href="https://www.instagram.com" target="_blank" className="text-white text-decoration-none"><i className="bi bi-instagram me-2"></i>Instagram</a></p>
          </div>
        </div>
        <div className="text-center border-top border-secondary pt-3 mt-3">
          <small>Minden jog fenntartva © {new Date().getFullYear()}</small>
        </div>
      </div>

    </footer>
  );
}