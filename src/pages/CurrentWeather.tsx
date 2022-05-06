import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useWeatherService } from '../hooks/useWeatherService';
import './CurrentWeather.css';

const CurrentWeather: React.FC = () => {
  const { currentWeatherData } = useWeatherService();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Current Weather</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="main-content">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Current Weather</IonTitle>
          </IonToolbar>
        </IonHeader>
        <pre>{JSON.stringify(currentWeatherData, null, 2)}</pre>
      </IonContent>
    </IonPage>
  );
};

export default CurrentWeather;
