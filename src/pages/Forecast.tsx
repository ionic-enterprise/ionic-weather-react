import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useWeatherService } from '../hooks/useWeatherService';
import './Forecast.css';

const Forecast: React.FC = () => {
  const { currentWeatherData } = useWeatherService();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Forecast</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="main-content">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Forecast</IonTitle>
          </IonToolbar>
        </IonHeader>
        <pre>{JSON.stringify(currentWeatherData, null, 2)}</pre>
      </IonContent>
    </IonPage>
  );
};

export default Forecast;
