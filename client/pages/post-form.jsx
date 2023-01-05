import React from 'react';
import AppContext from '../lib/app-context';

export default class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: 'https://www.kurin.com/wp-content/uploads/placeholder-square.jpg',
      title: '',
      isbn: '',
      comments: '',
      postType: 'sale'
    };
    this.fileInputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    if (this.state.image !== 'https://www.kurin.com/wp-content/uploads/placeholder-square.jpg') {
      this.setState({ image: React.createRef(event.target.files[0].name) });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { user } = this.context;
    const formData = new FormData();
    formData.append('image', this.fileInputRef.current.files[0]);
    formData.append('title', this.state.title);
    formData.append('isbn', this.state.isbn);
    formData.append('comments', this.state.comments);
    formData.append('userId', user.userId);
    fetch('/api/auth/wanted-post', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ title: '' });
        this.setState({ isbn: '' });
        this.setState({ comments: '' });
        this.setState({ postType: 'sale' });
        this.fileInputRef.current.value = null;
      })
      .catch(err => console.error(err));
    window.location.hash = '';
  }

  render() {
    return (
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <h1 className='text-center my-5'>Create or Edit your Post!</h1>
        <div className='d-flex justify-content-around align-items-center bg-light rounded-3 w-50'>
          <div className='col-3 mx-4'>
            <img className='w-100 h-100 border border-secondary rounded-3' src={this.state.image} alt="post-image" />
          </div>
          <div className='col-6 my-3'>
            <form className='post-form m-4' onSubmit={this.handleSubmit}>
              <div>
                <div>
                  <label htmlFor="title" className='form-label mt-2'>Title</label>
                  <input
                required
                autoFocus
                id='title'
                name='title'
                type="text"
                onChange={this.handleChange}
                className="form-control w-75" />
                </div>
                <div>
                  <label htmlFor="isbn" className='form-label mt-2'>ISBN (i.e.: xxx-x-xx-xxxxxx-x)</label>
                  <input
                  required
                  type="text"
                  name="isbn"
                  id="isbn"
                  onChange={this.handleChange}
                  className="form-control w-75" />
                </div>
                <div>
                  <label htmlFor="comments" className='form-label mt-2'>Comments</label>
                  <textarea
                  required
                  name="comments"
                  id="comments"
                  maxLength="225"
                  onChange={this.handleChange}
                  className="form-control w-100" />
                </div>
                <div className='input-group d-flex justify-content-around w-50 my-4'>
                  <div>
                    <label htmlFor="sale" className='form-label me-2'>For Sale</label>
                    <input
                  defaultChecked
                  value='sale'
                  name='postType'
                  id='postType'
                  onChange={this.handleChange}
                  type="radio"
                  className='form-check-input' />
                  </div>
                  <div>
                    <label htmlFor="want" className='form-label me-2'>Wanted</label>
                    <input
                    value='want'
                    name="postType"
                    id="postType"
                    onChange={this.handleChange}
                    type="radio"
                    className='form-check-input' />
                  </div>
                </div>
                <div>
                  <div>
                    <label htmlFor="image-upload" className='form-label'>Image Upload</label>
                  </div>
                  <input
                  required
                  type="file"
                  name='image'
                  ref={this.fileInputRef}
                  onChange={this.handleChange}
                  accept=".png, .jpg, .jpeg" />
                </div>
                <div className='d-flex justify-content-end w-100'>
                  <button type='submit' className='btn btn-outline-info'>Submit Post</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
PostForm.contextType = AppContext;