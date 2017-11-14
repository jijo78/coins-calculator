import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Form from './form';
import '../scss/main.scss';

export default class App extends Component {
	 constructor(props) {
    super(props);

    this.state = {
      currencyValue: [],
			inputValue: '',
      currencyNames: ['x £2', 'x £1', 'x 50p', 'x 20p', 'x 10p', 'x 5p', 'x 2p', 'x 1p'],
      error : {}
    };

    this.submit = this.submit.bind(this);
    this.calculateValue = this.calculateValue.bind(this);
    this.validate = this.validate.bind(this);
		this.renderResults = this.renderResults.bind(this);
	}

	/**
	 * [ validate: validate input before submitting it ]
	 * @param  {[number]} value          [ Value of the input field when submit form ]
	 * @param  {[number]} normalizeInput [ Check for dots in number to determine,
	  	whether it is a decimal number, and adjust value accordingly]
	 */
  validate(value, normalizeInput){

    // £? optional pound sign at the beginning of the string,
    // (\d+) only digits allowed
    // ([.,]?\d{1,5}) optional dot allowed after first set of numbers
    // p?$ optional p at the end of the number
     const validateInput = /^£?(\d+)([.,]?\d{1,5})p?$/;

     if(validateInput.test(value)){
       //[^\d\.]/ strip all non numeric characters and return only numbers,
       //e.g £12.45 = 12.45, 2345p = 2345;
       let parsedValue = parseFloat(value.replace(/[^\d\.]/, ''));

			 //lets always deal with the amount in pennies;
			 let normalizeInput = parsedValue.toString().indexOf('.') === -1 ? parsedValue : parsedValue * 100;

       this.calculateValue(value,normalizeInput);

     }else{
       this.setState({
         error: {
           message: 'Please make sure you enter a valid input e.g 54.04, 2000, £23.33, 001.41p'
         },
         currencyValue:[]
       })
     }
  }

	/**
	 * [ calculateValue: divide the value by each coins amount and return the quantity agains it. ]
	 * @param  {[type]} value  [ Value of the input field when form is submitted ]
	 * @param  {[type]} normalizeInput [ To have the right
	 * breakdown of the total amount, the use of the modulus operator help in
	 * making sure, each coin amount it is divided by the remainder of each
	 * previous division. If didn't use this method the it would always divide
	 * the amounts by initial value]
	 */
  calculateValue(value, normalizeInput){
    let currencyValues = [];
    const twoPounds = 200,
          onePound = 100,
          fiftyPence = 50,
          twentyPence = 20,
          tenPence = 10,
          fivePence = 5,
          twoPence = 2,
          oneP = 1;

     let   twoPoundAmount =  parseInt(normalizeInput / twoPounds);
     normalizeInput = parseInt(normalizeInput % twoPounds);
     let   onePoundAmount =  parseInt(normalizeInput / onePound);
     normalizeInput = parseInt(normalizeInput % onePound);
     let   fiftyPenceAmount =  parseInt(normalizeInput / fiftyPence);
     normalizeInput = parseInt(normalizeInput % fiftyPence);
     let   twentyPenceAmount =  parseInt(normalizeInput / twentyPence);
     normalizeInput = parseInt(normalizeInput % twentyPence);
     let   tenPenceAmount =  parseInt(normalizeInput / tenPence);
     normalizeInput = parseInt(normalizeInput % tenPence);
     let   fivePenceAmount =  parseInt(normalizeInput / fivePence);
     normalizeInput = parseInt(normalizeInput % fivePence);
     let   twoPenceAmount =  parseInt(normalizeInput / twoPence);
     normalizeInput = parseInt(normalizeInput % twoPence);
     let   onePAmount =  parseInt(normalizeInput / oneP);
     normalizeInput = parseInt(normalizeInput % oneP);

     currencyValues[0] = twoPoundAmount;
     currencyValues[1] = onePoundAmount;
     currencyValues[2] = fiftyPenceAmount;
     currencyValues[3] = twentyPenceAmount;
     currencyValues[4] = tenPenceAmount;
     currencyValues[5] = fivePenceAmount;
     currencyValues[6] = twoPenceAmount;
     currencyValues[7] = onePAmount;

     this.setState({
       error:{
         message: ''
       },
       currencyValue: currencyValues
     })
 }

	/**
	 * [ submit the form ]
	 * @param  {[event]} e [event object]
	 */
  submit(e){
    e.preventDefault();
    const searchValue = document.querySelector('.search__input');
    this.validate(searchValue.value);
		this.setState({
			inputValue: searchValue.value
		})
		searchValue.value = '';
  }

	renderResults(){
		const currencyValue = this.state.currencyValue;
		const currencyNames = this.state.currencyNames;
		const inputValue = this.state.inputValue;

		return (
			<article>
				{
	        inputValue && !this.state.error.message ? (
	          <h3>Your breakdown for { inputValue } is:</h3>
	        ) : (
	          <h3></h3>
	        )
	      }
				<ul className="search__results">
					{currencyValue.map((val,i)=> <li key={i}>{val} <span>{currencyNames[i]}</span></li>)}
				</ul>
			</article>
		)
	}

  render() {
    return (
			<main className="main">
				<section className="search">
					<h1>Welcome to the Pound breaker</h1>
					<h2>Use the below to calculate:</h2>
					<Form onSubmit={this.submit} error={this.state.error} />
					{this.renderResults()}
				</section>
			</main>
    );
  }
}
