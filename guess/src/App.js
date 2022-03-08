import React, { useState } from 'react';
import './App.css';
import verseToDayMapping from './verseToDayMapping';

const KJVPCE = require('./KJVPCE.json');

function App() {
  const [ guesses, setGuesses ] = useState([]);
  const [ book, setBook ] = useState(0);
  const [ chapter, setChapter ] = useState(0);
  const [ verse, setVerse ] = useState(0);
  const books = Object.keys( KJVPCE.books );
  const allVerses = books.map( book => KJVPCE.books[ book ].map( ( chapter, chapterNumber ) => chapter.map( ( verse, verseNumber ) => { return { verse, reference: [ book, chapterNumber, verseNumber ] }; } ) ).flat() ).flat();
  const daysSinceEpoch = Math.floor( new Date().getTime() / 1000 / 60 / 60 / 24 );
  const todaysNumber = daysSinceEpoch % allVerses.length;
  const verseNumber = verseToDayMapping[ todaysNumber ];
  const todaysVerse = allVerses[ verseNumber ];
  const guessRef = React.createRef();

  function relativeCoords ( event ) {
    var bounds = event.target.getBoundingClientRect();
    var x = event.clientX - bounds.left + 1;
    var y = event.clientY - bounds.top;
    x =  Math.floor( Math.min( Math.max( x, 1 ), bounds.width ) );
    y =  Math.floor( Math.min( Math.max( y, 0 ), bounds.height ) );

    return {x: x, y: y};
  }

  const onMove = ( event ) => {
    const coords = relativeCoords( event );
    const number = Math.floor( Math.min( coords.x + ( coords.y * 100 ), allVerses.length - 1 ) );
    console.log( guessRef.current.style);
    guessRef.current.innerText = allVerses[ number ] && allVerses[ number ].reference.join('.');;
  }

  const submitForm = ( event ) => {
    event.preventDefault();
    const guessNumber = allVerses.findIndex( ( { reference } ) => reference[0] === book && reference[1] === chapter && reference[2] === verse );
    setGuesses( [ ...guesses, guessNumber ] );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Guess the verse</h1>
        <p>{ todaysVerse.verse.map( words => words[ 0 ]).join(' ') }</p>
        <div className="guesser" onTouchMove={ onMove } onMouseMove={ onMove }>
          <div ref={ guessRef }></div>
        </div>
        <form onSubmit={ submitForm }>
          <select name="book" onChange={( event )=>{ setBook( event.target.value)} }>
            <option>Select a book</option>
            { books.map( ( book, index ) => {
              return <option key={index}>{ book }</option>
            } ) }
          </select>
          <select name="chapter" onChange={( event )=>{ setChapter( parseInt( event.target.value ) ) } }>
            <option>Select a chapter</option>
            { KJVPCE.books[ book ] && KJVPCE.books[ book ].map( ( chapters, index ) => {
              return <option key={index} value={ index }>{ index + 1 }</option>
            } ) }
          </select>
          <select name="verse" onChange={( event )=>{ setVerse( parseInt( event.target.value) ) } }>
            <option>Select a verse</option>
            { KJVPCE.books[ book ] && KJVPCE.books[ book ][ chapter ] && KJVPCE.books[ book ][ chapter ].map( ( verses, index ) => {
              return <option key={index} value={ index }>{ index + 1 }</option>
            } ) }
          </select>
          <input type="submit" value="Guess" disabled={ ! verse } />
        </form>
        <div className="guesses">
          { guesses && guesses.map( ( guess, index ) => {
            const difference = guess - verseNumber;
            return (
              <div key={ index } className="guess">
                <span>{index + 1 }. { allVerses[ guess ].reference[0] + ' ' + ( allVerses[ guess ].reference[1] + 1 ) + ':' + ( allVerses[ guess ].reference[2] + 1 ) }</span> <span>{ difference === 0 ? '!' : difference > 0 ? '← ' + Math.abs( difference ) : Math.abs( difference ) + ' →'  }</span>
              </div>
            );
          } ) }
        </div>
      </header>
    </div>
  );
}

export default App;
