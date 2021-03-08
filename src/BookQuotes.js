import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import QuoteBox from './QuoteBox';

const BookQuotes = () => {
  let { id } = useParams();

  const [quotes, setQuotes] = useState({});
  const [loadQuotes, setLoadQuotes] = useState(false);
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    const fetchAllQuotes = async () => {
      const result = await axios(
        'http://localhost:8000/all',
      );

      // Find book titles
      for (let i in result.data) {
        setTitles(oldArray => [...oldArray, i]);
      }

      // Set quotes json
      setQuotes(result.data);
      setLoadQuotes(true);
    }

    fetchAllQuotes();
  }, []);

  return (
    <div>
      <h2>ID: {id}</h2>
      <h3>Book Title: {loadQuotes && titles[id]}</h3>
      {loadQuotes && quotes[titles[id]].map(q => <QuoteBox {...{ title: titles[id], date: q.date, quote: q.quote, displayTitle: false, index: id }} />)}
    </div>
  );
}

export default BookQuotes;