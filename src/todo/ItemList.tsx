import React, { useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import { Redirect } from "react-router-dom";
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList, IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton
} from '@ionic/react';
import { add } from 'ionicons/icons';
import Item from './Item';
import { getLogger } from '../core';
import { ItemContext } from './ItemProvider';
import { AuthContext } from '../auth';

const log = getLogger('ItemList');

const ItemList: React.FC<RouteComponentProps> = ({ history }) => {
  const { items, fetching, fetchingError} = useContext(ItemContext);
  const { logout } = useContext(AuthContext);
  const handleLogOut = () => {
    log('handleLogOut...');
    logout?.();
    return <Redirect to = "/login" />;
  };
  log('render');
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Item List</IonTitle>
        <IonButton onClick={handleLogOut}>Log out</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading isOpen={fetching} message="Fetching items"/>
        {items && (
          <IonList>
            {items.map(({ _id, name, length, releaseDate, isWatched }) =>
              <Item key={_id} _id={_id} name={name} length={length} releaseDate={releaseDate} isWatched={isWatched} onEdit={id => history.push(`/item/${_id}`)}/>)}
          </IonList>
        )}
        {fetchingError && (
          <div>{fetchingError.message || 'Failed to fetch items'}</div>
        )}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/item')}>
            <IonIcon icon={add}/>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default ItemList;
