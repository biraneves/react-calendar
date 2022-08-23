import {getEventsEndpoint} from "../backend";

function App() {
  getEventsEndpoint().then(events => {
    for (const event of events) {
      console.log(event);
    }
  });

  return <div>Projeto base</div>;
}

export default App;
