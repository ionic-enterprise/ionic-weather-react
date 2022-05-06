import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useWeatherService } from '../hooks/useWeatherService';
import './UVIndex.css';

const UVIndex: React.FC = () => {
  const { currentWeatherData } = useWeatherService();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>UV Index</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="main-content">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">UV Index</IonTitle>
          </IonToolbar>
        </IonHeader>
        <pre>{JSON.stringify(currentWeatherData, null, 2)}</pre>
      </IonContent>
    </IonPage>
  );
};

export default UVIndex;
