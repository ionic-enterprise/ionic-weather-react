import { CsdemoCondition, CsdemoTemperature } from '@ionic-enterprise/cs-demo-weather-widgets-react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { useWeatherService } from '../hooks/useWeatherService';
import './CurrentWeatherPage.css';

const CurrentWeatherPage: React.FC = () => {
  const [scale, setScale] = useState('F');
  const { weatherData } = useWeatherService();

  return (
    <IonPage className="current-weather-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Current Weather</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-text-center ion-padding main-content">
        <div className="primary-value">Madison, WI</div>
        <CsdemoTemperature
          className="primary-value"
          scale={scale}
          temperature={weatherData?.temperature}
          onClick={() => setScale(scale === 'F' ? 'C' : 'F')}
          style={{ display: 'block' }}
        />
        <CsdemoCondition condition={weatherData?.condition} />
      </IonContent>
    </IonPage>
  );
};

export default CurrentWeatherPage;
