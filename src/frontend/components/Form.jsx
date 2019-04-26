import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  constructor(props) {
    super(props);

    let initialState = {};
    props.body.map(element => {
      initialState[element.label] = element.defaultValue || '';
    });
    this.createElement = this.createElement.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);

    this.state = initialState;
  }

  createElement(element) {
    switch (element.class) {
      case 'input':
        return (
          <input
            className="form-control"
            onChange={this.onChange}
            value={this.state[element.label]}
            name={element.label}
            type={element.type}
            placeholder={element.placeholder}
          />
        );
    }
  }

  submit(e) {
    this.props.submit(e, this.state);
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          {this.props.body.map((element, index) => {
            return (
              <div key={index} className="pb-3">
                <label>{element.label}</label>
                {this.createElement(element)}
              </div>
            );
          })}
          <button className="btn btn-success" type="submit">
            {this.props.submitLabel || 'Submit'}
          </button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  body: PropTypes.array,
  submit: PropTypes.func,
  submitLabel: PropTypes.string,
};

export default Form;
