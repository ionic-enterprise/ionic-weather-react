import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useWeatherService } from '../hooks/useWeatherService';
import './CurrentWeatherPage.css';
import { CsdemoCondition, CsdemoTemperature } from '@ionic-enterprise/cs-demo-weather-widgets-react';
import { useState } from 'react';

const CurrentWeatherPage: React.FC = () => {
  const [scale, setScale] = useState('F');
  const { weatherData, icons } = useWeatherService();

  return (
    <IonPage>
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
        <CsdemoCondition condition={weatherData?.condition} iconPaths={icons} />
      </IonContent>
    </IonPage>
  );
};

export default CurrentWeatherPage;
