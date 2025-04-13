import React, { useState } from 'react';
import "../../styles/home.css";

const faqs = [
  { question: "Transporte", answer: "Datos sobre rutas de camiones y sitios de taxi seguros. " },
  { question: "Números de emergencia", answer: "Directorio de emergencias." },
  { question: "Programas de Gobierno", answer: "Programas y requisitos." },
  { question: "Links", answer: "Links hacia páginas oficiales." },
  { question: "Novedades", answer: "Servicios que actualmente están disponibles como albercas o pistas de hielo." },
  { question: "Más información", answer: <>Si quieres saber más información, puedes consultar nuestro <a href="/chatbot">Chatbot</a>.</> },
  ];

const FreqAskedQuestions = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='backpage'>
          <div className='containerFAQ'>
            <h2 className='heading'>Preguntas frecuentes</h2>
            <div>
        {faqs.map((faq, index) => (
          <div  key={index}>
            <div className='login-buttonesFAQ' onClick={() => toggleFAQ(index)} >
              <h5 >{faq.question}</h5>
            </div>
            
            <div className={`collapse ${openIndex === index ? 'show' : ''}`}>
              <div className="containerAnswer">{faq.answer}</div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>);
};

export default FreqAskedQuestions;