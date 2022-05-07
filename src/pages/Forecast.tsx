import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { useWeatherService } from '../hooks/useWeatherService';
import { Forecast } from '../services/models';
import './Forecast.css';
import { CsdemoDailyForecast } from '@ionic-enterprise/cs-demo-weather-widgets-react';

const ForecastPage: React.FC = () => {
  const [scale, setScale] = useState('F');
  const { weatherData, icons } = useWeatherService();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Forecast</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="main-content">
        <IonList>
          {weatherData?.forecasts.map((dailyForecast: Array<Forecast>, index: number) => {
            return (
              <IonItem key={index} onClick={() => setScale(scale === 'F' ? 'C' : 'F')}>
                <IonLabel>
                  <CsdemoDailyForecast scale={scale} forecasts={dailyForecast} iconPaths={icons} />
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ForecastPage;
