import React from 'react';
import AppContext from '../lib/app-context';

const styles = {
  image: {
    height: '280px',
    objectFit: 'contain'
  },
  textBox: {
    backgroundColor: '#0096c7',
    borderRadius: '10px'
  },
  dots: {
    cursor: 'pointer'
  }
};

export default class ForSale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: []
    };
  }

  componentDidMount() {
    fetch('/api/auth/sales')
      .then(res => res.json())
      .then(sales => this.setState({ sales }));
  }

  render() {
    return (
      <div className='container py-4'>
        <h1>Books for Sale and Trade</h1>
        <hr/>
        <div className='container bg-light p-4 rounded-3'>
          <div className='row'>
            {
            this.state.sales.map(sale => (
              <div key={sale.saleId} className="col-12 col-md-6 col-lg-4">
                <Sale sale={sale}/>
              </div>
            ))
          }
          </div>
        </div>
      </div>
    );
  }
}

class Sale extends React.Component {

  render() {
    const { user } = this.context;
    const { userId, saleTitle, salePhotoFile, saleContent, isbn, city, state } = this.props.sale;
    if (!user) {
      return (
        <div className='card mb-4 shadow-sm'>
          <img className='card-img-top py-3 bg-secondary' src={salePhotoFile} alt={saleTitle} style={styles.image}/>
          <div className='card-body'>
            <h5 className='card-title'>{saleTitle}</h5>
            <h6 className='card-text text-secondary'>{`ISBN: ${isbn}`}</h6>
            <div style={styles.textBox}>
              <p className='text-white p-3'>{saleContent}</p>
            </div>
            <p className='card-text text-secondary text-end'>{`${city}, ${state}`}</p>
          </div>
        </div>
      );
    } else if (user.userId !== userId) {
      return (
        <div className='card mb-4 shadow-sm'>
          <img className='card-img-top py-3 bg-secondary' src={salePhotoFile} alt={saleTitle} style={styles.image} />
          <div className='card-body'>
            <h5 className='card-title'>{saleTitle}</h5>
            <h6 className='card-text text-secondary'>{`ISBN: ${isbn}`}</h6>
            <div style={styles.textBox}>
              <p className='text-white p-3'>{saleContent}</p>
            </div>
            <p className='card-text text-secondary text-end'>{`${city}, ${state}`}</p>
          </div>
        </div>
      );
    } else if (user.userId === userId) {
      return (
        <div className='card mb-4 shadow-sm'>
          <img className='card-img-top py-3 bg-secondary' src={salePhotoFile} alt={saleTitle} style={styles.image} />
          <div className='card-body'>
            <div className='d-flex justify-content-end'>
              <i className="fa-solid fa-ellipsis fs-3" style={styles.dots} />
            </div>
            <h5 className='card-title'>{saleTitle}</h5>
            <h6 className='card-text text-secondary'>{`ISBN: ${isbn}`}</h6>
            <div style={styles.textBox}>
              <p className='text-white p-3'>{saleContent}</p>
            </div>
            <p className='card-text text-secondary text-end'>{`${city}, ${state}`}</p>
          </div>
        </div>
      );
    }
  }
}
Sale.contextType = AppContext;