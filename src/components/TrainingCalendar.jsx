import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { format } from 'date-fns'; // Käytämme date-fns kirjastoa päivämäärien muotoiluun

const TrainingCalendar = () => {
  const [trainings, setTrainings] = useState([]);

  // Haetaan tiedot API:sta
  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings");
        if (!response.ok) {
          throw new Error("Virhe hakiessa dataa");
        }
        const data = await response.json();

        // Muodostetaan kalenteritiedot
        const events = data._embedded.trainings.map(training => ({
          title: training.activity,
          start: format(new Date(training.date), "yyyy-MM-dd'T'HH:mm:ss"),
          end: format(new Date(new Date(training.date).getTime() + training.duration * 60000), "yyyy-MM-dd'T'HH:mm:ss"), // Loppuaika
        }));

        setTrainings(events);
      } catch (error) {
        console.error('Virhe dataa haettaessa:', error);
      }
    };

    fetchTrainings();
  }, []);

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <h2>Harjoitukset Kalenterissa</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"  // Asetetaan alkuperäinen näkymä
        events={trainings}           // Käytetään haettuja tapahtumia
        dateClick={(info) => alert('Klikkasi päivämäärää: ' + info.dateStr)}
        eventClick={(info) => alert('Klikkasi tapahtumaa: ' + info.event.title)}
      />
    </div>
  );
};

export default TrainingCalendar;
