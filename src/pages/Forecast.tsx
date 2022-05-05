import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Forecast.css';

const Forecast: React.FC = () => {
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
        <ExploreContainer name="Forecast page" />
      </IonContent>
    </IonPage>
  );
};

export default Forecast;
