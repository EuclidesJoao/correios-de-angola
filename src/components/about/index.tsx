import "./index.css";

export const About = () => {
  return (
    <div className="about mb-5">
      <div className="overflow">
        <div className="container d-flex justify-content-between content">
          <section className="mb-3">
            <h3>Fundado em 1798</h3>
            <p>Tudo por si</p>
          </section>

          <section className="mb-3">
            <div className="d-flex align-items-center">
              <h3>64</h3>
              <h3 className="plus">+</h3>
            </div>
            <p>Balcões</p>
          </section>
          
          <section className="mb-3">
            <div className="d-flex align-items-center">
              <h3>622</h3>
              <h3 className="plus">+</h3>
            </div>
            <p>Funcionárias</p>
          </section>
          
          <section className="mb-3">
            <div className="d-flex align-items-center">
              <h3>1559567</h3>
              <h3 className="plus">+</h3>
            </div>
            <p>Clientes</p>
          </section>
        </div>
      </div>
    </div>
  );
};
