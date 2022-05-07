import { CsdemoUvIndex } from '@ionic-enterprise/cs-demo-weather-widgets-react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useWeatherService } from '../hooks/useWeatherService';
import './UVIndexPage.css';

const UVIndexPage: React.FC = () => {
  const { weatherData, getUVAdvice } = useWeatherService();
  const [advice, setAdvice] = useState<string>('');

  useEffect(() => {
    if (weatherData) {
      setAdvice(getUVAdvice(weatherData.uvIndex));
    }
  }, [weatherData, getUVAdvice]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>UV Index</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-text-center ion-padding main-content">
        <CsdemoUvIndex class="primary-value" uvIndex={weatherData?.uvIndex} />
        <div className="description">{advice}</div>
      </IonContent>
    </IonPage>
  );
};

export default UVIndexPage;
